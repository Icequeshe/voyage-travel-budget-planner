import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useBudgetStore from "../store/useBudgetStore";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function ExpenseChart() {
  const expenses = useBudgetStore((state) => state.expenses);

  // Group expenses by category
  const data = expenses.reduce((acc, expense) => {
    const found = acc.find((item) => item.name === expense.category);
    if (found) {
      found.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
      {data.length > 0 ? (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p className="text-gray-600">No expenses added yet.</p>
      )}
    </div>
  );
}
