export default function ExpenseItem({ expense, onDelete }) {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded">
      <div>
        <h4 className="font-semibold">{expense.name}</h4>
        <p className="text-sm text-gray-600">{expense.category} - ${expense.amount}</p>
        <p className="text-xs text-gray-500">{expense.date}</p>
      </div>
      <button
        onClick={() => onDelete(expense.id)}
        className="text-red-500 hover:underline"
      >
        Delete
      </button>
    </div>
  );
}
