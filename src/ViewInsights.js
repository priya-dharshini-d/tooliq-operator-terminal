import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./Insights.css";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#00C49F",
  "#FFBB28",
];

const toolAvailabilityData = [
  { type: "Drilling", inStock: 30, issued: 10 },
  { type: "Turning", inStock: 25, issued: 20 },
  { type: "Milling", inStock: 20, issued: 5 },
  { type: "Boring", inStock: 18, issued: 8 },
  { type: "Reaming", inStock: 22, issued: 6 },
];

const usageOverTimeData = [
  { date: "Jul 1", issued: 13 },
  { date: "Jul 2", issued: 19 },
  { date: "Jul 3", issued: 14 },
  { date: "Jul 4", issued: 23 },
  { date: "Jul 5", issued: 17 },
  { date: "Jul 6", issued: 21 },
  { date: "Jul 7", issued: 25 },
];

const toolLifeHealthData = [
  { name: "Healthy", value: 65 },
  { name: "Near Expiry", value: 25 },
  { name: "Expired", value: 10 },
];

const topIssuedData = [
  { name: "Drill", count: 28 },
  { name: "Cutter", count: 22 },
  { name: "File", count: 18 },
  { name: "Chisel", count: 15 },
  { name: "Wrench", count: 12 },
  { name: "Punch", count: 10 },
];

const avgToolLifeData = [
  { tool: "Drill", life: 4.5 },
  { tool: "Cutter", life: 4.2 },
  { tool: "Chisel", life: 4.0 },
  { tool: "Wrench", life: 3.8 },
  { tool: "Blade", life: 4.1 },
];

const weeklyToolFailureData = [
  { week: "Week 1", failures: 2 },
  { week: "Week 2", failures: 3 },
  { week: "Week 3", failures: 1 },
  { week: "Week 4", failures: 4 },
];

const GraphCard = ({ title, icon, children }) => (
  <div className="graph-card">
    <h3 className="graph-title">
      {icon} {title}
    </h3>
    <div className="graph-content">{children}</div>
  </div>
);

function ViewInsights() {
  return (
    <div className="insights-container">
      <div className="insights-header">
        <div className="filter-section">
          <span> Filter:</span>
          <select>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
          </select>
        </div>
        <button className="export-btn">Export</button>
      </div>

      <div className="insights-grid">
        <GraphCard title="Tool Availability">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={toolAvailabilityData}>
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="inStock" fill="#8884d8" />
              <Bar dataKey="issued" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </GraphCard>

        <GraphCard title="Tool Usage Over Time">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={usageOverTimeData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="issued"
                stroke="#4a90e2"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </GraphCard>

        <GraphCard title="Tool Lifespan Health">
          <ResponsiveContainer width="100%" height={270}>
            <PieChart>
              <Pie
                data={toolLifeHealthData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                label={({ name, value }) => `${name} (${value})`}
                dataKey="value"
              >
                {toolLifeHealthData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </GraphCard>

        <GraphCard title="Top Issued Tools">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topIssuedData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </GraphCard>

        <GraphCard title="Average Tool Life (Days)">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={avgToolLifeData}>
              <XAxis dataKey="tool" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="life" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </GraphCard>

        <GraphCard title="Weekly Tool Failure Rate">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyToolFailureData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="failures"
                stroke="#e15759"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </GraphCard>
      </div>
    </div>
  );
}

export default ViewInsights;
