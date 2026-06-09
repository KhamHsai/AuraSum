import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { DonutChart } from '../components/DonutChart';
import { ReceiptCard } from '../components/ReceiptCard';
import { CATEGORY_COLORS, ALL_CATEGORIES, getMonthlyTotals } from '../utils/categories';
import { Category } from '../types';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const { user, receipts, t, formatCurrency, language } = useApp();
  const [showAll, setShowAll] = useState(false);

  const monthlyTotals = useMemo(() => getMonthlyTotals(receipts), [receipts]);
  const totalMonthly = Object.values(monthlyTotals).reduce((a, b) => a + b, 0);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const lastMonthTotal = useMemo(() => {
    return receipts
      .filter(r => {
        const d = new Date(r.date);
        const lm = currentMonth === 0 ? 11 : currentMonth - 1;
        const ly = currentMonth === 0 ? currentYear - 1 : currentYear;
        return d.getMonth() === lm && d.getFullYear() === ly;
      })
      .reduce((sum, r) => sum + r.amount, 0);
  }, [receipts]);

  const changePercent = lastMonthTotal
    ? Math.round(((totalMonthly - lastMonthTotal) / lastMonthTotal) * 100)
    : 0;

  const slices = ALL_CATEGORIES
    .filter(cat => monthlyTotals[cat] > 0)
    .map(cat => ({
      category: cat as Category,
      value: monthlyTotals[cat],
      percentage: totalMonthly > 0 ? (monthlyTotals[cat] / totalMonthly) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value);

  const monthLabel = now.toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', {
    month: 'long', year: 'numeric',
  });

  const greeting = `${t('greeting')}, ${user?.name ?? ''} ☀️`;
  const visibleReceipts = showAll ? receipts : receipts.slice(0, 5);

  return (
    <div className="home-page">
      {/* Header */}
      <div className="home-header animate-fade-up">
        <div>
          <p className="home-greeting">{greeting}</p>
          <p className="home-month">{monthLabel}</p>
        </div>
        <div className="home-avatar">
          {user?.avatarInitials}
        </div>
      </div>

      {/* Monthly card */}
      <div className="monthly-card glass-card animate-fade-up delay-1">
        <div className="monthly-card-top">
          <div>
            <p className="monthly-label">{t('monthlyExpenses')}</p>
            <h2 className="monthly-amount">{formatCurrency(totalMonthly)}</h2>
            <div className={`monthly-change ${changePercent <= 0 ? 'positive' : 'negative'}`}>
              <span>{changePercent > 0 ? '↑' : '↓'}</span>
              <span>{Math.abs(changePercent)}% {t('vsLastMonth')}</span>
            </div>
          </div>
          <DonutChart
            slices={slices}
            total={totalMonthly}
            centerLabel={formatCurrency(totalMonthly).replace(/[^0-9KMB.,]/g, '')}
          />
        </div>

        {/* Legend */}
        {slices.length > 0 && (
          <div className="category-legend">
            {slices.slice(0, 4).map(s => (
              <div className="legend-item" key={s.category}>
                <span className="legend-dot" style={{ background: CATEGORY_COLORS[s.category] }} />
                <span className="legend-name">{t(s.category)}</span>
                <span className="legend-pct">{Math.round(s.percentage)}%</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Insight */}
      {slices.length > 0 && (
        <div className="ai-insight-card animate-fade-up delay-2">
          <div className="ai-insight-icon">✨</div>
          <div className="ai-insight-text">
            <span className="ai-insight-label">{t('aiInsight')}</span>
            <p>
              {language === 'th'
                ? `ค่า${t(slices[0].category)}ของคุณสูงสุดในเดือนนี้ที่ ${Math.round(slices[0].percentage)}%`
                : `Your ${t(slices[0].category)} is your top spend at ${Math.round(slices[0].percentage)}% this month.`
              }
            </p>
          </div>
        </div>
      )}

      {/* Recent receipts */}
      <div className="receipts-section animate-fade-up delay-3">
        <div className="section-header">
          <h3>{t('recentReceipts')}</h3>
          <button className="see-all-btn" onClick={() => setShowAll(v => !v)}>
            {showAll ? '↑' : t('seeAll')}
          </button>
        </div>

        {receipts.length === 0 ? (
          <div className="empty-state">
            <span>🧾</span>
            <p>{t('noReceipts')}</p>
          </div>
        ) : (
          <div className="receipts-list">
            {visibleReceipts.map((r, i) => (
              <ReceiptCard key={r.id} receipt={r} index={i} />
            ))}
          </div>
        )}
      </div>

      <div style={{ height: 100 }} />
    </div>
  );
};
