import React, { useState, useEffect } from 'react';
import ChatBox from './components/ChatBox';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminHistory from './components/AdminHistory';
import { 
  BrainCircuit, Zap, Server, MessageSquare, ArrowRight,
  Database, Info, Briefcase, Globe, Package, Users, Mail, X,
  Menu,
  Code, Layout, Cloud, Shield, Cpu, Activity, MapPin, Phone, ChevronRight,
  Smartphone, Monitor, PenTool, CheckCircle, Layers
} from 'lucide-react';

// --- NEW RICH PAGE COMPONENTS ---

const AboutPage = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>About Vertex Digital</h1>
      <p>We are a premier digital engineering agency dedicated to architecting highly scalable custom software, web applications, and mobile solutions.</p>
    </div>
    
    <div className="content-grid">
      <div className="content-card">
        <div className="card-icon-wrapper"><Code size={28} color="#8b5cf6" /></div>
        <h3>Our Mission</h3>
        <p>To propel enterprise businesses forward by delivering pixel-perfect designs, unbreakable backend architectures, and seamless user experiences across all devices.</p>
      </div>
      <div className="content-card">
        <div className="card-icon-wrapper"><Users size={28} color="#10b981" /></div>
        <h3>Our Team</h3>
        <p>Composed of elite full-stack developers, mobile engineers, and visionary designers fiercely committed to pushing the boundaries of modern digital products.</p>
      </div>
      <div className="content-card">
        <div className="card-icon-wrapper"><Activity size={28} color="#8b5cf6" /></div>
        <h3>Our Impact</h3>
        <p>Hundreds of successful deployments globally. We've optimized workflows, skyrocketed mobile app ratings, and designed high-converting web interfaces for industry leaders.</p>
      </div>
    </div>
  </div>
);

const ServicesPage = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>Our Services</h1>
      <p>We provide full-scale digital solutions, from initial UI/UX design to robust backend architecture and continuous software testing.</p>
    </div>
    
    <div className="content-grid">
      <div className="content-card">
        <div className="card-icon-wrapper"><Code size={28} color="#8b5cf6" /></div>
        <h3>Custom Software Development</h3>
        <p>Tailor-made enterprise software solutions specifically engineered to optimize your unique business operations and scale limitlessly.</p>
      </div>
      <div className="content-card">
        <div className="card-icon-wrapper"><Layers size={28} color="#10b981" /></div>
        <h3>Application Development</h3>
        <p>End-to-end framework development bridging frontend interfaces with powerful backend business logic and real-time APIs.</p>
      </div>
      <div className="content-card">
        <div className="card-icon-wrapper"><Globe size={28} color="#8b5cf6" /></div>
        <h3>Web Development</h3>
        <p>Building high-performance, dynamic websites and web applications utilizing the newest front-end and back-end frameworks.</p>
      </div>
      <div className="content-card">
        <div className="card-icon-wrapper"><PenTool size={28} color="#10b981" /></div>
        <h3>Web Design</h3>
        <p>Crafting stunning, conversion-optimized interfaces with modern aesthetics, glassmorphism, and responsive layouts.</p>
      </div>
       <div className="content-card">
        <div className="card-icon-wrapper"><Smartphone size={28} color="#8b5cf6" /></div>
        <h3>Mobile App Development</h3>
        <p>Native and cross-platform mobile apps for iOS and modern operating systems with buttery-smooth user experiences.</p>
      </div>
      <div className="content-card">
        <div className="card-icon-wrapper"><Monitor size={28} color="#10b981" /></div>
        <h3>Android Development</h3>
        <p>Specialized Android native engineering leveraging modern tools to dominate the Google Play ecosystem with high-performance apps.</p>
      </div>
      <div className="content-card">
        <div className="card-icon-wrapper"><Database size={28} color="#8b5cf6" /></div>
        <h3>Database Development</h3>
        <p>Architecting highly secure, normalized relational and NoSQL databases for lightning-fast queries and secure data isolation.</p>
      </div>
      <div className="content-card">
        <div className="card-icon-wrapper"><CheckCircle size={28} color="#10b981" /></div>
        <h3>Software Testing</h3>
        <p>Rigorous QA automation, boundary testing, and continuous integration to guarantee your applications are robust and bug-free.</p>
      </div>
    </div>
  </div>
);

