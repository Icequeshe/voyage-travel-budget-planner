import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import useBudgetStore from "../store/useBudgetStore";

export default function ExportPDFButton() {
  const expenses = useBudgetStore((state) => state.expenses);

  const handleExport = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Voyage Travel Budget Report", 14, 20);

    // Table content
    const tableColumn = ["Name", "Amount", "Type"];
    const tableRows = [];

    expenses.forEach((exp) => {
      const expData = [exp.name, exp.amount, exp.type];
      tableRows.push(expData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    // Footer
    doc.setFontSize(10);
    doc.text(
      `Generated on: ${new Date().toLocaleString()}`,
      14,
      doc.internal.pageSize.height - 10
    );

    // Save file
    doc.save("budget_report.pdf");
  };

  return (
    <button
      onClick={handleExport}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow mt-4"
    >
      Export Budget PDF
    </button>
  );
}
