import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Category, Receipt } from '../types';
import { ALL_CATEGORIES, CATEGORY_ICONS } from '../utils/categories';
import './AddReceiptPage.css';

export const AddReceiptPage: React.FC = () => {
  const { t, addMethod, setAddMethod, setPage, addReceipt, formatCurrency } = useApp();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  // Manual form state
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<Category>('other');
  const [note, setNote] = useState('');

  const handleSave = () => {
    if (!merchant || !amount) return;
    const receipt: Receipt = {
      id: Date.now().toString(),
      merchant,
      amount: parseFloat(amount),
      date,
      category,
      note,
      method: addMethod === 'camera' ? 'camera' : 'manual',
    };
    addReceipt(receipt);
    setAddMethod(null);
    setPage('home');
  };

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      // Simulate AI fill
      setMerchant('Starbucks');
      setAmount('185');
      setCategory('dining');
      setDate(new Date().toISOString().split('T')[0]);
    }, 2200);
  };

  // Method selection screen
  if (!addMethod) {
    return (
      <div className="add-page">
        <div className="add-page-header animate-fade-up">
          <button className="back-btn" onClick={() => setPage('home')}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t('back')}
          </button>
          <h2>{t('addReceipt')}</h2>
        </div>

        <div className="method-cards animate-fade-up delay-1">
          <button className="method-card camera-card" onClick={() => setAddMethod('camera')}>
            <div className="method-card-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="9" width="24" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
                <circle cx="16" cy="18" r="5" stroke="currentColor" strokeWidth="2" />
                <path d="M12 9V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2" />
                <circle cx="24" cy="13" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <h3>{t('scanReceipt')}</h3>
            <p>{t('scanDesc')}</p>
            <span className="method-badge ai-badge">AI Powered</span>
          </button>

          <button className="method-card manual-card" onClick={() => setAddMethod('manual')}>
            <div className="method-card-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="6" y="4" width="20" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
                <path d="M10 10h12M10 15h12M10 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3>{t('manualEntry')}</h3>
            <p>{t('manualDesc')}</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="add-page">
      <div className="add-page-header animate-fade-up">
        <button className="back-btn" onClick={() => setAddMethod(null)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('back')}
        </button>
        <h2>{addMethod === 'camera' ? t('scanReceipt') : t('manualEntry')}</h2>
      </div>

      {/* Camera viewfinder */}
      {addMethod === 'camera' && !scanned && (
        <div className="camera-view animate-scale-in">
          <div className="camera-frame">
            <div className="scanner-line" style={{ animationPlayState: scanning ? 'running' : 'paused' }} />
            <div className="corner tl" /><div className="corner tr" />
            <div className="corner bl" /><div className="corner br" />
            <p className="camera-hint">{scanning ? t('processing') : t('cameraPlaceholder')}</p>
          </div>
          {!scanning && (
            <button className="shutter-btn" onClick={handleScan}>
              <span>{t('capture')}</span>
            </button>
          )}
          {scanning && <div className="scanning-label">⚡ {t('processing')}</div>}
        </div>
      )}

      {/* Form */}
      <div className={`receipt-form animate-fade-up ${addMethod === 'camera' && !scanned ? 'hidden' : ''}`}>
        {scanned && (
          <div className="ai-fill-badge animate-scale-in">
            ✨ AI filled — review & confirm
          </div>
        )}

        <div className="input-group">
          <label className="input-label">{t('merchant')}</label>
          <input className="input-field" value={merchant} onChange={e => setMerchant(e.target.value)} placeholder="e.g. Starbucks" />
        </div>

        <div className="form-row">
          <div className="input-group">
            <label className="input-label">{t('amount')}</label>
            <input className="input-field" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" />
          </div>
          <div className="input-group">
            <label className="input-label">{t('date')}</label>
            <input className="input-field" type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">{t('category')}</label>
          <div className="category-grid">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cat-chip ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                <span>{CATEGORY_ICONS[cat]}</span>
                <span>{t(cat)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">{t('note')}</label>
          <input className="input-field" value={note} onChange={e => setNote(e.target.value)} placeholder="..." />
        </div>

        <div className="form-actions">
          <button className="btn-primary" onClick={handleSave}>{t('save')}</button>
          <button className="btn-secondary" onClick={() => { setAddMethod(null); setPage('home'); }}>{t('cancel')}</button>
        </div>
      </div>

      <div style={{ height: 40 }} />
    </div>
  );
};
