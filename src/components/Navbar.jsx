import React, { useState } from 'react';
import { Wallet, Download, RotateCcw, Trash2, Coins, ChevronDown, Check } from 'lucide-react';
import { CURRENCIES } from '../utils/categories';

export default function Navbar({
  currency,
  onCurrencyChange,
  onExportCSV,
  onResetData,
  onClearAll,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight">ExpenseFlow</span>
              <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                React + Tailwind
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Personal Finance & Budget Tracker</p>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm font-medium text-slate-700 transition"
              title="Change Currency"
            >
              <Coins className="w-4 h-4 text-indigo-600" />
              <span>{currentCurrency.code}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white shadow-xl border border-slate-200 py-1.5 z-20 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Currency
                  </div>
                  {CURRENCIES.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        onCurrencyChange(curr.code);
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 text-left transition"
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 w-5">{curr.symbol}</span>
                        <span>{curr.label}</span>
                      </span>
                      {currency === curr.code && <Check className="w-4 h-4 text-indigo-600" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Export CSV */}
          <button
            onClick={onExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-medium text-slate-700 transition shadow-sm"
            title="Download transactions as CSV file"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">Export CSV</span>
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={onResetData}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-medium text-slate-700 transition shadow-sm"
            title="Reset to starter sample transactions"
          >
            <RotateCcw className="w-4 h-4 text-amber-600" />
            <span className="hidden lg:inline">Reset Demo</span>
          </button>

          {/* Clear All Data */}
          <button
            onClick={onClearAll}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 text-xs sm:text-sm font-medium transition"
            title="Clear all transactions"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