const DomainPage = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>Hosting & Infrastructure</h1>
      <p>Enterprise-grade digital infrastructure to securely deploy, scale, and maintain your custom applications and websites.</p>
    </div>
    
    <div className="content-grid">
      <div className="content-card">
        <div className="card-icon-wrapper"><Cloud size={28} color="#8b5cf6" /></div>
        <h3>Web & App Cloud Hosting</h3>
        <p>Reliable, ultra-fast cloud hosting optimized for loading your web applications and mobile backends with 99.99% guaranteed uptime.</p>
      </div>
      <div className="content-card">
        <div className="card-icon-wrapper"><Globe size={28} color="#10b981" /></div>
        <h3>Domain & SSL Registration</h3>
        <p>Full-service domain management. We secure your custom URLs and provision enterprise SSL certificates to guarantee strict data encryption.</p>
      </div>
      <div className="content-card">
        <div className="card-icon-wrapper"><Database size={28} color="#8b5cf6" /></div>
        <h3>Scalable Database Hosting</h3>
        <p>Secure, clustered database environments perfectly configured to handle the massive data loads from your custom mobile and web software.</p>
      </div>
      <div className="content-card">
        <div className="card-icon-wrapper"><Shield size={28} color="#10b981" /></div>
        <h3>Maintenance & Protection</h3>
        <p>Continuous monitoring, automated daily backups, and robust DDoS protection ensuring your custom software is never compromised or taken offline.</p>
      </div>
    </div>
  </div>
);

const ProductsPage = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>Proprietary Software Suites</h1>
      <p style={{ marginBottom: '15px' }}>Powerful, ready-to-deploy platforms built to accelerate your business operations and digital transformation.</p>
      <p style={{ color: '#a78bfa', fontSize: '0.95rem', maxWidth: '800px', margin: '0 auto' }}>Beyond custom development, we license our battle-tested internal frameworks to give your enterprise a massive head start in the market. Each product is engineered for high performance, absolute security, and seamless integration.</p>
    </div>
    
    <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
      <div className="content-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="card-icon-wrapper"><Layout size={28} color="#8b5cf6" /></div>
        <h3>Vertex Headless CMS</h3>
        <p style={{ marginBottom: '30px', flex: 1, lineHeight: '1.6' }}>A proprietary, API-first content management system designed for extreme scalability. It completely decouples your backend logic from your frontend presentation, allowing your marketing teams to update global website and app content in real-time without touching a single line of code. Built with edge-computing standards, it delivers sub-50ms query times globally, ensuring your user interface never lags.</p>
        <button className="primary-btn" style={{ fontSize: '0.85rem', padding: '10px 16px', width: 'fit-content' }}>View Live Demo</button>
      </div>
      <div className="content-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="card-icon-wrapper"><Users size={28} color="#10b981" /></div>
        <h3>Enterprise CRM Portal</h3>
        <p style={{ marginBottom: '30px', flex: 1, lineHeight: '1.6' }}>A highly customizable, white-label Customer Relationship Management infrastructure. Forget expensive monthly SaaS fees—we deploy this robust portal directly to your private cloud. It features advanced pipeline tracking, automated lead-scoring algorithms, secure user-role permissions, and deep custom integrations with your existing email and outbound marketing APIs.</p>
        <button className="primary-btn" style={{ fontSize: '0.85rem', padding: '10px 16px', width: 'fit-content' }}>Request Licensing</button>
      </div>
      <div className="content-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="card-icon-wrapper"><Package size={28} color="#8b5cf6" /></div>
        <h3>E-Commerce Accelerator</h3>
        <p style={{ marginBottom: '30px', flex: 1, lineHeight: '1.6' }}>An ultra-optimized digital storefront architecture built for high-volume enterprise retail. This comprehensive engine includes a fully customizable React-based frontend, a battle-tested secure checkout flow with multi-gateway payments, and dynamic inventory management algorithms. By deploying this framework, we cut typical enterprise e-commerce development cycles from 6 months down to weeks.</p>
        <button className="primary-btn" style={{ fontSize: '0.85rem', padding: '10px 16px', width: 'fit-content' }}>Explore Features</button>
      </div>
    </div>
  </div>
);

