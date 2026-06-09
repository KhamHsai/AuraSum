export type Language = 'en' | 'th';

export type Category =
  | 'groceries'
  | 'dining'
  | 'utilities'
  | 'shopping'
  | 'transport'
  | 'health'
  | 'entertainment'
  | 'other';

export interface Receipt {
  id: string;
  merchant: string;
  amount: number;
  date: string; // ISO string
  category: Category;
  note?: string;
  method: 'camera' | 'manual';
}

export interface User {
  name: string;
  email: string;
  avatarInitials: string;
  currency: 'THB' | 'USD' | 'EUR';
  language: Language;
}

export type Page = 'login' | 'home' | 'account' | 'add-receipt';
export type AddMethod = 'camera' | 'manual' | null;
