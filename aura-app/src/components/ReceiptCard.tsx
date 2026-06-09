import React from 'react';
import { Receipt } from '../types';
import { CATEGORY_COLORS, CATEGORY_ICONS, formatDate } from '../utils/categories';
import { useApp } from '../context/AppContext';
import './ReceiptCard.css';

interface ReceiptCardProps {
  receipt: Receipt;
  index?: number;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({ receipt, index = 0 }) => {
  const { language, t, formatCurrency } = useApp();
  const color = CATEGORY_COLORS[receipt.category];
  const icon = CATEGORY_ICONS[receipt.category];

  return (
    <div
      className="receipt-card animate-fade-up"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="receipt-icon" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
        <span>{icon}</span>
      </div>
      <div className="receipt-info">
        <span className="receipt-merchant">{receipt.merchant}</span>
        <span className="receipt-meta">
          <span className="receipt-category" style={{ color }}>
            {t(receipt.category)}
          </span>
          <span className="receipt-dot">·</span>
          <span className="receipt-date">{formatDate(receipt.date, language)}</span>
        </span>
      </div>
      <div className="receipt-amount">
        <span className="receipt-amount-value">{formatCurrency(receipt.amount)}</span>
        {receipt.method === 'camera' && (
          <span className="receipt-method-badge">AI</span>
        )}
      </div>
    </div>
  );
};
