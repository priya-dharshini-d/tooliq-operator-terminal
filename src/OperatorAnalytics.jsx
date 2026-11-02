import React, { useState, useEffect } from "react";
import "./OperatorAnalytics.css";

const mockOperatorData = [
  {
    id: "OP001",
    name: "Alice Johnson",
    toolsIssued: 12,
    toolsReturned: 12,
    overdueReturns: 0,
    toolLosses: 0,
    issueDate: "2025-07-10",
  },
  {
    id: "OP002",
    name: "Bob Smith",
    toolsIssued: 15,
    toolsReturned: 13,
    overdueReturns: 2,
    toolLosses: 1,
    issueDate: "2025-07-03",
  },
  {
    id: "OP003",
    name: "Charlie Lee",
    toolsIssued: 10,
    toolsReturned: 10,
    overdueReturns: 0,
    toolLosses: 0,
    issueDate: "2025-06-25",
  },
  {
    id: "OP004",
    name: "Diana Prince",
    toolsIssued: 18,
    toolsReturned: 17,
    overdueReturns: 1,
    toolLosses: 0,
    issueDate: "2025-06-15",
  },
  {
    id: "OP005",
    name: "Ethan Hunt",
    toolsIssued: 9,
    toolsReturned: 9,
    overdueReturns: 0,
    toolLosses: 0,
    issueDate: "2025-06-05",
  },
  {
    id: "OP006",
    name: "Fiona Glenanne",
    toolsIssued: 14,
    toolsReturned: 14,
    overdueReturns: 0,
    toolLosses: 0,
    issueDate: "2025-05-20",
  },
  {
    id: "OP007",
    name: "George Blake",
    toolsIssued: 11,
    toolsReturned: 10,
    overdueReturns: 1,
    toolLosses: 0,
    issueDate: "2025-05-10",
  },
  {
    id: "OP008",
    name: "Hannah Wells",
    toolsIssued: 13,
    toolsReturned: 13,
    overdueReturns: 0,
    toolLosses: 0,
    issueDate: "2025-04-30",
  },
  {
    id: "OP009",
    name: "Ian Fleming",
    toolsIssued: 8,
    toolsReturned: 8,
    overdueReturns: 0,
    toolLosses: 0,
    issueDate: "2025-04-20",
  },
  {
    id: "OP010",
    name: "Jane Foster",
    toolsIssued: 20,
    toolsReturned: 18,
    overdueReturns: 1,
    toolLosses: 1,
    issueDate: "2025-03-15",
  },
  {
    id: "OP011",
    name: "Kyle Reese",
    toolsIssued: 16,
    toolsReturned: 16,
    overdueReturns: 0,
    toolLosses: 0,
    issueDate: "2025-03-01",
  },
  {
    id: "OP012",
    name: "Lana Lang",
    toolsIssued: 7,
    toolsReturned: 7,
    overdueReturns: 0,
    toolLosses: 0,
    issueDate: "2025-02-20",
  },
  {
    id: "OP013",
    name: "Mike Ross",
    toolsIssued: 9,
    toolsReturned: 8,
    overdueReturns: 1,
    toolLosses: 0,
    issueDate: "2025-02-10",
  },
  {
    id: "OP014",
    name: "Nina Sharp",
    toolsIssued: 14,
    toolsReturned: 14,
    overdueReturns: 0,
    toolLosses: 0,
    issueDate: "2025-01-25",
  },
  {
    id: "OP015",
    name: "Oliver Queen",
    toolsIssued: 17,
    toolsReturned: 16,
    overdueReturns: 1,
    toolLosses: 1,
    issueDate: "2025-01-15",
  },
];

const OperatorAnalytics = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setData(mockOperatorData);
  }, []);

  // Filter data by issueDate
  const filteredData = data.filter((op) => {
    if (filter === "all") return true;
    const now = new Date();
    const issueDate = new Date(op.issueDate);
    const diffDays = (now - issueDate) / (1000 * 60 * 60 * 24);

    if (filter === "7days") return diffDays <= 7;
    if (filter === "1month") return diffDays <= 30;
    return true;
  });

  // Compute summary metrics on filtered data
  const totalOperators = filteredData.length;
  const avgToolsIssued =
    totalOperators === 0
      ? 0
      : (
          filteredData.reduce((sum, op) => sum + op.toolsIssued, 0) /
          totalOperators
        ).toFixed(1);
  const totalIssued = filteredData.reduce((sum, op) => sum + op.toolsIssued, 0);
  const totalReturned = filteredData.reduce(
    (sum, op) => sum + op.toolsReturned,
    0
  );
  const avgReturnRate =
    totalIssued === 0 ? 0 : ((totalReturned / totalIssued) * 100).toFixed(1);
  const flaggedOperators = filteredData.filter(
    (op) => op.overdueReturns > 0
  ).length;

  // Export CSV function
  const exportCSV = () => {
    const headers = [
      "Operator ID",
      "Name",
      "Tools Issued",
      "Tools Returned",
      "Overdue Returns",
      "Tool Losses",
    ];
    const rows = filteredData.map((op) => [
      op.id,
      op.name,
      op.toolsIssued,
      op.toolsReturned,
      op.overdueReturns,
      op.toolLosses,
    ]);
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
    rows.forEach((rowArray) => {
      csvContent += rowArray.join(",") + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "operator_analytics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="operator-analytics-container">
      <h2>Operator Analytics</h2>

      <div className="filter-export-container">
        <div className="filter-group">
          <label htmlFor="dateFilter">Filter:</label>
          <select
            id="dateFilter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="7days">Last 7 Days</option>
            <option value="1month">Last 1 Month</option>
          </select>
        </div>

        <button className="export-button" onClick={exportCSV}>
          Export
        </button>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-title">Average Tools Issued</div>
          <div className="summary-value">{avgToolsIssued}</div>
        </div>
        <div className="summary-card">
          <div className="summary-title">Average Return Rate (%)</div>
          <div className="summary-value">{avgReturnRate}%</div>
        </div>
        <div className="summary-card">
          <div className="summary-title">Operators Flagged</div>
          <div className="summary-value">{flaggedOperators}</div>
        </div>
      </div>

      <table className="operator-table">
        <thead>
          <tr>
            <th>Operator ID</th>
            <th>Name</th>
            <th>Tools Issued</th>
            <th>Tools Returned</th>
            <th>Overdue Returns</th>
            <th>Tool Losses</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((op) => (
            <tr key={op.id} className={op.overdueReturns > 0 ? "flagged" : ""}>
              <td>{op.id}</td>
              <td>{op.name}</td>
              <td>{op.toolsIssued}</td>
              <td>{op.toolsReturned}</td>
              <td>{op.overdueReturns}</td>
              <td>{op.toolLosses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OperatorAnalytics;
