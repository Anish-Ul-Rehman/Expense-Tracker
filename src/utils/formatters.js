import { CURRENCIES } from './categories';

export const formatCurrency = (amount, currencyCode = 'USD') => {
  const currency = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];
  const num = Number(amount) || 0;
  
  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const exportToCSV = (transactions, currencyCode = 'USD') => {
  if (!transactions || transactions.length === 0) {
    alert('No transactions to export.');
    return;
  }

  const headers = ['ID', 'Date', 'Type', 'Category', 'Description', 'Amount', 'Currency'];
  const rows = transactions.map((t) => [
    `"${t.id}"`,
    `"${t.date}"`,
    `"${t.type}"`,
    `"${t.category}"`,
    `"${(t.title || '').replace(/"/g, '""')}"`,
    Number(t.amount).toFixed(2),
    `"${currencyCode}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `expense_tracker_export_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
