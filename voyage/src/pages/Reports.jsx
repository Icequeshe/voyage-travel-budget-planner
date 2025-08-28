import ExpenseChart from "../components/ExpenseChart";

export default function Reports() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <p className="text-gray-600">Visual breakdown of your expenses</p>
      <ExpenseChart />
    </div>
  );
}
