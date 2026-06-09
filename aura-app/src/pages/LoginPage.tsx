import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Language } from '../types';
import './LoginPage.css';

const AuraLogo = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="14" fill="url(#logoGrad)" />
    <path d="M24 10L34 34H14L24 10Z" fill="white" opacity="0.9" />
    <path d="M24 18L30 34H18L24 18Z" fill="url(#innerGrad)" />
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4f6bab" />
        <stop offset="1" stopColor="#1a2236" />
      </linearGradient>
      <linearGradient id="innerGrad" x1="24" y1="18" x2="24" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f0c060" />
        <stop offset="1" stopColor="#e8a830" stopOpacity="0.6" />
      </linearGradient>
    </defs>
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2a10.34 10.34 0 0 0-.16-1.84H9v3.48h4.84A4.14 4.14 0 0 1 12.07 13v2.26h2.89C16.66 13.66 17.64 11.6 17.64 9.2Z" fill="#4285F4" />
    <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26C11.25 14.14 10.2 14.5 9 14.5c-2.39 0-4.41-1.62-5.13-3.79H.84v2.34A9 9 0 0 0 9 18Z" fill="#34A853" />
    <path d="M3.87 10.71A5.41 5.41 0 0 1 3.58 9c0-.59.1-1.17.29-1.71V4.95H.84A9 9 0 0 0 0 9c0 1.45.35 2.82.84 4.05l3.03-2.34Z" fill="#FBBC05" />
    <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.95 8.95 0 0 0 9 0 9 9 0 0 0 .84 4.95L3.87 7.3C4.59 5.12 6.61 3.58 9 3.58Z" fill="#EA4335" />
  </svg>
);

export const LoginPage: React.FC = () => {
  const { setPage, setUser, language, setLanguage, t } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      const initials = email.split('@')[0].slice(0, 2).toUpperCase();
      setUser({
        name: email.split('@')[0],
        email,
        avatarInitials: initials,
        currency: 'THB',
        language,
      });
      setPage('home');
      setLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setUser({
        name: 'Sarah',
        email: 'sarah@example.com',
        avatarInitials: 'SA',
        currency: 'THB',
        language,
      });
      setPage('home');
      setLoading(false);
    }, 800);
  };

  const toggleLang = (lang: Language) => setLanguage(lang);

  return (
    <div className="login-page">
      <div className="login-bg-mesh" />

      <div className="login-lang-toggle">
        <button
          className={`lang-btn ${language === 'en' ? 'active' : ''}`}
          onClick={() => toggleLang('en')}
        >EN</button>
        <span className="lang-divider">|</span>
        <button
          className={`lang-btn ${language === 'th' ? 'active' : ''}`}
          onClick={() => toggleLang('th')}
        >ไทย</button>
      </div>

      <div className="login-content">
        <div className="login-header animate-fade-up">
          <AuraLogo />
          <h1 className="login-brand">AuraSum</h1>
        </div>

        <div className="login-headline animate-fade-up delay-1">
          <h2>{t('welcomeBack')}</h2>
          <p>{t('loginSubtitle')}</p>
        </div>

        <div className="login-form animate-fade-up delay-2">
          <div className="input-group">
            <label className="input-label">{t('email')}</label>
            <input
              className="input-field"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div className="input-group">
            <div className="password-label-row">
              <label className="input-label">{t('password')}</label>
              <button className="forgot-link">{t('forgotPassword')}</button>
            </div>
            <input
              className="input-field"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <button
            className={`btn-primary login-btn ${loading ? 'loading' : ''}`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner" />
            ) : (
              t('signIn')
            )}
          </button>

          <div className="divider">
            <span>{t('orContinueWith')}</span>
          </div>

          <button className="btn-google" onClick={handleGoogleLogin} disabled={loading}>
            <GoogleIcon />
            {t('signInGoogle')}
          </button>
        </div>

        <div className="login-footer animate-fade-up delay-3">
          <div className="login-tagline">
            <span className="dot" />
            <span>AI-powered receipt tracking</span>
            <span className="dot" />
          </div>
        </div>
      </div>
    </div>
  );
};
