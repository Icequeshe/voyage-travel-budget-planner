import { useState, useEffect } from "react";

export default function CurrencyConverter() {
  const [rates, setRates] = useState({});
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState(null);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch(`https://open.er-api.com/v6/latest/${base}`);
        const data = await res.json();
        setRates(data.rates);
      } catch (err) {
        console.error("Error fetching exchange rates", err);
      }
    }
    fetchRates();
  }, [base]);

  useEffect(() => {
    if (rates[target]) {
      setConverted((amount * rates[target]).toFixed(2));
    }
  }, [amount, target, rates]);

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Currency Converter</h2>
      <div className="flex flex-col gap-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded"
        />
        <div className="flex gap-2">
          <select value={base} onChange={(e) => setBase(e.target.value)} className="border p-2 rounded">
            {Object.keys(rates).map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
          <span className="self-center">→</span>
          <select value={target} onChange={(e) => setTarget(e.target.value)} className="border p-2 rounded">
            {Object.keys(rates).map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        {converted && (
          <p className="text-lg font-medium">
            {amount} {base} = {converted} {target}
          </p>
        )}
      </div>
    </div>
  );
}
