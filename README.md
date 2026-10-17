# 💰 ExpenseFlow — Modern Personal Expense Tracker

A clean, responsive, and intuitive personal finance and expense tracking web application built with **React.js**, **Tailwind CSS**, and **Vite**.

Designed with standard GitHub project conventions, ready to be cloned, run locally, or pushed directly to your GitHub repository.

---

## ✨ Features

- 📊 **Real-time Financial Summary**:
  - **Net Balance** (Total Surplus vs. Deficit indicator)
  - **Total Income** & **Total Expenses** cards with transaction counter
  - **Savings Rate Percentage Bar** with financial health badges
- ➕ **Add & Edit Transactions**:
  - Income and Expense switcher
  - Dynamic category selector based on transaction type
  - Amount, custom title/payee, date picker, and optional notes
  - Instant edit mode to modify any existing entry
- 🏷️ **Categorized Spending Breakdown**:
  - Visual distribution progress bars showing percentage of total spending
  - Toggle between Expense categories and Income streams
  - Dynamic category icons & color codes
- 🔍 **Search, Filter & Sort**:
  - Live real-time search across titles, notes, and category labels
  - Filter pills: **All**, **Expenses**, and **Income**
  - Dropdown filter by specific category
  - Sort by Date (Newest/Oldest) or Amount (Highest/Lowest)
- 💾 **Persistent Local Storage**:
  - Automatically preserves all your financial data in the browser's `localStorage`
  - Preloaded with realistic sample data on first visit
  - One-click **Reset Demo Data** or **Clear All Data**
- 🌍 **Multi-Currency Support**:
  - Switch between **USD ($)**, **EUR (€)**, **GBP (£)**, **INR (₹)**, **JPY (¥)**, **CAD ($)**, and **AUD ($)** with real-time formatting
- 📥 **Export to CSV**:
  - Download all transactions as an Excel/Google Sheets-compatible `.csv` file with a single click
- 📱 **Fully Responsive Design**:
  - Tailored for desktops, tablets, and smartphones using modern Tailwind CSS flex/grid layouts

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Storage**: Browser `localStorage` API

---

## 📂 Project Structure

```text
expense-tracker/
├── public/                 # Static assets (favicons, icons)
├── src/
│   ├── assets/             # Brand logos & icons
│   ├── components/
│   │   ├── CategoryBreakdown.jsx  # Spending distribution by category
│   │   ├── CategoryIcon.jsx       # Dynamic icon mapping component
│   │   ├── Navbar.jsx             # Top bar with currency switcher & export
│   │   ├── SummaryCards.jsx       # Net balance, income, expense, savings rate
│   │   ├── TransactionForm.jsx    # Add / edit transaction card
│   │   └── TransactionList.jsx    # Searchable, filterable history list
│   ├── data/
│   │   └── initialData.js         # Realistic starter demo transactions
│   ├── utils/
│   │   ├── categories.js          # Categories & currency definitions
│   │   └── formatters.js          # Currency, date & CSV exporter utilities
│   ├── App.jsx             # Main application state & layout
│   ├── index.css           # Tailwind CSS imports & global styles
│   └── main.jsx            # React root DOM entry
├── .gitignore              # Standard git ignore rules (node_modules, dist)
├── index.html              # HTML entry template
├── package.json            # Project dependencies & scripts
├── vite.config.js          # Vite build & Tailwind plugin config
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or higher recommended).

### 1. Installation

Clone or open the project folder, then install dependencies:

```bash
npm install
```

### 2. Run the Development Server

Start the local Vite development server:

```bash
npm run dev
```

Open your browser at the displayed URL (usually `http://localhost:5173`).

### 3. Build for Production

Generate optimized static production assets:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🐙 How to Push to GitHub

To publish this project to your GitHub account:

1. Create a new repository on [GitHub](https://github.com/new) (e.g. named `expense-tracker`). Leave it empty (without README or .gitignore).
2. Open your terminal in this `expense-tracker` folder.
3. Run the following commands:

```bash
# Initialize git (if not already initialized)
git init

# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: Expense tracker web app with React and Tailwind CSS"

# Set branch name to main
git branch -M main

# Link your GitHub repository (replace with your GitHub URL)
git remote add origin https://github.com/<YOUR_USERNAME>/expense-tracker.git

# Push to GitHub
git push -u origin main
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
