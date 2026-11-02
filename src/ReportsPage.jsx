import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";
import "./ReportsPage.css";

// Dummy data for example reports
const reportsData = {
  toolUsage: [
    { ToolID: "T001", UsageHours: 120, Operator: "John" },
    { ToolID: "T002", UsageHours: 85, Operator: "Alice" },
  ],
  inventorySummary: [
    { Item: "Drill Bit", Quantity: 25, Location: "Warehouse A" },
    { Item: "Milling Cutter", Quantity: 10, Location: "Warehouse B" },
  ],
  operatorPerformance: [
    { Operator: "John", TasksCompleted: 45, Efficiency: "90%" },
    { Operator: "Alice", TasksCompleted: 38, Efficiency: "85%" },
  ],
  failureForecast: [
    { ToolID: "T003", FailureRisk: "High", PredictedDate: "2025-08-01" },
    { ToolID: "T004", FailureRisk: "Medium", PredictedDate: "2025-08-15" },
  ],
};

const reportTitles = {
  toolUsage: "Tool Usage Report",
  inventorySummary: "Inventory Summary",
  operatorPerformance: "Operator Performance",
  failureForecast: "Failure Forecast Report",
};

const ReportsPage = () => {
  const exportCSV = (reportKey) => {
    const csv = Papa.unparse(reportsData[reportKey]);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${reportTitles[reportKey].replace(/\s/g, "_")}.csv`);
  };

  const exportExcel = (reportKey) => {
    const worksheet = XLSX.utils.json_to_sheet(reportsData[reportKey]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, reportTitles[reportKey]);
    XLSX.writeFile(
      workbook,
      `${reportTitles[reportKey].replace(/\s/g, "_")}.xlsx`
    );
  };

  const exportPDF = (reportKey) => {
    const doc = new jsPDF();
    doc.text(reportTitles[reportKey], 14, 15);
    const data = reportsData[reportKey];
    const columns = Object.keys(data[0] || {}).map((key) =>
      key.replace(/([A-Z])/g, " $1").trim()
    ); // Pretty headers
    const rows = data.map((row) => Object.values(row));
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });
    doc.save(`${reportTitles[reportKey].replace(/\s/g, "_")}.pdf`);
  };

  return (
    <div className="report-container">
      <h2>📁 Reports & Export Center</h2>
      <p className="description">
        All reports are generated based on real-time data and can be exported in
        CSV, PDF, or Excel format.
      </p>

      <div className="reports-grid">
        {Object.entries(reportTitles).map(([key, title]) => (
          <div key={key} className="report-card">
            <h3>{title}</h3>
            <div className="btn-group">
              <button onClick={() => exportCSV(key)} className="btn csv">
                CSV
              </button>
              <button onClick={() => exportExcel(key)} className="btn excel">
                Excel
              </button>
              <button onClick={() => exportPDF(key)} className="btn pdf">
                PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