const CareerPage = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>Join the Agency</h1>
      <p style={{ marginBottom: '15px' }}>We are actively looking for passionate builders, visionaries, and meticulous engineers.</p>
      <p style={{ color: '#a78bfa', fontSize: '0.95rem', maxWidth: '800px', margin: '0 auto' }}>At Vertex Digital, you aren't just churning out code—you are architecting world-class enterprise web platforms, custom mobile applications, and highly secure databases. We offer fully remote asynchronous work, strong benefits, and rapid internal growth.</p>
    </div>
    
    <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      <div className="content-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Senior Full-Stack Engineer</h3>
        <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600, marginBottom: '15px' }}>Remote • Full-time • Equity</span>
        <p style={{ flex: 1, lineHeight: '1.6' }}>Lead the architecting and development of complex custom software and robust web applications for our top-tier enterprise clients.</p>
        <button className="primary-btn" style={{ marginTop: '20px', width: 'fit-content', padding: '8px 20px', fontSize: '0.85rem' }}>Apply Now</button>
      </div>
      <div className="content-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Lead Android Engineer</h3>
        <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600, marginBottom: '15px' }}>Remote • Full-time</span>
        <p style={{ flex: 1, lineHeight: '1.6' }}>Spearhead our mobile division by designing native, high-performance Android applications that dominate the Google Play ecosystem.</p>
        <button className="primary-btn" style={{ marginTop: '20px', width: 'fit-content', padding: '8px 20px', fontSize: '0.85rem' }}>Apply Now</button>
      </div>
      <div className="content-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>QA Automation Engineer</h3>
        <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600, marginBottom: '15px' }}>Contractor • Flexible</span>
        <p style={{ flex: 1, lineHeight: '1.6' }}>Build out massive boundary-testing frameworks and continuous integration pipelines to guarantee every deployment is 100% bug-free.</p>
        <button className="primary-btn" style={{ marginTop: '20px', width: 'fit-content', padding: '8px 20px', fontSize: '0.85rem' }}>Apply Now</button>
      </div>
      <div className="content-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Frontend Engineer</h3>
        <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600, marginBottom: '15px' }}>Remote • Full-time • Equity</span>
        <p style={{ flex: 1, lineHeight: '1.6' }}>Design and implement butter-smooth, responsive user interfaces. You will leverage modern frameworks like React to build stunning glassmorphic experiences that redefine how users interact with enterprise web applications.</p>
        <button className="primary-btn" style={{ marginTop: '20px', width: 'fit-content', padding: '8px 20px', fontSize: '0.85rem' }}>Apply Now</button>
      </div>
      <div className="content-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Backend Engineer</h3>
        <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600, marginBottom: '15px' }}>Remote • Full-time</span>
        <p style={{ flex: 1, lineHeight: '1.6' }}>Architect unbreakable server-side logic and scalable infrastructure. You will manage PostgreSQL databases, build secure REST APIs, and optimize our cloud environments to handle massive enterprise data flow.</p>
        <button className="primary-btn" style={{ marginTop: '20px', width: 'fit-content', padding: '8px 20px', fontSize: '0.85rem' }}>Apply Now</button>
      </div>
      <div className="content-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Web Designer</h3>
        <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600, marginBottom: '15px' }}>Remote • Flexible</span>
        <p style={{ flex: 1, lineHeight: '1.6' }}>Lead our UI/UX strategy by creating high-converting, strictly accessible wireframes and design systems. You bridge the gap between creative vision and technical implementation for high-end SaaS products.</p>
        <button className="primary-btn" style={{ marginTop: '20px', width: 'fit-content', padding: '8px 20px', fontSize: '0.85rem' }}>Apply Now</button>
      </div>
      <div className="content-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Graphic Designer</h3>
        <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600, marginBottom: '15px' }}>Contractor • Project-based</span>
        <p style={{ flex: 1, lineHeight: '1.6' }}>Craft the core visual identity of our agency and our prestigious clients. From stunning vector illustrations to comprehensive brand guidelines, you ensure our visual presence remains unmatched in the industry.</p>
        <button className="primary-btn" style={{ marginTop: '20px', width: 'fit-content', padding: '8px 20px', fontSize: '0.85rem' }}>Apply Now</button>
      </div>
    </div>
  </div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [previewUrl, setPreviewUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('loading');

    try {
      const res = await fetch('https://chatbot-83b2.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setPreviewUrl(data.previewUrl);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="page-container" style={{ textAlign: 'center' }}>
      <div className="page-header">
        <h1>Contact Sales</h1>
        <p style={{ marginBottom: '15px' }}>Ready to deploy or need custom infrastructure limits? Send us a message and our team will get back to you immediately.</p>
        <p style={{ color: '#10b981', fontSize: '0.95rem', maxWidth: '800px', margin: '0 auto' }}>Whether you're migrating complex legacy databases into our PostgreSQL format or scaling your N8N webhooks to thousands of requests a minute, our engineering support lines are open 24/7 to guarantee your success.</p>
      </div>
      
      <div className="contact-form">
         {status === 'success' ? (
           <div style={{ padding: '40px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px', border: '1px solid #10b981' }}>
             <h3 style={{ color: '#10b981', marginBottom: '15px' }}>Message Sent!</h3>
             <p style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '15px' }}>We have received your request and a confirmation email has been sent to you.</p>
             {previewUrl && (
                <a href={previewUrl} target="_blank" rel="noreferrer" style={{ color: '#8b5cf6', fontSize: '0.85rem' }}>
                  (Dev Mode: Click to View Sent Email)
                </a>
             )}
             <button onClick={() => setStatus('idle')} className="secondary-btn" style={{ marginTop: '20px', width: '100%' }}>Send Another Message</button>
           </div>
         ) : (
           <form onSubmit={handleSubmit}>
             <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
             </div>
             <div className="form-group">
                <label>Work Email</label>
                <input type="email" placeholder="john@company.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
             </div>
             <div className="form-group">
                <label>How can we help?</label>
                <textarea rows="4" placeholder="Tell us about your project infrastructure needs..." required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
             </div>
             {status === 'error' && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '15px' }}>Failed to send message. Make sure the Node server is running!</p>}
             <button type="submit" className="primary-btn" disabled={status === 'loading'} style={{ width: '100%', marginTop: '10px' }}>
                {status === 'loading' ? 'Sending...' : 'Message Support'}
             </button>
           </form>
         )}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '40px', marginTop: '60px', color: 'var(--text-muted)' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
           <Mail size={20} color="#8b5cf6" /> support@vertexdigital.com
         </div>
         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
           <MapPin size={20} color="#10b981" /> San Francisco, CA
         </div>
         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
           <Phone size={20} color="#8b5cf6" /> 1-800-VERTEX
         </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

