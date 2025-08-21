import BudgetOverview from "../components/BudgetOverview";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import CurrencyConverter from "../components/CurrencyConverter";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Voyage Travel Budget Planner</h1>
        <p className="text-gray-600 mt-2">
          Plan, track, and manage your travel expenses with ease.
        </p>
      </div>
      <BudgetOverview />
      <ExpenseForm />
      <ExpenseList />
      <CurrencyConverter />
    </div>
  );
}
