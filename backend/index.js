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

// Ensure users table exists (from previous setup)
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100)
    )
  `);
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      intent VARCHAR(50),
      message TEXT,
      reply TEXT,
      timestamp VARCHAR(100)
    )
  `);
  console.log("✅ DB verified");
}
initDB();

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
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

    // Send asynchronous webhook to n8n for automation processing
    // Notice we don't await this so it doesn't block the user's response
    axios.post("http://localhost:5678/webhook/chat", {
      intent: "general_chat",
      message: message,
      reply: aiReply,
      timestamp: new Date().toISOString()
    }).catch(err => {
      console.log("n8n webhook skipped or failed: ", err.response?.data || err.message || err);
    });

    // Save to database
    // try {
    //   await pool.query(
    //     "INSERT INTO messages (intent, message, reply, timestamp) VALUES ($1, $2, $3, $4)",
    //     ["general_chat", message, aiReply, new Date().toISOString()]
    //   );
    //   console.log("✅ Message saved to database directly");
    // } catch (dbErr) {
    //   console.error("Failed to save message to DB:", dbErr);
    // }

    res.json({ reply: aiReply });
  } catch (error) {
    console.error("Chat error:", error);
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});