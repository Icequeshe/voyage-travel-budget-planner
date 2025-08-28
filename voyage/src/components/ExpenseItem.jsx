import useBudgetStore from "../store/useBudgetStore";

export default function ExpenseItem({ expense, onEdit, onDelete }) {
  const currency = useBudgetStore(state => state.currency);
  const exchangeRate = useBudgetStore(state => state.exchangeRate);

  return (
    <div className={`p-4 rounded-lg shadow-sm border flex items-center justify-between ${expense.type === "actual" ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"}`}>
      <div>
        <p className="text-lg font-semibold text-gray-800">{expense.description}</p>
        <p className="text-sm text-gray-600">{expense.category} | {expense.date} | <span className={expense.type === "actual" ? "text-green-600 font-medium" : "text-yellow-600 font-medium"}>{expense.type === "actual" ? "Actual" : "Planned"}</span></p>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-xl font-bold text-gray-900">{currency}{(expense.amount * exchangeRate).toFixed(2)}</span>
        <button onClick={() => onEdit(expense)} className="text-blue-500 hover:text-blue-700">Edit</button>
        <button onClick={() => onDelete(expense.id)} className="text-red-500 hover:text-red-700">Delete</button>
      </div>
    </div>
  );
}
