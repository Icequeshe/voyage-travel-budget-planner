import React from "react";
import useBudgetStore from "../store/useBudgetStore";

export default function BudgetOverview() {
  const budget = useBudgetStore((state) => state.budget);
  const currency = useBudgetStore((state) => state.currency);
  const setBudget = useBudgetStore((state) => state.setBudget);
  const expenses = useBudgetStore((state) => state.expenses);
  const exchangeRate = useBudgetStore((state) => state.exchangeRate);

  const plannedTotal = expenses
    .filter(e => e.type === "planned")
    .reduce((sum, e) => sum + e.amount * exchangeRate, 0);

  const actualTotal = expenses
    .filter(e => e.type === "actual")
    .reduce((sum, e) => sum + e.amount * exchangeRate, 0);

  const remainingFunds = budget !== null ? budget * exchangeRate - actualTotal : null;
  const spentPercentage = budget ? (actualTotal / (budget * exchangeRate)) * 100 : 0;
  const progressBarWidth = Math.min(spentPercentage, 100);

  let progressBarColor = "bg-green-500";
  if (remainingFunds < budget * 0.25 && remainingFunds > 0) progressBarColor = "bg-orange-500";
  if (remainingFunds <= 0) progressBarColor = "bg-red-500";

  return (
    <section className="bg-white p-6 rounded-xl shadow-xl m-4 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Budget At a Glance</h2>

      {budget === null ? (
        <div className="text-center text-red-500 font-semibold">Please set your budget first.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-emerald-50 p-4 rounded-lg shadow-sm border border-emerald-200">
              <p className="text-sm text-emerald-700 font-medium">Total Budget</p>
              <p className="text-3xl font-bold text-emerald-800 mt-1">{currency}{(budget * exchangeRate).toFixed(2)}</p>
            </div>
            <div className="bg-rose-50 p-4 rounded-lg shadow-sm border border-rose-200">
              <p className="text-sm text-rose-700 font-medium">Planned Expenses</p>
              <p className="text-3xl font-bold text-rose-800 mt-1">{currency}{plannedTotal.toFixed(2)}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
              <p className="text-sm text-blue-700 font-medium">Actual Expenses</p>
              <p className="text-3xl font-bold text-blue-800 mt-1">{currency}{actualTotal.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-4 text-center text-violet-700 font-medium">
            Remaining Funds: {currency}{remainingFunds.toFixed(2)}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Spending Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden shadow-inner">
              <div className={`${progressBarColor} h-4 rounded-full transition-all duration-500 ease-in-out`} style={{ width: `${progressBarWidth}%` }}></div>
            </div>
            <p className="text-right text-gray-600 text-sm">{spentPercentage.toFixed(1)}% of budget spent {remainingFunds < 0 && <span className="text-red-500 ml-2 font-bold">(Over Budget!)</span>}</p>
          </div>
        </>
      )}

      <div className="mt-8 text-center">
        <label htmlFor="budget-input" className="block text-gray-700 text-lg font-semibold mb-2">Set Your Budget:</label>
        <input
          id="budget-input"
          type="number"
          value={budget ?? ""}
          onChange={(e) => setBudget(parseFloat(e.target.value) || null)}
          className="p-3 border border-gray-300 rounded-lg w-full max-w-xs text-center text-xl font-medium focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          placeholder="Enter your budget"
        />
      </div>
    </section>
  );
}
