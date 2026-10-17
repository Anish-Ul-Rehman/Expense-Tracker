const today = new Date();
const formatDateOffset = (daysAgo) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
};

export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-1',
    title: 'Monthly Salary',
    amount: 3800,
    type: 'income',
    category: 'salary',
    date: formatDateOffset(1),
    notes: 'Direct deposit payroll',
  },
  {
    id: 'tx-2',
    title: 'Apartment Rent',
    amount: 1200,
    type: 'expense',
    category: 'housing',
    date: formatDateOffset(2),
    notes: 'Monthly apartment lease',
  },
  {
    id: 'tx-3',
    title: 'Freelance UI/UX Client',
    amount: 750,
    type: 'income',
    category: 'freelance',
    date: formatDateOffset(3),
    notes: 'Mobile app redesign milestone',
  },
  {
    id: 'tx-4',
    title: 'Whole Foods Groceries',
    amount: 142.5,
    type: 'expense',
    category: 'food',
    date: formatDateOffset(4),
    notes: 'Weekly groceries & fresh produce',
  },
  {
    id: 'tx-5',
    title: 'Internet & Power Bill',
    amount: 94.2,
    type: 'expense',
    category: 'bills',
    date: formatDateOffset(5),
    notes: 'Fiber broadband & electric',
  },
  {
    id: 'tx-6',
    title: 'Weekend Dining & Coffee',
    amount: 58.75,
    type: 'expense',
    category: 'food',
    date: formatDateOffset(6),
    notes: 'Brunch with friends',
  },
  {
    id: 'tx-7',
    title: 'Metro Pass & Fuel',
    amount: 65.0,
    type: 'expense',
    category: 'transport',
    date: formatDateOffset(7),
    notes: 'Commute refill',
  },
  {
    id: 'tx-8',
    title: 'Tech Gadget & Book',
    amount: 89.99,
    type: 'expense',
    category: 'shopping',
    date: formatDateOffset(9),
    notes: 'Ergonomic mouse pad and programming book',
  },
];
