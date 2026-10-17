import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin, onRegister, isMandatory = false, initialMode = 'login' }) {
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsRegister(initialMode === 'register');
      setErrorMsg('');
    }
  }, [isOpen, initialMode]);

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
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
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
      backgroundColor: 'rgba(5, 10, 20, 0.88)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 28, 54, 0.95) 0%, rgba(8, 16, 32, 0.98) 100%)',
        border: '1px solid rgba(0, 229, 255, 0.35)',
        boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 32px rgba(0, 229, 255, 0.25)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '440px',
        padding: '32px',
        position: 'relative'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s ease'
          }}
        >
          <X size={20} />
        </button>

        {/* Security Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(0, 229, 255, 0.1)',
          border: '1px solid rgba(0, 229, 255, 0.3)',
          color: '#38bdf8',
          fontSize: '11px',
          fontWeight: '700',
          padding: '4px 10px',
          borderRadius: '20px',
          marginBottom: '14px',
          letterSpacing: '0.04em'
        }}>
          <ShieldCheck size={13} />
          SECURE TERMINAL GATE · JWT 256-BIT
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', marginBottom: '6px', letterSpacing: '0.01em' }}>
          {isRegister ? 'Create Evaluation Account' : 'Sign In to Access Dashboard'}
        </h2>
        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px', lineHeight: 1.5 }}>
          Authentication required to inspect live PostgreSQL indicator snapshots and macro intelligence feeds.
        </p>

        {/* 1-Click Quick Fill Button for Interview Reviewers */}
        {!isRegister && (
          <button
            type="button"
            onClick={handleQuickEvaluator}
            style={{
              width: '100%',
              background: 'rgba(0, 229, 153, 0.12)',
              border: '1px solid #00e599',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#00e599',
              fontSize: '12.5px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '20px',
              transition: 'all 0.2s ease',
              boxShadow: '0 0 14px rgba(0, 229, 153, 0.15)'
            }}
          >
            <Sparkles size={15} />
            <span>⚡ 1-Click Auto-fill Evaluation Credentials</span>
          </button>
        )}

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            marginBottom: '16px'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isRegister && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: 600 }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={15} style={{ position: 'absolute', left: 12, top: 12, color: '#64748b' }} />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Review Panelist"
                  style={{
                    width: '100%',
                    background: 'rgba(10, 19, 36, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px 12px 10px 36px',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: 600 }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} style={{ position: 'absolute', left: 12, top: 12, color: '#64748b' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="evaluator@panel.com"
                style={{
                  width: '100%',
                  background: 'rgba(10, 19, 36, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '10px 12px 10px 36px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px', fontWeight: 600 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: 12, top: 12, color: '#64748b' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  background: 'rgba(10, 19, 36, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '10px 12px 10px 36px',
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
              background: 'linear-gradient(135deg, #00e5ff 0%, #0077b6 100%)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              color: '#070d18',
              fontSize: '14px',
              fontWeight: '800',
              cursor: submitting ? 'wait' : 'pointer',
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 18px rgba(0, 229, 255, 0.35)',
              letterSpacing: '0.02em'
            }}
          >
            <span>{submitting ? 'Authenticating...' : (isRegister ? 'Register & Enter' : 'Sign In to Dashboard')}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            type="button"
            onClick={() => { setIsRegister(!isRegister); setErrorMsg(''); }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#38bdf8',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register here"}
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              fontSize: '11px',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Or preview dashboard as Guest →
          </button>
        </div>
      </div>
    </div>
  );
}
