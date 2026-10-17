import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import CategoryBreakdown from './components/CategoryBreakdown';
import TransactionList from './components/TransactionList';
import { INITIAL_TRANSACTIONS } from './data/initialData';
import { CURRENCIES } from './utils/categories';
import { exportToCSV } from './utils/formatters';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const STORAGE_KEY_TRANSACTIONS = 'expense_tracker_v1_transactions';
const STORAGE_KEY_CURRENCY = 'expense_tracker_v1_currency';

export default function App() {
  // Load transactions from localStorage or fallback to INITIAL_TRANSACTIONS
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved transactions:', e);
    }
    return INITIAL_TRANSACTIONS;
  });

  // Load currency from localStorage or default to USD
  const [currency, setCurrency] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENCY);
      if (saved) return saved;
    } catch (e) {
      console.error('Failed to read currency:', e);
    }
    return 'USD';
  });

  const [editingTransaction, setEditingTransaction] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync transactions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions));
    } catch (e) {
      console.error('Failed to save transactions to localStorage:', e);
    }
  }, [transactions]);

  // Sync currency to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENCY, currency);
    } catch (e) {
      console.error('Failed to save currency to localStorage:', e);
    }
  }, [currency]);

  // Toast trigger helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev && prev.message === message ? null : prev));
    }, 3500);
  };

  // Add or update transaction
  const handleSaveTransaction = (tx) => {
    if (editingTransaction) {
      setTransactions((prev) => prev.map((item) => (item.id === tx.id ? tx : item)));
      setEditingTransaction(null);
      showToast('Transaction updated successfully!');
    } else {
      setTransactions((prev) => [tx, ...prev]);
      showToast('New transaction added!');
    }
  };

  // Delete transaction
  const handleDeleteTransaction = (id) => {
    const itemToDelete = transactions.find((t) => t.id === id);
    if (!itemToDelete) return;
    
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    if (editingTransaction && editingTransaction.id === id) {
      setEditingTransaction(null);
    }
    showToast(`Removed "${itemToDelete.title}"`, 'info');
  };

  // Reset to default sample transactions
  const handleResetData = () => {
    if (window.confirm('Reset all transactions to the sample demo data? Your current items will be overwritten.')) {
      setTransactions(INITIAL_TRANSACTIONS);
      setEditingTransaction(null);
      showToast('Demo data restored!');
    }
  };

  // Clear all transactions
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete ALL transactions? This cannot be undone.')) {
      setTransactions([]);
      setEditingTransaction(null);
      showToast('All transactions cleared.', 'info');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    exportToCSV(transactions, currency);
    showToast('Exported CSV file successfully!');
  };

  const currentCurrencySymbol = (CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0]).symbol;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar */}
      <Navbar
        currency={currency}
        onCurrencyChange={(curr) => {
          setCurrency(curr);
          showToast(`Currency changed to ${curr}`);
        }}
        onExportCSV={handleExportCSV}
        onResetData={handleResetData}
        onClearAll={handleClearAll}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Metric Summary Cards */}
        <section aria-label="Financial Summary">
          <SummaryCards transactions={transactions} currency={currency} />
        </section>

        {/* Two Column Layout: Form & Analytics on Left, History on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Input Form + Spending Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <TransactionForm
              onSave={handleSaveTransaction}
              editingTransaction={editingTransaction}
              onCancelEdit={() => setEditingTransaction(null)}
              currencySymbol={currentCurrencySymbol}
            />

            <CategoryBreakdown
              transactions={transactions}
              currency={currency}
            />
          </div>

          {/* Right Column: Searchable, Filterable Transaction History */}
          <div className="lg:col-span-7">
            <TransactionList
              transactions={transactions}
              currency={currency}
              onEdit={(tx) => {
                setEditingTransaction(tx);
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              onDelete={handleDeleteTransaction}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} ExpenseFlow. Built with React.js & Tailwind CSS.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Local Storage Powered</span>
            <span>•</span>
            <span>GitHub Ready Structure</span>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-bottom-5 duration-200 text-sm">
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400" />}
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-slate-400 hover:text-white transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
