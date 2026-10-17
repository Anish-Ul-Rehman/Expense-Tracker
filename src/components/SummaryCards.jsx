import React from 'react';
import { TrendingUp, TrendingDown, PiggyBank, ArrowUpRight, ArrowDownLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function SummaryCards({ transactions, currency }) {
  const totals = transactions.reduce(
    (acc, t) => {
      const amount = Number(t.amount) || 0;
      if (t.type === 'income') {
        acc.income += amount;
        acc.incomeCount += 1;
      } else {
        acc.expense += amount;
        acc.expenseCount += 1;
      }
      return acc;
    },
    { income: 0, expense: 0, incomeCount: 0, expenseCount: 0 }
  );

  const balance = totals.income - totals.expense;
  const savingsRate = totals.income > 0 ? Math.max(0, Math.round((balance / totals.income) * 100)) : 0;
  const isPositive = balance >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Balance Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-lg shadow-indigo-950/10 border border-slate-800">
        <div className="flex items-center justify-between text-slate-300 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Net Balance</span>
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
            <PiggyBank className="w-4 h-4 text-indigo-300" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          {formatCurrency(balance, currency)}
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          {isPositive ? (
            <span className="inline-flex items-center text-emerald-400 font-medium bg-emerald-500/20 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Surplus
            </span>
          ) : (
            <span className="inline-flex items-center text-rose-400 font-medium bg-rose-500/20 px-2 py-0.5 rounded-full">
              <AlertCircle className="w-3.5 h-3.5 mr-1" />
              Deficit
            </span>
          )}
          <span className="text-slate-400">across {transactions.length} records</span>
        </div>
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Total Income Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Income</span>
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
            <ArrowDownLeft className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          {formatCurrency(totals.income, currency)}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="inline-flex items-center text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3 mr-1" />
            {totals.incomeCount} {totals.incomeCount === 1 ? 'source' : 'sources'}
          </span>
          <span>deposited</span>
        </div>
      </div>

      {/* Total Expense Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Expenses</span>
          <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          {formatCurrency(totals.expense, currency)}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="inline-flex items-center text-rose-700 font-medium bg-rose-50 px-2 py-0.5 rounded-full">
            <TrendingDown className="w-3 h-3 mr-1" />
            {totals.expenseCount} {totals.expenseCount === 1 ? 'expense' : 'expenses'}
          </span>
          <span>recorded</span>
        </div>
      </div>

      {/* Savings Rate Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Savings Rate</span>
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          {totals.income > 0 ? `${savingsRate}%` : 'N/A'}
        </div>
        <div className="space-y-1.5">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                savingsRate >= 30
                  ? 'bg-emerald-500'
                  : savingsRate >= 10
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, Math.max(0, savingsRate))}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            {savingsRate >= 30
              ? 'Great financial health! (>30%)'
              : savingsRate >= 10
              ? 'Healthy, room to optimize'
              : 'Caution: expenses near income'}
          </p>
        </div>
      </div>
    </div>
  );
}
