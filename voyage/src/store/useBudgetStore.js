import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBudgetStore = create(persist(
  (set, get) => ({
    budget: null,
    currency: "USD",
    exchangeRate: 1,
    categories: ["Flights", "Accommodation", "Food", "Entertainment", "Transport", "Other"],
    expenses: [],
    
    setBudget: (amount) => set({ budget: amount }),
    setCurrency: (currency, rate = 1) => set({ currency, exchangeRate: rate }),

    addExpense: (expense) => set(state => ({
      expenses: [...state.expenses, { ...expense, id: Date.now() }]
    })),

    updateExpense: (updatedExpense) =>
      set(state => ({
        expenses: state.expenses.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp)
      })),

    deleteExpense: (id) => set(state => ({
      expenses: state.expenses.filter(exp => exp.id !== id)
    })),

    getTotalSpent: () =>
      get().expenses
        .filter(exp => exp.type === "actual")
        .reduce((sum, e) => sum + e.amount * get().exchangeRate, 0),
  }),
  { name: "budget-storage" }
));

export default useBudgetStore;
