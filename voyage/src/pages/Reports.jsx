import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useBudgetStore from "../store/useBudgetStore";
import ExportPDFButton from "../components/ExportPDFButton";

const COLORS = ["#0088FE", "#FFBB28"]; // Actual = blue, Planned = yellow

export default function Reports() {
  const expenses = useBudgetStore((state) => state.expenses);

  // Aggregate total planned vs actual
  const data = [
    {
      name: "Actual",
      value: expenses
        .filter((e) => e.type === "actual")
        .reduce((acc, e) => acc + parseFloat(e.amount || 0), 0),
    },
    {
      name: "Planned",
      value: expenses
        .filter((e) => e.type === "planned")
        .reduce((acc, e) => acc + parseFloat(e.amount || 0), 0),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <p className="text-gray-600">Visual breakdown of your expenses</p>

      {data[0].value + data[1].value > 0 ? (
        <div id="reports-piechart">
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No expenses recorded yet.</p>
      )}

      {/* Export PDF Button */}
      <div className="mt-6">
        <ExportPDFButton />
      </div>
    </div>
  );
}
