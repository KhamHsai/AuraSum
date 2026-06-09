import { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Auth
    welcomeBack: 'Welcome back.',
    loginSubtitle: 'Your finances, always in focus.',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    signIn: 'Sign In',
    orContinueWith: 'or continue with',
    signInGoogle: 'Continue with Google',

    // Nav
    home: 'Home',
    account: 'Account',

    // Home
    greeting: 'Hello',
    monthlyExpenses: 'Monthly Expenses',
    thisMonth: 'This Month',
    vsLastMonth: 'vs last month',
    recentReceipts: 'Recent Receipts',
    seeAll: 'See All',
    noReceipts: 'No receipts yet. Tap + to add one.',
    aiInsight: 'AI Insight',

    // Categories
    groceries: 'Groceries',
    dining: 'Dining',
    utilities: 'Utilities',
    shopping: 'Shopping',
    transport: 'Transport',
    health: 'Health',
    entertainment: 'Entertainment',
    other: 'Other',

    // Add Receipt
    addReceipt: 'Add Receipt',
    scanReceipt: 'Scan Receipt',
    scanDesc: 'Hold camera over receipt. AI categorizes automatically.',
    manualEntry: 'Manual Entry',
    manualDesc: 'Type in your receipt details manually.',
    merchant: 'Merchant / Store',
    amount: 'Amount',
    date: 'Date',
    category: 'Category',
    note: 'Note (optional)',
    save: 'Save Receipt',
    cancel: 'Cancel',
    cameraPlaceholder: 'Point camera at receipt...',
    processing: 'Processing...',
    capture: 'Capture',

    // Account
    profile: 'Profile',
    personalInfo: 'Personal Information',
    languageSettings: 'Language',
    currencySettings: 'Currency',
    notifications: 'Notifications',
    darkMode: 'Dark Mode',
    privacy: 'Privacy',
    signOut: 'Sign Out',
    editProfile: 'Edit Profile',

    // Misc
    currency: 'Currency',
    back: 'Back',
    total: 'Total',
  },
  th: {
    // Auth
    welcomeBack: 'ยินดีต้อนรับกลับ',
    loginSubtitle: 'การเงินของคุณ อยู่ในมือเสมอ',
    email: 'อีเมล',
    password: 'รหัสผ่าน',
    forgotPassword: 'ลืมรหัสผ่าน?',
    signIn: 'เข้าสู่ระบบ',
    orContinueWith: 'หรือดำเนินการด้วย',
    signInGoogle: 'ดำเนินการด้วย Google',

    // Nav
    home: 'หน้าหลัก',
    account: 'บัญชี',

    // Home
    greeting: 'สวัสดี',
    monthlyExpenses: 'ค่าใช้จ่ายรายเดือน',
    thisMonth: 'เดือนนี้',
    vsLastMonth: 'เทียบเดือนที่แล้ว',
    recentReceipts: 'ใบเสร็จล่าสุด',
    seeAll: 'ดูทั้งหมด',
    noReceipts: 'ยังไม่มีใบเสร็จ กด + เพื่อเพิ่ม',
    aiInsight: 'AI วิเคราะห์',

    // Categories
    groceries: 'ของชำ',
    dining: 'อาหาร',
    utilities: 'สาธารณูปโภค',
    shopping: 'ช้อปปิ้ง',
    transport: 'การเดินทาง',
    health: 'สุขภาพ',
    entertainment: 'บันเทิง',
    other: 'อื่นๆ',

    // Add Receipt
    addReceipt: 'เพิ่มใบเสร็จ',
    scanReceipt: 'สแกนใบเสร็จ',
    scanDesc: 'ถือกล้องให้ตรงกับใบเสร็จ AI จัดหมวดหมู่อัตโนมัติ',
    manualEntry: 'กรอกข้อมูลเอง',
    manualDesc: 'พิมพ์รายละเอียดใบเสร็จด้วยตนเอง',
    merchant: 'ร้านค้า / สถานที่',
    amount: 'จำนวนเงิน',
    date: 'วันที่',
    category: 'หมวดหมู่',
    note: 'หมายเหตุ (ไม่บังคับ)',
    save: 'บันทึกใบเสร็จ',
    cancel: 'ยกเลิก',
    cameraPlaceholder: 'ชี้กล้องไปที่ใบเสร็จ...',
    processing: 'กำลังประมวลผล...',
    capture: 'ถ่ายภาพ',

    // Account
    profile: 'โปรไฟล์',
    personalInfo: 'ข้อมูลส่วนตัว',
    languageSettings: 'ภาษา',
    currencySettings: 'สกุลเงิน',
    notifications: 'การแจ้งเตือน',
    darkMode: 'โหมดมืด',
    privacy: 'ความเป็นส่วนตัว',
    signOut: 'ออกจากระบบ',
    editProfile: 'แก้ไขโปรไฟล์',

    // Misc
    currency: 'สกุลเงิน',
    back: 'กลับ',
    total: 'รวม',
  },
};
