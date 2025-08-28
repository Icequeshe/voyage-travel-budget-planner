import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBudgetStore = create(
  persist(
    (set, get) => ({
      budget: 2000,
      expenses: [
        {
          id: crypto.randomUUID(),
          description: "Flight to Paris",
          category: "Flights",
          amount: 500,
          date: "2025-08-15",
          notes: "Round trip",
          type: "actual",
        },
        {
          id: crypto.randomUUID(),
          description: "Hotel",
          category: "Accommodation",
          amount: 300,
          date: "2025-08-16",
          notes: "3 nights",
          type: "planned",
        },
      ],
      categories: [
        "Flights",
        "Accommodation",
        "Food",
        "Transportation",
        "Activities",
        "Shopping",
        "Miscellaneous",
      ],

      addExpense: (expense) =>
        set((state) => ({
          expenses: [
            ...state.expenses,
            {
              id: crypto.randomUUID(),
              date: new Date().toISOString().split("T")[0],
              type: expense.type || "actual",
              ...expense,
            },
          ],
        })),

      updateExpense: (updatedExpense) =>
        set((state) => ({
          expenses: state.expenses.map((exp) =>
            exp.id === updatedExpense.id ? { ...exp, ...updatedExpense } : exp
          ),
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((exp) => exp.id !== id),
        })),

      getTotalSpent: () =>
        get().expenses
          .filter((exp) => exp.type === "actual")
          .reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0),

      getTotalPlanned: () =>
        get().expenses
          .filter((exp) => exp.type === "planned")
          .reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0),
    }),
    { name: "voyage-budget-storage" }
  )
);

export default useBudgetStore;
