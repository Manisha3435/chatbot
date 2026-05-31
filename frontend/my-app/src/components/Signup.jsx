import React, { useState } from 'react';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';

const Signup = ({ onSubmit, onBack, loading, error, successMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      onSubmit({ name, email, password });
    }
  };

  return (
    <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: '40px', left: '60px', cursor: 'pointer' }} onClick={onBack}>
        <div className="logo">
          <User size={28} color="#8b5cf6" />
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
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '8px' }}>Create your account</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Sign up to access the Vertex Digital dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>Name</label>
            <div className="input-container" style={{ padding: '4px' }}>
              <div style={{ padding: '10px 0 10px 15px', display: 'flex', alignItems: 'center' }}>
                <User size={18} color="var(--text-muted)" />
              </div>
              <input
                type="text"
                placeholder="Your full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

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
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>Password</label>
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

          <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'} <ArrowRight size={18} />
          </button>

          {error && (
            <div style={{ color: '#f87171', marginTop: '12px', fontSize: '0.95rem' }}>
              {error}
            </div>
          )}

          {successMessage && (
            <div style={{ color: '#34d399', marginTop: '12px', fontSize: '0.95rem' }}>
              {successMessage}
            </div>
          )}
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account? <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }} onClick={onBack}>Sign In</a>
        </div>
      </div>

      <div className="glow-behind" style={{ filter: 'blur(100px)', width: '600px', height: '600px', zIndex: 0 }}></div>
    </div>
  );
};

export default Signup;
