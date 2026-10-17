import React, { useState, useEffect } from 'react';
import { PlusCircle, CheckCircle2, X, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { CATEGORIES } from '../utils/categories';
import CategoryIcon from './CategoryIcon';

export default function TransactionForm({ onSave, editingTransaction, onCancelEdit, currencySymbol = '$' }) {
  const [type, setType] = useState('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES.EXPENSE[0].id);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  // Handle edit mode populated values
  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type || 'expense');
      setTitle(editingTransaction.title || '');
      setAmount(String(editingTransaction.amount) || '');
      setCategory(editingTransaction.category || (editingTransaction.type === 'income' ? CATEGORIES.INCOME[0].id : CATEGORIES.EXPENSE[0].id));
      setDate(editingTransaction.date || new Date().toISOString().slice(0, 10));
      setNotes(editingTransaction.notes || '');
      setError('');
    } else {
      // Default reset
      setTitle('');
      setAmount('');
      setNotes('');
      setError('');
    }
  }, [editingTransaction]);

  // When type changes and we're not in edit mode, default category to first of type
  const handleTypeChange = (newType) => {
    setType(newType);
    const available = newType === 'income' ? CATEGORIES.INCOME : CATEGORIES.EXPENSE;
    setCategory(available[0].id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a title or description.');
      return;
    }
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }
    if (!date) {
      setError('Please pick a valid date.');
      return;
    }

    onSave({
      id: editingTransaction ? editingTransaction.id : `tx-${Date.now()}`,
      title: title.trim(),
      amount: num,
      type,
      category,
      date,
      notes: notes.trim(),
    });

    // Reset form if not editing
    if (!editingTransaction) {
      setTitle('');
      setAmount('');
      setNotes('');
      setError('');
    }
  };

  const currentCategoryList = type === 'income' ? CATEGORIES.INCOME : CATEGORIES.EXPENSE;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {type === 'income' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
            </h2>
            <p className="text-xs text-slate-500">Record your income or expense</p>
          </div>
        </div>

        {editingTransaction && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-xs flex items-center gap-1 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition"
          >
            <X className="w-3.5 h-3.5" /> Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => handleTypeChange('expense')}
            className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-1.5 ${
              type === 'expense'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowUpRight className="w-4 h-4" /> Expense
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('income')}
            className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-1.5 ${
              type === 'income'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowDownLeft className="w-4 h-4" /> Income
          </button>
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {error}
          </div>
        )}

        {/* Title / Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Description / Payee
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder={type === 'income' ? 'e.g. Monthly Salary, Freelance project' : 'e.g. Grocery store, Electric bill'}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
            required
          />
        </div>

        {/* Amount & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Amount ({currencySymbol})
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-medium text-sm">
                {currencySymbol}
              </span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (error) setError('');
                }}
                placeholder="0.00"
                className="w-full pl-8 pr-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition bg-white"
            >
              {currentCategoryList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date & Note */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Note (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Shared with roommates"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-white shadow-md flex items-center justify-center gap-2 transition active:scale-[0.99] ${
            type === 'income'
              ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'
          }`}
        >
          {editingTransaction ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> Update Transaction
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4" /> Add {type === 'income' ? 'Income' : 'Expense'}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
