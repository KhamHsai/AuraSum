import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { AccountPage } from './pages/AccountPage';
import { AddReceiptPage } from './pages/AddReceiptPage';
import { BottomNav } from './components/BottomNav';
import './index.css';

const AppInner: React.FC = () => {
  const { page } = useApp();

  if (page === 'login') {
    return <LoginPage />;
  }

  return (
    <div className="app-shell">
      <main style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        {page === 'home' && <HomePage />}
        {page === 'account' && <AccountPage />}
        {page === 'add-receipt' && <AddReceiptPage />}
      </main>
      {page !== 'add-receipt' && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <AppInner />
  </AppProvider>
);

export default App;
