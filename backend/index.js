require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { GoogleGenAI } = require("@google/genai");
const nodemailer = require("nodemailer");

// Database configuration if we want to save chat history directly
const pool = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const ADMIN_EMAIL = process.env.DEFAULT_USER_EMAIL || "admin@vertexdigital.com";
const ENABLE_N8N_WEBHOOK = process.env.ENABLE_N8N_WEBHOOK === "true";

// Ensure users table exists (from previous setup)
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255),
      role VARCHAR(20) DEFAULT 'user'
    )
  `);

  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255)`);
  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user'`);
  await pool.query(`ALTER TABLE users ALTER COLUMN role SET DEFAULT 'user'`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      user_email VARCHAR(100),
      user_name VARCHAR(100),
      intent VARCHAR(50),
      message TEXT,
      reply TEXT,
      timestamp VARCHAR(100)
    )
  `);

  await pool.query(`ALTER TABLE messages ADD COLUMN IF NOT EXISTS user_email VARCHAR(100)`);
  await pool.query(`ALTER TABLE messages ADD COLUMN IF NOT EXISTS user_name VARCHAR(100)`);

  const defaultUser = {
    name: process.env.DEFAULT_USER_NAME || "Admin",
    email: ADMIN_EMAIL,
    password: process.env.DEFAULT_USER_PASSWORD || "Admin123!",
  };

  const existingUser = await pool.query(
    "SELECT id, role FROM users WHERE email = $1",
    [defaultUser.email]
  );

  if (existingUser.rows.length === 0) {
    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
      [defaultUser.name, defaultUser.email, defaultUser.password, 'admin']
    );
  } else if (existingUser.rows[0].role !== 'admin') {
    await pool.query(
      "UPDATE users SET role = $1 WHERE email = $2",
      ['admin', defaultUser.email]
    );
  }

  console.log("✅ DB verified");
}
initDB();

app.post("/api/chat", async (req, res) => {
  const { message, userEmail, userName, intent = 'general_chat' } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    // Generate AI response with Google Search Grounding for real-time scenario
    const model = 'gemini-2.5-flash'; // Good balanced model
    console.log("Sending to Gemini...");
    
    // Using generative model with google search retrieval tool enabled
    const response = await ai.models.generateContent({
        model: model,
        contents: message,
        config: {
            systemInstruction: "You are the AI assistant for Vertex Digital, a premium digital engineering agency. The core services we provide are: Custom Software Development, Application Development, Web Development, Web Design, Mobile App Development, Android Development, Database Development, and Software Testing. If asked about what we do, list these services and explain how we deliver enterprise-grade solutions.",
            tools: [{ googleSearch: {} }], 
            temperature: 0.7,
        }
    });
    
    const aiReply = response.text;

    // Send asynchronous webhook to n8n for automation processing if enabled
    if (ENABLE_N8N_WEBHOOK) {
      axios.post("http://localhost:5678/webhook/chat", {
        intent: "general_chat",
        message: message,
        reply: aiReply,
        timestamp: new Date().toISOString()
      }).catch(err => {
        console.log("n8n webhook skipped or failed: ", err.response?.data || err.message || err);
      });
    }

    // Save to database
    try {
      await pool.query(
        "INSERT INTO messages (user_email, user_name, intent, message, reply, timestamp) VALUES ($1, $2, $3, $4, $5, $6)",
        [userEmail || null, userName || null, intent, message, aiReply, new Date().toISOString()]
      );
      console.log("✅ Message saved to database");
    } catch (dbErr) {
      console.error("Failed to save message to DB:", dbErr);
    }

    res.json({ reply: aiReply });
  } catch (error) {
    console.error("Chat error:", error);
    if (error?.status === 503 || error?.message?.includes('high demand')) {
      return res.status(503).json({ error: "The AI model is currently unavailable. Please try again in a few moments." });
    }
    res.status(500).json({ error: "Failed to process chat" });
  }
});

// Contact Route handling auto-responder
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  try {
    let transporter;

    // Check if user has added real Gmail credentials to .env
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      console.log("Using Real Gmail SMTP");
    } else {
      // Fallback to testing ethereal account if no real credentials exist
      console.warn("⚠️ EMAIL_USER or EMAIL_PASS not set in .env. Falling back to Dev Ethereal Mail.");
      let testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const info = await transporter.sendMail({
      from: '"Vertex Digital Auto-Responder" <' + (process.env.EMAIL_USER || 'support@vertexdigital.com') + '>', 
      to: email, 
      subject: "We received your request!", 
      text: `Hello ${name}!\n\nWe have received your message and our enterprise support team will help you very soon.\n\nYour message:\n"${message}"\n\nThanks,\nVertex Digital Team`, 
      html: `<div style="font-family: sans-serif;"><b>Hello ${name}!</b><br><br>We have received your message and our enterprise support team will help you very soon.<br><br><i>Your message:</i><br><blockquote style="border-left: 4px solid #8b5cf6; padding-left: 10px; color: #555;">${message}</blockquote><br><br>Thanks,<br><strong>Vertex Digital Team</strong></div>`, 
    });

    console.log("------------------------");
    if (!process.env.EMAIL_USER) {
      console.log("📨 Email successfully sent to Ethereal Testing service!");
      console.log("-> View the Email Content here: %s", nodemailer.getTestMessageUrl(info));
    } else {
      console.log(`📨 REAL Email successfully sent to: ${email}`);
    }
    console.log("------------------------");

    res.json({ 
      success: true, 
      previewUrl: nodemailer.getTestMessageUrl(info) || '' 
    });
  } catch (err) {
    console.error("Failed to send email:", err);
    res.status(500).json({ error: "Internal server error connecting to email service" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }

  try {
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "A user with that email already exists" });
    }

    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
      [name, email, password, 'user']
    );

    res.status(201).json({ success: true, message: "Account created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const result = await pool.query(
      "SELECT id, name, email, role FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];
    const isAdmin = user.role === 'admin' || user.email === ADMIN_EMAIL;
    res.json({ success: true, user: { ...user, isAdmin } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/messages", async (req, res) => {
  const requesterEmail = req.query.requester_email;
  const filterEmail = req.query.user_email;

  if (!requesterEmail) {
    return res.status(400).json({ error: "Requester email is required" });
  }

  try {
    let requesterResult;
    try {
      requesterResult = await pool.query(
        "SELECT role FROM users WHERE email = $1",
        [requesterEmail]
      );
    } catch (err) {
      if (err.code === '42703') {
        console.warn('Users table missing role column, migrating...');
        await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user'");
        requesterResult = await pool.query(
          "SELECT role FROM users WHERE email = $1",
          [requesterEmail]
        );
      } else {
        throw err;
      }
    }

    if (requesterResult.rows.length === 0) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const requesterRole = requesterResult.rows[0].role || 'user';
    const isAdmin = requesterRole === 'admin' || requesterEmail === ADMIN_EMAIL;

    let query = "SELECT * FROM messages ORDER BY id DESC";
    const params = [];
    const normalizedFilter = filterEmail ? filterEmail.trim() : '';

    if (normalizedFilter) {
      if (!isAdmin && normalizedFilter !== requesterEmail) {
        return res.status(403).json({ error: "Forbidden" });
      }

      if (isAdmin) {
        query = "SELECT * FROM messages WHERE user_email ILIKE $1 ORDER BY id DESC";
        params.push(`%${normalizedFilter}%`);
      } else {
        query = "SELECT * FROM messages WHERE user_email = $1 ORDER BY id DESC";
        params.push(normalizedFilter);
      }
    } else if (!isAdmin) {
      query = "SELECT * FROM messages WHERE user_email = $1 ORDER BY id DESC";
      params.push(requesterEmail);
    }

    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');

    const result = await pool.query(query, params);
    res.json({ messages: result.rows });
  } catch (err) {
    console.error("Messages fetch error:", err);
    res.status(500).json({ error: "Unable to load messages" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});