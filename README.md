# Expense Tracker

A simple and responsive expense tracker web application built with **React**, **Vite**, and **Tailwind CSS**. It helps you manage your daily finances by tracking income, expenses, and current balance.

---

## 📌 Features

- **Add Transactions**: Easily record income and expense entries with title, category, amount, and date.
- **Balance Summary**: View real-time cards showing your current balance, total income, and total expenses.
- **Category Breakdown**: See spending distribution categorized by type.
- **Filter & Search**: Quickly find transactions using live search and category/type filters.
- **Local Storage**: Automatically saves all entries in the browser so your data stays saved after page reloads.
- **Responsive Design**: Clean layout that adapts well to mobile and desktop screens.

---

## 🛠️ Tech Stack

- **Frontend**: [React](https://react.dev/)
- **Bundler**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have **Node.js** (v18 or higher recommended) and **npm** installed.

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd "Expense Tracker"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Open your browser and navigate to the local URL (typically `http://localhost:5173`).

### 4. Build for production

```bash
npm run build
```

---

## 📂 Project Structure

```text
├── public/              # Static assets
├── src/
│   ├── assets/          # Icons and images
│   ├── components/      # UI components (Summary, Form, List, etc.)
│   ├── data/            # Default transaction data
│   ├── utils/           # Helper functions & category definitions
│   ├── App.jsx          # Root application component
│   ├── index.css        # Global CSS & Tailwind configuration
│   └── main.jsx         # App entry point
├── .gitignore           # Git ignore list
├── index.html           # HTML template
├── package.json         # Project dependencies & scripts
├── vite.config.js       # Vite configuration
└── README.md            # Documentation
```

---

## 📤 Pushing to GitHub

When you're ready to push this project to GitHub, follow these commands in your terminal:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Stage all project files
git add .

# 3. Create initial commit
git commit -m "Initial commit: Expense Tracker"

# 4. Set default branch to main
git branch -M main

# 5. Link your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 6. Push code to GitHub
git push -u origin main
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
