import { useState, useEffect } from "react";
import useBudgetStore from "../store/useBudgetStore";

export default function Settings() {
  const setBudget = useBudgetStore((state) => state.setBudget);
  const budget = useBudgetStore((state) => state.budget);

  const [newBudget, setNewBudget] = useState(budget);
  const [currency, setCurrency] = useState("USD");
  const [converted, setConverted] = useState(null);

  // Currency conversion using free ExchangeRate API
  const convertCurrency = async () => {
    try {
      const res = await fetch(
        `https://api.exchangerate-api.com/v4/latest/USD`
      );
      const data = await res.json();
      const rate = data.rates[currency];
      setConverted((newBudget * rate).toFixed(2));
    } catch (err) {
      console.error("Currency conversion failed", err);
    }
  };

  useEffect(() => {
    if (currency && newBudget) {
      convertCurrency();
    }
  }, [currency, newBudget]);

  const handleSave = () => {
    setBudget(Number(newBudget));
    alert("Budget updated successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-gray-600">Customize your budget preferences here.</p>

      {/* Budget Input */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <label className="block font-medium">Set Total Budget:</label>
        <input
          type="number"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
        >
          Save Budget
        </button>
      </div>

      {/* Currency Converter */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <label className="block font-medium">Convert Budget To:</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="USD">USD - US Dollar</option>
          <option value="KES">KES - Kenyan Shilling</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="INR">INR - Indian Rupee</option>
        </select>

        {converted && (
          <p className="text-gray-700">
            Converted Budget:{" "}
            <span className="font-bold">
              {converted} {currency}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
