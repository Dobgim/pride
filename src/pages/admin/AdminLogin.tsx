import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Eye, EyeOff, Lock, User, AlertCircle, ShieldCheck } from 'lucide-react';
import './AdminLogin.css';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'CareDrive@2025';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('cd_admin_auth') === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem('cd_admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="alp-bg">
        <div className="alp-grid" />
        <div className="alp-orb alp-orb-1" />
        <div className="alp-orb alp-orb-2" />
      </div>

      <motion.div
        className="alp-card"
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div className="alp-logo">
          <div className="alp-logo-icon"><Zap size={20} /></div>
          <div>
            <div className="alp-logo-brand">Care Drive</div>
            <div className="alp-logo-sub">ENCLOSED MOBILITY</div>
          </div>
        </div>

        <div className="alp-badge"><ShieldCheck size={14} /> Admin Portal</div>
        <h1 className="alp-title">Welcome back</h1>
        <p className="alp-subtitle">Sign in to manage your store</p>

        <form onSubmit={handleSubmit} className="alp-form">
          <div className="alp-field">
            <label htmlFor="adm-username">Username</label>
            <div className="alp-input-wrap">
              <User size={15} className="alp-input-icon" />
              <input
                id="adm-username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="alp-field">
            <label htmlFor="adm-password">Password</label>
            <div className="alp-input-wrap">
              <Lock size={15} className="alp-input-icon" />
              <input
                id="adm-password"
                type={showPass ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="alp-eye-btn"
                onClick={() => setShowPass(s => !s)}
                aria-label="Toggle password"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              className="alp-error"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={14} /> {error}
            </motion.div>
          )}

          <button type="submit" className="alp-submit-btn" disabled={loading}>
            {loading ? <span className="alp-spinner" /> : 'Sign In to Dashboard'}
          </button>
        </form>

        <a href="/" className="alp-back-link">← Back to website</a>
      </motion.div>
    </div>
  );
}
