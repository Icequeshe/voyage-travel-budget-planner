import React from "react";
import BudgetOverview from "./components/BudgetOverview";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import useBudgetStore from "./store/useBudgetStore";

function App() {
  const addExpense = useBudgetStore((state) => state.addExpense);

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">
          Voyage Travel Budget Planner
        </h1>
      </header>

      <main className="container mx-auto p-4 max-w-3xl">
        {/* Budget Overview Section */}
        <BudgetOverview />

        {/* Add Expense Form */}
        <ExpenseForm onSave={addExpense} />

        {/* Expense List */}
        <ExpenseList />
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center text-sm mt-8">
        © {new Date().getFullYear()} Voyage Travel Budget Planner
      </footer>
    </div>
  );
}

export default App;