function App() {
  const [authStatus, setAuthStatus] = useState('landing'); // 'landing' | 'login' | 'signup' | 'authenticated'
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const savedUser = window.localStorage.getItem('pgadmindb_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        setIsAdmin(parsedUser.isAdmin === true);
        setAuthStatus('authenticated');
        setCurrentPage('home');
      } catch (err) {
        console.warn('Failed to restore auth state:', err);
        window.localStorage.removeItem('pgadmindb_user');
      }
    }
  }, []);

  const handleLogin = async ({ email, password }) => {
    setLoginError('');
    setLoginLoading(true);

    try {
      const response = await fetch('https://chatbot-83b2.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setCurrentUser(data.user);
      setIsAdmin(data.user.isAdmin === true);
      setAuthStatus('authenticated');
      setCurrentPage('home');
      setIsChatOpen(true);
      window.localStorage.setItem('pgadmindb_user', JSON.stringify(data.user));
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthStatus('landing');
    setCurrentUser(null);
    setIsAdmin(false);
    setCurrentPage('home');
    setMenuOpen(false);
    setIsChatOpen(false);
    setLoginError('');
    setSignupError('');
    setSignupSuccess('');
    window.localStorage.removeItem('pgadmindb_user');
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  const handleSignup = async ({ name, email, password }) => {
    setSignupError('');
    setSignupLoading(true);
    setSignupSuccess('');

    try {
      const response = await fetch('https://chatbot-83b2.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      const newUser = { name, email, isAdmin: false };
      setCurrentUser(newUser);
      setIsAdmin(false);
      setAuthStatus('authenticated');
      setCurrentPage('home');
      setIsChatOpen(true);
      window.localStorage.setItem('pgadmindb_user', JSON.stringify(newUser));
      setSignupSuccess('Account created successfully. You are now signed in.');
    } catch (err) {
      setSignupError(err.message);
    } finally {
      setSignupLoading(false);
    }
  };

  // Automatically pop open the chat after a brief delay when reaching the dashboard
  useEffect(() => {
    if (authStatus === 'authenticated' && !isChatOpen && currentPage === 'home') {
      const timer = setTimeout(() => {
        setIsChatOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [authStatus, currentPage]);

  const renderContent = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'domain':
        return <DomainPage />;
      case 'products':
        return <ProductsPage />;
      case 'careers':
        return <CareerPage />;
      case 'contact':
        return <ContactPage />;
      case 'history':
        return <AdminHistory requesterEmail={currentUser?.email} isAdmin={isAdmin} />;
      case 'home':
      default:
        // Dashboard Overview View
        return (
          <div className="page-container">
             <div className="page-header" style={{ textAlign: 'left', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '2.4rem' }}>Dashboard Overview</h1>
                <p style={{ margin: '0', maxWidth: 'none' }}>Welcome back to your Vertex Digital console. Monitor your active instances below.</p>
             </div>
             
             <div className="content-grid">
               <div className="content-card" style={{ borderLeft: '4px solid #10b981' }}>
                 <h3>Active Client Projects</h3>
                 <p style={{ fontSize: '2.8rem', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>8</p>
                 <p style={{ color: '#10b981', fontSize: '0.85rem' }}>+2 this month</p>
               </div>
               <div className="content-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
                 <h3>Server Uptime</h3>
                 <p style={{ fontSize: '2.8rem', fontWeight: 'bold', color: '#fff', margin: '10px 0' }}>99.99%</p>
                 <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Across all hosted applications</p>
               </div>
             </div>

             <div className="content-card" style={{ marginTop: '20px' }}>
                <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px', marginBottom: '15px' }}>Recent Deployments</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                   <div>
                      <h4 style={{ color: '#fff', marginBottom: '5px' }}>Enterprise CRM Portal (Client: Alpha Corp)</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Deployed completely successfully 2 hours ago via CI/CD</p>
                   </div>
                   <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>Active</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0 0 0', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '10px' }}>
                   <div>
                      <h4 style={{ color: '#fff', marginBottom: '5px' }}>E-Commerce Scalability Patch</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pushed to iOS and Web yesterday at 4:32 PM</p>
                   </div>
                   <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>Active</span>
                </div>
             </div>
          </div>
        );
    }
  };

  // 1. Landing Page View
  if (authStatus === 'landing') {
    return (
      <div className="app-container">
        <header style={{ padding: '24px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(7, 11, 25, 0.6)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div className="logo" style={{ cursor: 'pointer' }}>
            <BrainCircuit size={32} color="#8b5cf6" />
            <span>Vertex Digital</span>
          </div>
        </header>

        <section className="hero-section">
          <div className="hero-content">
            <span className="tagline">Elite Digital Engineering Agency</span>
            <h1 className="hero-title">Custom software. Beautiful experiences.</h1>
            <p className="hero-description">
              We architect, design, and deploy high-performance web applications, native mobile apps, and scalable database infrastructure for modern enterprises.
            </p>
            <div className="hero-buttons">
              <button 
                className="primary-btn" 
                onClick={() => setAuthStatus('login')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                Start Building <ArrowRight size={18} />
              </button>
              <button className="secondary-btn">View Services</button>
            </div>
          </div>
          
          <div className="showcase-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="glow-behind" style={{ filter: 'blur(80px)', width: '400px', height: '400px' }}></div>
            <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 0 40px rgba(0,0,0,0.5)' }}>
              <Monitor size={140} color="#8b5cf6" />
              <div style={{ position: 'absolute', top: '15%', right: '15%', animation: 'bounce 3s infinite' }}>
                <Smartphone size={40} color="#10b981" />
              </div>
              <div style={{ position: 'absolute', bottom: '20%', left: '15%', animation: 'bounce 2.5s infinite reverse' }}>
                <Database size={40} color="#8b5cf6" />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <div className="features-header">
            <h2>Engineered for Scale</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><Zap size={24} /></div>
              <h3>High-Performance Web</h3>
              <p>Specialized in React and modern JavaScript architectures to deliver lightning-fast, reactive web interfaces.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Smartphone size={24} /></div>
              <h3>Native Mobile Apps</h3>
              <p>Expert iOS and Android engineering delivering buttery-smooth cross-platform and native utility applications.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Database size={24} /></div>
              <h3>Robust Infrastructure</h3>
              <p>We build unbreakable PostgreSQL databases and scalable server environments optimized for enterprise traffic.</p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            <BrainCircuit size={24} color="#8b5cf6" />
            <span style={{ fontWeight: 600, color: '#f8fafc' }}>Vertex Digital</span>
          </div>
          <p>&copy; 2026 Vertex Digital Inc. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  // 2. Login Page View
  if (authStatus === 'login') {
    return (
      <Login
        onSubmit={handleLogin}
        onBack={() => { setAuthStatus('landing'); setLoginError(''); setSignupSuccess(''); }}
        onCreateAccount={() => { setAuthStatus('signup'); setSignupError(''); setSignupSuccess(''); }}
        error={loginError}
        loading={loginLoading}
        infoMessage={signupSuccess}
      />
    );
  }

  // 2b. Signup Page View
  if (authStatus === 'signup') {
    return (
      <Signup
        onSubmit={handleSignup}
        onBack={() => { setAuthStatus('login'); setSignupError(''); setSignupSuccess(''); }}
        loading={signupLoading}
        error={signupError}
        successMessage={signupSuccess}
      />
    );
  }

  // 3. Authenticated Main View
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
          <BrainCircuit size={32} color="#8b5cf6" />
          <span>Vertex Digital</span>
        </div>
        {menuOpen && (
          <div className="mobile-menu-panel" role="dialog" aria-hidden={!menuOpen}>
            <div className="mobile-menu-cards">
              <div className="mobile-menu-card">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <strong>Active Client Projects</strong>
                </div>
                <div className="menu-card-number">8</div>
                <div className="menu-card-sub">+2 this month</div>
              </div>
              <div className="mobile-menu-card">
                <strong>Server Uptime</strong>
                <div className="menu-card-number">99.99%</div>
              </div>
            </div>
          </div>
        )}
        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} style={{ color: currentPage === 'home' ? '#fff' : '' }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('about'); }} style={{ color: currentPage === 'about' ? '#fff' : '' }}>About</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('services'); }} style={{ color: currentPage === 'services' ? '#fff' : '' }}>Services</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('domain'); }} style={{ color: currentPage === 'domain' ? '#fff' : '' }}>Domain & Hosting</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('products'); }} style={{ color: currentPage === 'products' ? '#fff' : '' }}>Products</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('careers'); }} style={{ color: currentPage === 'careers' ? '#fff' : '' }}>Project Career</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }} style={{ color: currentPage === 'contact' ? '#fff' : '' }}>Contact</a>
          {authStatus === 'authenticated' && (
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('history'); }} style={{ color: currentPage === 'history' ? '#fff' : '' }}>
              Chat History
            </a>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {currentUser && (
            <span style={{ color: '#a78bfa', fontSize: '0.95rem' }}>
              Signed in as {currentUser.name || currentUser.email}
            </span>
          )}
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.18)',
              color: '#fff',
              padding: '8px 14px',
              borderRadius: '999px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <main style={{ flex: 1 }}>
        {renderContent()}
      </main>

      <footer className="footer">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
          <BrainCircuit size={24} color="#8b5cf6" />
          <span style={{ fontWeight: 600, color: '#f8fafc' }}>Vertex Digital</span>
        </div>
        <p>&copy; 2026 Vertex Digital Inc. All rights reserved.</p>
      </footer>

      <div className="floating-widget-wrapper">
        <div className={`floating-chat-popup ${isChatOpen ? 'is-open' : ''}`}>
           <ChatBox user={currentUser} />
        </div>
        <button 
          className="floating-fab" 
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label="Toggle Chat"
        >
          {isChatOpen ? <X size={28} /> : <MessageSquare size={28} />}
        </button>
      </div>
    </div>
  );
}

export default App;
