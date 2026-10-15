import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin, onRegister }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    try {
      if (isRegister) {
        await onRegister(email, password, fullName);
      } else {
        await onLogin(email, password);
      }
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickEvaluator = () => {
    setEmail('evaluator@panel.com');
    setPassword('Review2026!');
    setIsRegister(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #0e1c36 0%, #081020 100%)',
        border: '1px solid rgba(0, 229, 255, 0.4)',
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.7), 0 0 24px rgba(0, 229, 255, 0.2)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '420px',
        padding: '28px',
        position: 'relative'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>
          {isRegister ? 'Create Dashboard Account' : 'Evaluator Sign In'}
        </h2>
        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
          JWT Authenticated access for economic indicators inspection.
        </p>

        {/* 1-Click Quick Fill Button for Interview Reviewers */}
        {!isRegister && (
          <button
            type="button"
            onClick={handleQuickEvaluator}
            style={{
              width: '100%',
              background: 'rgba(0, 229, 153, 0.12)',
              border: '1px dashed #00e599',
              borderRadius: '8px',
              padding: '8px 12px',
              color: '#00e599',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <ShieldCheck size={14} />
            Auto-fill Evaluation Credentials
          </button>
        )}

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            fontSize: '12px',
            padding: '8px 12px',
            borderRadius: '6px',
            marginBottom: '16px'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', top: 12, left: 12, color: '#64748b' }} />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Reviewer Name"
                  style={{
                    width: '100%',
                    background: '#091322',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px 12px 10px 38px',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', top: 12, left: 12, color: '#64748b' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="evaluator@panel.com"
                style={{
                  width: '100%',
                  background: '#091322',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '10px 12px 10px 38px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', top: 12, left: 12, color: '#64748b' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  background: '#091322',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '10px 12px 10px 38px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0, 180, 216, 0.4)'
            }}
          >
            {submitting ? 'Authenticating...' : (isRegister ? 'Register Account' : 'Sign In with JWT')}
          </button>
        </form>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => { setIsRegister(!isRegister); setErrorMsg(''); }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#38bdf8',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
