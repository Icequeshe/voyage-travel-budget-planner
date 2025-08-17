import { create } from "zustand";

const useBudgetStore = create((set) => ({
  totalBudget: 2000,
  expenses: [
    { id: 1, name: "Flight to Paris", category: "Flights", amount: 500, date: "2025-08-15", notes: "Round trip" },
    { id: 2, name: "Hotel", category: "Accommodation", amount: 300, date: "2025-08-16", notes: "3 nights" }
  ],

  setTotalBudget: (amount) => set({ totalBudget: amount }),

  addExpense: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, { id: Date.now(), ...expense }]
    })),

  deleteExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((exp) => exp.id !== id)
    })),
}));

export default useBudgetStore;
