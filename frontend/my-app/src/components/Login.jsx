import React, { useState } from 'react';
import { BrainCircuit, ArrowRight, Lock, Mail } from 'lucide-react';

const Login = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and go directly to the chat
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{ position: 'absolute', top: '40px', left: '60px', cursor: 'pointer' }} onClick={onBack}>
        <div className="logo">
          <BrainCircuit size={28} color="#8b5cf6" />
          <span>Vertex Digital</span>
        </div>
      </div>

      <div style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.7)',
          position: 'relative',
          zIndex: 10
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '8px' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Sign in to continue to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
            <div className="input-container" style={{ padding: '4px' }}>
              <div style={{ padding: '10px 0 10px 15px', display: 'flex', alignItems: 'center' }}>
                <Mail size={18} color="var(--text-muted)" />
              </div>
              <input 
                type="email" 
                placeholder="you@company.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Password</label>
                <a href="#" style={{ fontSize: '0.8rem', color: 'var(--primary)', textDecoration: 'none' }}>Forgot?</a>
             </div>
            <div className="input-container" style={{ padding: '4px' }}>
              <div style={{ padding: '10px 0 10px 15px', display: 'flex', alignItems: 'center' }}>
                <Lock size={18} color="var(--text-muted)" />
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account? <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Create one</a>
        </div>

      </div>
      
      {/* Background ambient glow matching hero */}
      <div className="glow-behind" style={{ filter: 'blur(100px)', width: '600px', height: '600px', zIndex: 0 }}></div>
    </div>
  );
};

export default Login;
