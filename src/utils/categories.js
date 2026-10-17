export const CATEGORIES = {
  INCOME: [
    { id: 'salary', label: 'Salary', icon: 'Briefcase', color: 'emerald', bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' },
    { id: 'freelance', label: 'Freelance', icon: 'Laptop', color: 'teal', bg: 'bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300' },
    { id: 'investment', label: 'Investments', icon: 'TrendingUp', color: 'cyan', bg: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300' },
    { id: 'gift', label: 'Gifts & Bonus', icon: 'Gift', color: 'violet', bg: 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300' },
    { id: 'other_income', label: 'Other Income', icon: 'PlusCircle', color: 'blue', bg: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300' },
  ],
  EXPENSE: [
    { id: 'food', label: 'Food & Dining', icon: 'Utensils', color: 'amber', bg: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300' },
    { id: 'housing', label: 'Rent & Housing', icon: 'Home', color: 'indigo', bg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300' },
    { id: 'transport', label: 'Transportation', icon: 'Car', color: 'blue', bg: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300' },
    { id: 'bills', label: 'Utilities & Bills', icon: 'Zap', color: 'yellow', bg: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-300' },
    { id: 'shopping', label: 'Shopping', icon: 'ShoppingBag', color: 'pink', bg: 'bg-pink-100 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300' },
    { id: 'entertainment', label: 'Entertainment', icon: 'Film', color: 'purple', bg: 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300' },
    { id: 'health', label: 'Health & Medical', icon: 'HeartPulse', color: 'rose', bg: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300' },
    { id: 'education', label: 'Education', icon: 'GraduationCap', color: 'emerald', bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' },
    { id: 'travel', label: 'Travel', icon: 'Plane', color: 'sky', bg: 'bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300' },
    { id: 'other_expense', label: 'Other Expense', icon: 'Receipt', color: 'slate', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  ],
};

export const ALL_CATEGORIES = [...CATEGORIES.INCOME, ...CATEGORIES.EXPENSE];

export const getCategoryById = (id, type) => {
  const pool = type ? CATEGORIES[type.toUpperCase()] || ALL_CATEGORIES : ALL_CATEGORIES;
  const match = pool.find((cat) => cat.id === id);
  if (match) return match;
  return {
    id: id || 'unknown',
    label: id || 'General',
    icon: 'Receipt',
    color: 'slate',
    bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  };
};

export const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD ($)', locale: 'en-US' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)', locale: 'de-DE' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)', locale: 'en-GB' },
  { code: 'INR', symbol: '₹', label: 'INR (₹)', locale: 'en-IN' },
  { code: 'JPY', symbol: '¥', label: 'JPY (¥)', locale: 'ja-JP' },
  { code: 'CAD', symbol: 'CA$', label: 'CAD ($)', locale: 'en-CA' },
  { code: 'AUD', symbol: 'AU$', label: 'AUD ($)', locale: 'en-AU' },
];
