import { useState } from "react";
import useBudgetStore from "../hooks/useBudgetStore";

export default function ExpenseForm() {
  const addExpense = useBudgetStore((state) => state.addExpense);

  const [form, setForm] = useState({
    name: "",
    category: "Flights",
    amount: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ ...form, amount: parseFloat(form.amount) });
    setForm({ name: "", category: "Flights", amount: "", date: "", notes: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold">Add Expense</h2>
      <input
        type="text"
        name="name"
        placeholder="Expense name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      >
        <option>Flights</option>
        <option>Accommodation</option>
        <option>Food</option>
        <option>Entertainment</option>
        <option>Miscellaneous</option>
      </select>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />
      <textarea
        name="notes"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Expense
      </button>
    </form>
  );
}
