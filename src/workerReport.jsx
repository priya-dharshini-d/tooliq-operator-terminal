import React from "react";

const WorkerReport = () => {
  const workers = [
    {
      name: "John Doe",
      id: "W001",
      presentDays: 20,
      totalDays: 22,
      toolUsage: { good: 30, worn: 5, bad: 2 },
    },
    {
      name: "Jane Smith",
      id: "W002",
      presentDays: 18,
      totalDays: 22,
      toolUsage: { good: 25, worn: 10, bad: 5 },
    },
    {
      name: "Alice Johnson",
      id: "W003",
      presentDays: 22,
      totalDays: 22,
      toolUsage: { good: 40, worn: 0, bad: 0 },
    },
    {
      name: "Bob Brown",
      id: "W004",
      presentDays: 19,
      totalDays: 22,
      toolUsage: { good: 15, worn: 10, bad: 5 },
    },
    {
      name: "Carol White",
      id: "W005",
      presentDays: 21,
      totalDays: 22,
      toolUsage: { good: 35, worn: 3, bad: 2 },
    },
    {
      name: "David Green",
      id: "W006",
      presentDays: 17,
      totalDays: 22,
      toolUsage: { good: 20, worn: 10, bad: 10 },
    },
    {
      name: "Eva Black",
      id: "W007",
      presentDays: 22,
      totalDays: 22,
      toolUsage: { good: 50, worn: 0, bad: 0 },
    },
    {
      name: "Frank Wilson",
      id: "W008",
      presentDays: 16,
      totalDays: 22,
      toolUsage: { good: 10, worn: 10, bad: 10 },
    },
    {
      name: "Grace Lee",
      id: "W009",
      presentDays: 20,
      totalDays: 22,
      toolUsage: { good: 25, worn: 5, bad: 5 },
    },
    {
      name: "Henry Young",
      id: "W010",
      presentDays: 15,
      totalDays: 22,
      toolUsage: { good: 10, worn: 15, bad: 5 },
    },
    {
      name: "Ivy King",
      id: "W011",
      presentDays: 21,
      totalDays: 22,
      toolUsage: { good: 40, worn: 7, bad: 3 },
    },
    {
      name: "Jack Hill",
      id: "W012",
      presentDays: 19,
      totalDays: 22,
      toolUsage: { good: 30, worn: 10, bad: 10 },
    },
    {
      name: "Kara Scott",
      id: "W013",
      presentDays: 22,
      totalDays: 22,
      toolUsage: { good: 60, worn: 0, bad: 0 },
    },
    {
      name: "Liam Adams",
      id: "W014",
      presentDays: 18,
      totalDays: 22,
      toolUsage: { good: 20, worn: 15, bad: 5 },
    },
    {
      name: "Mia Baker",
      id: "W015",
      presentDays: 20,
      totalDays: 22,
      toolUsage: { good: 35, worn: 10, bad: 5 },
    },
    {
      name: "Noah Carter",
      id: "W016",
      presentDays: 17,
      totalDays: 22,
      toolUsage: { good: 25, worn: 5, bad: 10 },
    },
    {
      name: "Olivia Diaz",
      id: "W017",
      presentDays: 22,
      totalDays: 22,
      toolUsage: { good: 50, worn: 5, bad: 0 },
    },
    {
      name: "Paul Evans",
      id: "W018",
      presentDays: 19,
      totalDays: 22,
      toolUsage: { good: 30, worn: 10, bad: 5 },
    },
    {
      name: "Quinn Foster",
      id: "W019",
      presentDays: 21,
      totalDays: 22,
      toolUsage: { good: 40, worn: 5, bad: 5 },
    },
    {
      name: "Rachel Gray",
      id: "W020",
      presentDays: 20,
      totalDays: 22,
      toolUsage: { good: 30, worn: 8, bad: 2 },
    },
  ];

  const getPresentPercentage = (presentDays, totalDays) => {
    if (totalDays === 0) return "N/A";
    return ((presentDays / totalDays) * 100).toFixed(1) + "%";
  };

  const getToolUsagePercentage = (toolUsage) => {
    const { good = 0, worn = 0, bad = 0 } = toolUsage;
    const total = good + worn + bad;
    if (total === 0) return "N/A";
    const usagePercent = ((good + worn) / total) * 100;
    return usagePercent.toFixed(1) + "%";
  };

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "20px auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ color: "#1f2a48", marginBottom: 20, textAlign: "center" }}>
        Worker Attendance & Tool Usage Report
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#1f2a48", color: "white" }}>
            <th
              style={{
                padding: "12px 15px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Worker Name
            </th>
            <th
              style={{
                padding: "12px 15px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              Worker ID
            </th>
            <th
              style={{
                padding: "12px 15px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              Present %
            </th>
            <th
              style={{
                padding: "12px 15px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              Tool Usage %
            </th>
          </tr>
        </thead>
        <tbody>
          {workers.map(({ name, id, presentDays, totalDays, toolUsage }) => (
            <tr key={id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px 15px" }}>{name}</td>
              <td style={{ padding: "10px 15px", textAlign: "center" }}>
                {id}
              </td>
              <td style={{ padding: "10px 15px", textAlign: "center" }}>
                {getPresentPercentage(presentDays, totalDays)}
              </td>
              <td style={{ padding: "10px 15px", textAlign: "center" }}>
                {getToolUsagePercentage(toolUsage)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerReport;
