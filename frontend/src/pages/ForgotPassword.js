import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Mail, KeyRound, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import './Auth.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter code + new password, 3 = success
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [devCode, setDevCode] = useState('');

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/forgot-password', { email });
      toast.success('Reset code generated!');
      if (response.data.resetCode) {
        setDevCode(response.data.resetCode);
      }
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset code. Make sure this email is registered.');
    }

    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/reset-password', { email, resetCode, newPassword });
      toast.success('Password reset successfully!');
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {step === 1 && (
          <>
            <div className="auth-header">
              <KeyRound size={32} className="auth-icon" />
              <h1>Forgot Password?</h1>
              <p>Enter your email and we'll send you a reset code</p>
            </div>

            <form onSubmit={handleRequestReset} className="auth-form">
              <div className="form-group">
                <label className="form-label">
                  <Mail size={18} />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-submit"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Code'}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                <Link to="/login" className="auth-link">
                  <ArrowLeft size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Back to Login
                </Link>
              </p>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="auth-header">
              <Lock size={32} className="auth-icon" />
              <h1>Reset Password</h1>
              <p>Enter the 6-digit code and your new password</p>
            </div>

            {devCode && (
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1))', 
                border: '1px solid rgba(102,126,234,0.3)',
                borderRadius: '12px', 
                padding: '14px 18px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <small style={{ color: '#667eea', fontWeight: 600 }}>Your reset code:</small>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a202c', letterSpacing: '4px', marginTop: '4px' }}>
                  {devCode}
                </div>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="auth-form">
              <div className="form-group">
                <label className="form-label">
                  <KeyRound size={18} />
                  Reset Code
                </label>
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className="form-input"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Lock size={18} />
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter new password"
                  minLength={6}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Lock size={18} />
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  placeholder="Confirm new password"
                  minLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-submit"
                disabled={loading}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                <button onClick={() => setStep(1)} className="auth-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <ArrowLeft size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Try a different email
                </button>
              </p>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="auth-header">
              <CheckCircle size={32} className="auth-icon" style={{ color: '#48bb78' }} />
              <h1>Password Reset!</h1>
              <p>Your password has been reset successfully. You can now log in with your new password.</p>
            </div>

            <div className="auth-footer" style={{ borderTop: 'none', paddingTop: '0' }}>
              <Link to="/login" className="btn btn-primary auth-submit" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Go to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
