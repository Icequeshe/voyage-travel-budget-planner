import React, { useState } from "react";
import useBudgetStore from "../store/useBudgetStore";
import ExpenseItem from "./ExpenseItem";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseList() {
  const expenses = useBudgetStore((state) => state.expenses);
  const deleteExpense = useBudgetStore((state) => state.deleteExpense);

  const [editingExpense, setEditingExpense] = useState(null);

  const handleEdit = (expense) => setEditingExpense(expense);

  const handleSave = (updatedExpense) => {
    setEditingExpense(null);
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 m-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Expenses</h2>

      {/* Edit Form */}
      {editingExpense && (
        <ExpenseForm
          currentExpense={editingExpense}
          onSave={handleSave}
          onCancel={() => setEditingExpense(null)}
        />
      )}

      {/* Expense List */}
      <div className="space-y-4">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onEdit={handleEdit}
              onDelete={deleteExpense}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No expenses recorded yet.</p>
        )}
      </div>
    </section>
  );
}
