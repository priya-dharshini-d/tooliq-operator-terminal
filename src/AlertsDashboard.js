import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MdDashboard } from "react-icons/md"; // import dashboard icon
import "./AlertsDashboard.css";

const COLORS = ["#00C49F", "#FF8042"];

const returnComplianceData = [
  { name: "Timely Return", value: 82 },
  { name: "Late Return", value: 18 },
];

const alerts = {
  lowStock: [
    { name: "Wrench", stock: 3 },
    { name: "Cutting Wheel", stock: 4 },
    { name: "Tap Tool", stock: 2 },
    { name: "Blade", stock: 1 },
  ],
  idleTools: [
    { tool: "Reamer", daysIdle: 45 },
    { tool: "Tapping Set", daysIdle: 32 },
    { tool: "Cutting Wheel", daysIdle: 38 },
  ],
  anomalies: [
    { operator: "Bala", toolsTaken: 12 },
    { operator: "Chitra", toolsTaken: 15 },
  ],
  expired: [
    { tool: "Old Drill Bit", status: "Expired" },
    { tool: "Chisel Set", status: "Expired" },
  ],
  nearingLifespan: [
    { tool: "Lathe Tool", remainingDays: 3 },
    { tool: "CNC Insert", remainingDays: 2 },
  ],
  highUsage: [
    { machine: "CNC A", toolsUsed: 68 },
    { machine: "Lathe 2", toolsUsed: 61 },
  ],
};

const AlertsCard = ({ title, icon, headers, rows }) => (
  <div className="alert-card">
    <h3 className="alert-title">
      {icon} {title}
    </h3>
    <div className="alert-table-wrapper">
      <table className="alert-table">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, cIdx) => (
                <td key={cIdx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

function AlertsDashboard() {
  return (
    <div className="alerts-container">
      <h2 className="dashboard-title">
        <MdDashboard
          style={{ verticalAlign: "middle", marginRight: 8, color: "#4A90E2" }}
        />
        Dashboard & Alerts Center
      </h2>

      <div className="dashboard-grid">
        {/* Return Compliance Pie Chart */}
        <div className="pie-card">
          <h3 className="alert-title"> Return Compliance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={returnComplianceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name} (${value}%)`}
                dataKey="value"
              >
                {returnComplianceData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts as tables */}
        <AlertsCard
          title="Low Stock Tools"
          headers={["Tool", "Stock Left"]}
          rows={alerts.lowStock.map((t) => [t.name, t.stock])}
        />

        <AlertsCard
          title="Idle Tools (>30 Days)"
          headers={["Tool", "Days Idle"]}
          rows={alerts.idleTools.map((t) => [t.tool, t.daysIdle])}
        />

        <AlertsCard
          title="Operator Anomalies"
          headers={["Operator", "Tools Taken"]}
          rows={alerts.anomalies.map((a) => [a.operator, a.toolsTaken])}
        />

        <AlertsCard
          title="Expired Tools"
          headers={["Tool", "Status"]}
          rows={alerts.expired.map((t) => [t.tool, t.status])}
        />

        <AlertsCard
          title="Nearing Lifespan"
          headers={["Tool", "Days Left"]}
          rows={alerts.nearingLifespan.map((t) => [t.tool, t.remainingDays])}
        />

        <AlertsCard
          title="High Usage Machines"
          headers={["Machine", "Tools Used"]}
          rows={alerts.highUsage.map((m) => [m.machine, m.toolsUsed])}
        />
      </div>
    </div>
  );
}

export default AlertsDashboard;
