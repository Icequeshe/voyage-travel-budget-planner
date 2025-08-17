import useBudgetStore from "../hooks/useBudgetStore";

export default function BudgetOverview() {
  const { totalBudget, expenses } = useBudgetStore();

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = totalBudget - totalSpent;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Budget Overview</h2>
      <div className="space-y-2">
        <p><strong>Total Budget:</strong> ${totalBudget}</p>
        <p><strong>Total Spent:</strong> ${totalSpent}</p>
        <p><strong>Remaining:</strong> ${remaining}</p>
      </div>
      <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 rounded-full ${remaining >= 0 ? "bg-blue-500" : "bg-red-500"}`}
          style={{ width: `${(totalSpent / totalBudget) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
