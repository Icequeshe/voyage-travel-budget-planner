import React from "react";
import useBudgetStore from "../store/useBudgetStore";

export default function BudgetOverview() {
  const budget = useBudgetStore((state) => state.budget);
  const currency = useBudgetStore((state) => state.currency);
  const setBudget = useBudgetStore((state) => state.setBudget);
  const getTotalSpent = useBudgetStore((state) => state.getTotalSpent);

  const totalSpent = getTotalSpent();
  const remainingFunds = budget !== null ? budget - totalSpent : null;
  const spentPercentage = budget ? (totalSpent / budget) * 100 : 0;
  const progressBarWidth = Math.min(spentPercentage, 100);

  let progressBarColor = "bg-green-500";
  if (remainingFunds < budget * 0.25 && remainingFunds > 0) {
    progressBarColor = "bg-orange-500";
  }
  if (remainingFunds <= 0) {
    progressBarColor = "bg-red-500";
  }

  return (
    <section className="bg-white p-6 rounded-xl shadow-xl m-4 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Your Budget At a Glance
      </h2>

      {/* If no budget is set yet */}
      {budget === null ? (
        <div className="text-center text-red-500 font-semibold">
          Please set your budget first.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-emerald-50 p-4 rounded-lg shadow-sm border border-emerald-200">
              <p className="text-sm text-emerald-700 font-medium">Total Budget</p>
              <p className="text-3xl font-bold text-emerald-800 mt-1">
                {currency}{budget.toFixed(2)}
              </p>
            </div>
            <div className="bg-rose-50 p-4 rounded-lg shadow-sm border border-rose-200">
              <p className="text-sm text-rose-700 font-medium">Total Spent</p>
              <p className="text-3xl font-bold text-rose-800 mt-1">
                {currency}{totalSpent.toFixed(2)}
              </p>
            </div>
            <div className="bg-violet-50 p-4 rounded-lg shadow-sm border border-violet-200">
              <p className="text-sm text-violet-700 font-medium">Remaining Funds</p>
              <p
                className={`text-3xl font-bold mt-1 ${
                  remainingFunds < 0 ? "text-red-600" : "text-violet-800"
                }`}
              >
                {currency}{remainingFunds.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Spending Progress
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden shadow-inner">
              <div
                className={`${progressBarColor} h-4 rounded-full transition-all duration-500 ease-in-out`}
                style={{ width: `${progressBarWidth}%` }}
              ></div>
            </div>
            <p className="text-right text-gray-600 text-sm">
              {spentPercentage.toFixed(1)}% of budget spent
              {remainingFunds < 0 && (
                <span className="text-red-500 ml-2 font-bold">(Over Budget!)</span>
              )}
            </p>
          </div>
        </>
      )}

      {/* Input to set budget */}
      <div className="mt-8 text-center">
        <label
          htmlFor="budget-input"
          className="block text-gray-700 text-lg font-semibold mb-2"
        >
          Set Your Budget:
        </label>
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
