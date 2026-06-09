import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Page, Receipt, User, AddMethod } from '../types';
import { translations } from '../utils/translations';

interface AppContextType {
  page: Page;
  setPage: (page: Page) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  receipts: Receipt[];
  addReceipt: (receipt: Receipt) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  addMethod: AddMethod;
  setAddMethod: (method: AddMethod) => void;
  formatCurrency: (amount: number) => string;
}

const AppContext = createContext<AppContextType | null>(null);

const SAMPLE_RECEIPTS: Receipt[] = [
  { id: '1', merchant: 'Tops Market', amount: 1240, date: '2025-06-07', category: 'groceries', method: 'camera' },
  { id: '2', merchant: 'Starbucks', amount: 185, date: '2025-06-06', category: 'dining', method: 'manual' },
  { id: '3', merchant: 'BTS Rabbit Card', amount: 300, date: '2025-06-05', category: 'transport', method: 'manual' },
  { id: '4', merchant: 'Central World', amount: 2890, date: '2025-06-04', category: 'shopping', method: 'camera' },
  { id: '5', merchant: 'PTT Oil', amount: 1050, date: '2025-06-03', category: 'transport', method: 'manual' },
  { id: '6', merchant: 'Som Tam Nua', amount: 420, date: '2025-06-02', category: 'dining', method: 'camera' },
  { id: '7', merchant: 'True Move H', amount: 599, date: '2025-06-01', category: 'utilities', method: 'manual' },
  { id: '8', merchant: 'Villa Market', amount: 876, date: '2025-05-30', category: 'groceries', method: 'camera' },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<Page>('login');
  const [user, setUser] = useState<User | null>(null);
  const [receipts, setReceipts] = useState<Receipt[]>(SAMPLE_RECEIPTS);
  const [language, setLanguage] = useState<Language>('en');
  const [addMethod, setAddMethod] = useState<AddMethod>(null);

  const t = (key: string): string => translations[language][key] ?? key;

  const addReceipt = (receipt: Receipt) => {
    setReceipts(prev => [receipt, ...prev]);
  };

  const formatCurrency = (amount: number): string => {
    const currency = user?.currency ?? 'THB';
    return new Intl.NumberFormat(language === 'th' ? 'th-TH' : 'en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <AppContext.Provider value={{
      page, setPage,
      user, setUser,
      receipts, addReceipt,
      language, setLanguage,
      t,
      addMethod, setAddMethod,
      formatCurrency,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
