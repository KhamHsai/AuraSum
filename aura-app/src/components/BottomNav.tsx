import React from 'react';
import { useApp } from '../context/AppContext';
import './BottomNav.css';

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M2 9.5L11 2l9 7.5V20a1 1 0 0 1-1 1H14v-5h-4v5H3a1 1 0 0 1-1-1V9.5Z"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.2 : 0}
    />
  </svg>
);

const AccountIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="7" r="4" stroke="currentColor" strokeWidth="1.7"
      fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.2 : 0}
    />
    <path d="M3 19c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const BottomNav: React.FC = () => {
  const { page, setPage, t, setAddMethod } = useApp();

  const handleAdd = () => {
    setAddMethod(null);
    setPage('add-receipt');
  };

  return (
    <nav className="bottom-nav">
      <button
        className={`nav-btn ${page === 'home' ? 'active' : ''}`}
        onClick={() => setPage('home')}
      >
        <HomeIcon active={page === 'home'} />
        <span>{t('home')}</span>
      </button>

      <button className="fab" onClick={handleAdd} aria-label="Add receipt">
        <PlusIcon />
      </button>

      <button
        className={`nav-btn ${page === 'account' ? 'active' : ''}`}
        onClick={() => setPage('account')}
      >
        <AccountIcon active={page === 'account'} />
        <span>{t('account')}</span>
      </button>
    </nav>
  );
};
