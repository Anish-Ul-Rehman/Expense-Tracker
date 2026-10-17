import React, { useState } from 'react';
import { PieChart, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { CATEGORIES, getCategoryById } from '../utils/categories';
import { formatCurrency } from '../utils/formatters';
import CategoryIcon from './CategoryIcon';

export default function CategoryBreakdown({ transactions, currency }) {
  const [viewType, setViewType] = useState('expense');

  // Filter by selected view type
  const filtered = transactions.filter((t) => t.type === viewType);
  const totalAmount = filtered.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  // Group by category
  const categoryMap = {};
  filtered.forEach((t) => {
    const catId = t.category;
    if (!categoryMap[catId]) {
      categoryMap[catId] = {
        id: catId,
        amount: 0,
        count: 0,
      };
    }
    categoryMap[catId].amount += Number(t.amount) || 0;
    categoryMap[catId].count += 1;
  });

  const categoryList = Object.values(categoryMap).sort((a, b) => b.amount - a.amount);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Breakdown</h2>
            <p className="text-xs text-slate-500">Distribution by category</p>
          </div>
        </div>

        {/* Toggle between Expense and Income */}
        <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setViewType('expense')}
            className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 ${
              viewType === 'expense'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-rose-500" /> Expense
          </button>
          <button
            onClick={() => setViewType('income')}
            className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 ${
              viewType === 'income'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-500" /> Income
          </button>
        </div>
      </div>

      {categoryList.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-xs">
          No {viewType} records found.
        </div>
      ) : (
        <div className="space-y-3.5">
          {categoryList.map((item) => {
            const meta = getCategoryById(item.id, viewType);
            const percentage = totalAmount > 0 ? Math.round((item.amount / totalAmount) * 100) : 0;

            return (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${meta.bg}`}>
                      <CategoryIcon name={meta.icon} className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-slate-700">{meta.label}</span>
                    <span className="text-[11px] text-slate-400">
                      ({item.count} {item.count === 1 ? 'tx' : 'txs'})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <span className="text-slate-900 font-semibold">
                      {formatCurrency(item.amount, currency)}
                    </span>
                    <span className="text-slate-400 w-8 text-right font-normal">
                      {percentage}%
                    </span>
                  </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      viewType === 'income' ? 'bg-emerald-500' : 'bg-indigo-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
