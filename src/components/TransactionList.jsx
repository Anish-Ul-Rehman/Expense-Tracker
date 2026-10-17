import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Edit2,
  Trash2,
  Calendar,
  Tag,
  Inbox,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { ALL_CATEGORIES, getCategoryById } from '../utils/categories';
import CategoryIcon from './CategoryIcon';

export default function TransactionList({
  transactions,
  currency,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all'); // all | expense | income
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc'); // date-desc | date-asc | amount-desc | amount-asc

  // Filtered and sorted transactions
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        // Type filter
        if (filterType !== 'all' && t.type !== filterType) return false;
        // Category filter
        if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
        // Search filter
        if (search.trim()) {
          const query = search.toLowerCase();
          const matchTitle = (t.title || '').toLowerCase().includes(query);
          const matchNotes = (t.notes || '').toLowerCase().includes(query);
          const meta = getCategoryById(t.category, t.type);
          const matchCategory = meta.label.toLowerCase().includes(query);
          if (!matchTitle && !matchNotes && !matchCategory) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') {
          return new Date(b.date) - new Date(a.date);
        }
        if (sortBy === 'date-asc') {
          return new Date(a.date) - new Date(b.date);
        }
        if (sortBy === 'amount-desc') {
          return b.amount - a.amount;
        }
        if (sortBy === 'amount-asc') {
          return a.amount - b.amount;
        }
        return 0;
      });
  }, [transactions, filterType, selectedCategory, search, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setFilterType('all');
    setSelectedCategory('all');
    setSortBy('date-desc');
  };

  const hasActiveFilters = search || filterType !== 'all' || selectedCategory !== 'all' || sortBy !== 'date-desc';

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">Transaction History</h2>
          <p className="text-xs text-slate-500">
            Showing {filteredTransactions.length} of {transactions.length} total records
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterType === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('expense')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
              filterType === 'expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" /> Expenses
          </button>
          <button
            onClick={() => setFilterType('income')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
              filterType === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowDownLeft className="w-3.5 h-3.5" /> Income
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 mb-5">
        {/* Search Input */}
        <div className="sm:col-span-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, note, or tag..."
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Category Dropdown */}
        <div className="sm:col-span-4 relative">
          <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition"
          >
            <option value="all">All Categories</option>
            {ALL_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="sm:col-span-3 relative">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Active filters badge reset */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <span>Filters applied</span>
          <button
            onClick={clearFilters}
            className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* List Items */}
      {filteredTransactions.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-xl border-2 border-dashed border-slate-100">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mb-1">No transactions found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            {hasActiveFilters
              ? 'Try adjusting your search or filters to see matching transactions.'
              : 'Add your first transaction above to get started with tracking.'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-xs font-semibold transition"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {filteredTransactions.map((tx) => {
            const meta = getCategoryById(tx.category, tx.type);
            const isIncome = tx.type === 'income';

            return (
              <div
                key={tx.id}
                className="py-3 sm:py-3.5 flex items-center justify-between gap-3 group hover:bg-slate-50/70 -mx-2 px-2 rounded-xl transition"
              >
                {/* Left: Category Icon & Details */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2.5 rounded-xl shrink-0 ${meta.bg}`}>
                    <CategoryIcon name={meta.icon} className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {tx.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 mt-0.5">
                      <span className="inline-flex items-center gap-1 font-medium text-slate-600">
                        <Tag className="w-3 h-3 text-slate-400" />
                        {meta.label}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {formatDate(tx.date)}
                      </span>
                      {tx.notes && (
                        <>
                          <span className="hidden sm:inline">•</span>
                          <span className="hidden sm:inline italic text-slate-400 truncate max-w-xs">
                            "{tx.notes}"
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Actions */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <div className="text-right">
                    <span
                      className={`text-sm sm:text-base font-bold tabular-nums ${
                        isIncome ? 'text-emerald-600' : 'text-slate-900'
                      }`}
                    >
                      {isIncome ? '+' : '-'}
                      {formatCurrency(tx.amount, currency)}
                    </span>
                    <p className="text-[10px] text-slate-400 capitalize hidden sm:block">
                      {tx.type}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(tx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
                      title="Edit transaction"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(tx.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      title="Delete transaction"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
