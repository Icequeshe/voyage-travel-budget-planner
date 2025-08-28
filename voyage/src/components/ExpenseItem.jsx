import React from "react";

export default function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
      <div>
        <p className="text-lg font-semibold text-gray-800">{expense.description}</p>
        <p className="text-sm text-gray-600">
          {expense.category} | {expense.date} |{" "}
          <span
            className={
              expense.type === "actual" ? "text-green-600 font-medium" : "text-yellow-600 font-medium"
            }
          >
            {expense.type === "actual" ? "Actual" : "Planned"}
          </span>
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-xl font-bold text-gray-900">${expense.amount}</span>
        <button
          onClick={() => onEdit(expense)}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
