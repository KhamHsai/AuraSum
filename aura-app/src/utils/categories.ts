import { Category } from '../types';

export const CATEGORY_COLORS: Record<Category, string> = {
  groceries: '#2dd4bf',
  dining: '#f0c060',
  utilities: '#818cf8',
  shopping: '#fb7185',
  transport: '#34d399',
  health: '#60a5fa',
  entertainment: '#f472b6',
  other: '#94a3b8',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  groceries: '🛒',
  dining: '🍜',
  utilities: '⚡',
  shopping: '🛍️',
  transport: '🚌',
  health: '💊',
  entertainment: '🎬',
  other: '📄',
};

export const ALL_CATEGORIES: Category[] = [
  'groceries', 'dining', 'utilities', 'shopping',
  'transport', 'health', 'entertainment', 'other',
];

export const getMonthlyTotals = (
  receipts: { date: string; amount: number; category: Category }[]
): Record<Category, number> => {
  const totals: Partial<Record<Category, number>> = {};
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  receipts.forEach(r => {
    const d = new Date(r.date);
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      totals[r.category] = (totals[r.category] ?? 0) + r.amount;
    }
  });
  return totals as Record<Category, number>;
};

export const formatDate = (isoDate: string, lang: 'en' | 'th'): string => {
  const d = new Date(isoDate);
  return d.toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-GB', {
    day: 'numeric',
    month: 'short',
  });
};
