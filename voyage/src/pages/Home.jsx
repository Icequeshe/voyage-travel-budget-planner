import React from "react";
import BudgetOverview from "../components/BudgetOverview";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import useBudgetStore from "../store/useBudgetStore";

export default function Home() {
  const addExpense = useBudgetStore((state) => state.addExpense);

  return (
    <>
      <BudgetOverview />
      <ExpenseForm onSave={addExpense} />
      <ExpenseList />
      <ExpenseChart />
    </>
  );
}
