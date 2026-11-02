import React, { useState } from "react";
import {
  FaChartLine,
  FaTools,
  FaUserCog,
  FaWarehouse,
  FaFileAlt,
  FaSignOutAlt,
  FaThLarge, // Square/grid icon for Dashboard
} from "react-icons/fa";
import AlertsDashboard from "./AlertsDashboard";
import ViewInsights from "./ViewInsights";
import OperatorAnalytics from "./OperatorAnalytics";
import ToolPage from "./tools";
import OperatorPage from "./operator";
import StorekeeperPage from "./storekeeper";
import ReportsPage from "./ReportsPage";
import "./styles.css";

function WelcomeAdmin() {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  const menuOptions = [
    { label: "Dashboard", icon: <FaThLarge /> }, // Unique square icon
    { label: "Tools", icon: <FaTools /> },
    { label: "Operators", icon: <FaUserCog /> },
    { label: "Storekeepers", icon: <FaWarehouse /> },
    { label: "View Insights", icon: <FaChartLine /> },
    { label: "Operator Analytics", icon: <FaUserCog /> },
    { label: "Reports", icon: <FaFileAlt /> },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case "Dashboard":
        return <AlertsDashboard includeReturnCompliance />;
      case "Tools":
        return <ToolPage />;
      case "Operators":
        return <OperatorPage />;
      case "Storekeepers":
        return <StorekeeperPage />;
      case "View Insights":
        return <ViewInsights />;
      case "Operator Analytics":
        return <OperatorAnalytics />;
      case "Reports":
        return <ReportsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar dark-theme">
        <div className="sidebar-content">
          <div className="sidebar-logo">
            <img src="/logo.png" alt="ToolIQ" className="logo-icon" />
            <span className="logo-text">ToolIQ</span>
          </div>
          <ul className="menu">
            {menuOptions.map((opt, i) => (
              <li
                key={i}
                className={`menu-item-horizontal ${
                  selectedMenu === opt.label ? "active" : ""
                }`}
                onClick={() => setSelectedMenu(opt.label)}
              >
                <span className="icon">{opt.icon}</span>
                <span className="label">{opt.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="logout-button menu-item-horizontal"
          onClick={() => (window.location.href = "/")}
        >
          <FaSignOutAlt className="icon" />
          <span className="label">Log Out</span>
        </div>
      </div>
      <div className="main-content">{renderContent()}</div>
    </div>
  );
}

export default WelcomeAdmin;
