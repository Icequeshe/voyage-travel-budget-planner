import React, { useState } from "react";
import useBudgetStore from "../store/useBudgetStore";

export default function ExpenseForm({ currentExpense, onSave, onCancel }) {
  const addExpense = useBudgetStore((state) => state.addExpense);
  const updateExpense = useBudgetStore((state) => state.updateExpense);
  const categories = useBudgetStore((state) => state.categories);

  const [expense, setExpense] = useState(
    currentExpense || {
      description: "",
      category: categories[0],
      amount: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
      type: "actual",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentExpense) {
      updateExpense(expense);
      if (onSave) onSave(expense);
    } else {
      addExpense(expense);
    }
    setExpense({
      description: "",
      category: categories[0],
      amount: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
      type: "actual",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6"
    >
      <h3 className="text-xl font-semibold mb-4">
        {currentExpense ? "Edit Expense" : "Add Expense"}
      </h3>

      {/* Description */}
      <input
        type="text"
        name="description"
        value={expense.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-3 p-2 border rounded"
        required
      />

      {/* Category */}
      <select
        name="category"
        value={expense.category}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      >
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      {/* Amount */}
      <input
        type="number"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full mb-3 p-2 border rounded"
        required
      />

      {/* Date */}
      <input
        type="date"
        name="date"
        value={expense.date}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />

      {/* Notes */}
      <textarea
        name="notes"
        value={expense.notes}
        onChange={handleChange}
        placeholder="Notes"
        className="w-full mb-3 p-2 border rounded"
      />

      {/* Type */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Type:</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="type"
              value="actual"
              checked={expense.type === "actual"}
              onChange={handleChange}
            />
            <span className="ml-2">Actual</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="type"
              value="planned"
              checked={expense.type === "planned"}
              onChange={handleChange}
            />
            <span className="ml-2">Planned</span>
          </label>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {currentExpense ? "Save Changes" : "Add Expense"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
