import useBudgetStore from "../hooks/useBudgetStore";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList() {
  const { expenses, deleteExpense } = useBudgetStore();

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-3">
      <h2 className="text-xl font-bold mb-4">Expenses</h2>
      {expenses.length > 0 ? (
        expenses.map((exp) => (
          <ExpenseItem key={exp.id} expense={exp} onDelete={deleteExpense} />
        ))
      ) : (
        <p className="text-gray-500">No expenses added yet.</p>
      )}
    </div>
  );
}
