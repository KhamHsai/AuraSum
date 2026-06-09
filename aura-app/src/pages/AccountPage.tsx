import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import './AccountPage.css';

const SettingRow: React.FC<{
  icon: string;
  label: string;
  value?: string;
  children?: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
}> = ({ icon, label, value, children, danger, onClick }) => (
  <div className={`setting-row ${danger ? 'danger' : ''}`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
    <span className="setting-icon">{icon}</span>
    <span className="setting-label">{label}</span>
    <div className="setting-right">
      {value && <span className="setting-value">{value}</span>}
      {children}
      {onClick && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="setting-chevron">
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  </div>
);

const Toggle: React.FC<{ on: boolean; onChange: () => void }> = ({ on, onChange }) => (
  <button
    className={`toggle ${on ? 'on' : ''}`}
    onClick={e => { e.stopPropagation(); onChange(); }}
  >
    <span className="toggle-thumb" />
  </button>
);

export const AccountPage: React.FC = () => {
  const { user, setUser, setPage, t, language, setLanguage, formatCurrency, receipts } = useApp();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [currency, setCurrency] = useState(user?.currency ?? 'THB');

  const totalSpend = receipts.reduce((sum, r) => sum + r.amount, 0);
  const receiptCount = receipts.length;

  const handleSignOut = () => {
    setUser(null);
    setPage('login');
  };

  return (
    <div className="account-page">
      {/* Profile hero */}
      <div className="profile-hero animate-fade-up">
        <div className="profile-avatar-large">
          {user?.avatarInitials}
          <div className="avatar-ring" />
        </div>
        <div className="profile-name-block">
          <h2 className="profile-name">{user?.name}</h2>
          <p className="profile-email">{user?.email}</p>
        </div>
        <button className="edit-profile-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11.5 2.5a1.414 1.414 0 0 1 2 2L5 13H3v-2L11.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('editProfile')}
        </button>
      </div>

      {/* Stats */}
      <div className="account-stats animate-fade-up delay-1">
        <div className="stat-card">
          <span className="stat-value">{receiptCount}</span>
          <span className="stat-label">Receipts</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-card">
          <span className="stat-value">{formatCurrency(totalSpend)}</span>
          <span className="stat-label">Total tracked</span>
        </div>
      </div>

      {/* Settings groups */}
      <div className="settings-group animate-fade-up delay-2">
        <p className="settings-group-title">{t('personalInfo')}</p>

        <SettingRow icon="🌐" label={t('languageSettings')} value={language === 'th' ? 'ภาษาไทย' : 'English'}>
          <div className="lang-inline-toggle">
            <button
              className={`lang-inline-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >EN</button>
            <button
              className={`lang-inline-btn ${language === 'th' ? 'active' : ''}`}
              onClick={() => setLanguage('th')}
            >ไทย</button>
          </div>
        </SettingRow>

        <SettingRow icon="💱" label={t('currencySettings')}>
          <select
            className="setting-select"
            value={currency}
            onChange={e => {
              const c = e.target.value as 'THB' | 'USD' | 'EUR';
              setCurrency(c);
              if (user) setUser({ ...user, currency: c });
            }}
          >
            <option value="THB">THB ฿</option>
            <option value="USD">USD $</option>
            <option value="EUR">EUR €</option>
          </select>
        </SettingRow>
      </div>

      <div className="settings-group animate-fade-up delay-3">
        <p className="settings-group-title">Preferences</p>

        <SettingRow icon="🔔" label={t('notifications')}>
          <Toggle on={notifications} onChange={() => setNotifications(v => !v)} />
        </SettingRow>

        <SettingRow icon="🌙" label={t('darkMode')}>
          <Toggle on={darkMode} onChange={() => setDarkMode(v => !v)} />
        </SettingRow>

        <SettingRow icon="🔒" label={t('privacy')} onClick={() => {}} />
      </div>

      <div className="settings-group animate-fade-up delay-4">
        <SettingRow icon="🚪" label={t('signOut')} danger onClick={handleSignOut} />
      </div>

      <div style={{ height: 100 }} />
    </div>
  );
};
