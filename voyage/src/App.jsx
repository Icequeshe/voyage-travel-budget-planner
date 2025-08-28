import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Components
import BudgetOverview from "./components/BudgetOverview";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import CurrencyConverter from "./components/CurrencyConverter";

// Pages
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans antialiased">

        {/* Header / Navigation */}
        <header className="bg-indigo-600 text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold text-center">
            Voyage Travel Budget Planner
          </h1>
          <nav className="mt-2 flex justify-center space-x-6">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/reports" className="hover:underline">Reports</Link>
            <Link to="/settings" className="hover:underline">Settings</Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto p-4 max-w-3xl">
          <Routes>
            {/* Home Page: Budget + Currency + Expenses */}
            <Route
              path="/"
              element={
                <>
                  <BudgetOverview />
                  <CurrencyConverter />
                  <ExpenseForm />
                  <ExpenseList />
                </>
              }
            />

            {/* Reports Page */}
            <Route path="/reports" element={<Reports />} />

            {/* Settings Page */}
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center text-sm mt-8">
          © {new Date().getFullYear()} Voyage Travel Budget Planner
        </footer>
      </div>
    </Router>
  );
}

export default App;
