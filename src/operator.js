import React, { useState } from "react";
import { FaTrash, FaPlus, FaQrcode } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import "./styles.css";

const initialOperators = [
  { id: 1, operatorId: "O001", name: "Ravi Kumar" },
  { id: 2, operatorId: "O002", name: "Aarti Sharma" },
  { id: 3, operatorId: "O003", name: "Suresh Patel" },
  { id: 4, operatorId: "O004", name: "Meena Joshi" },
  { id: 5, operatorId: "O005", name: "Vikram Singh" },
];

function OperatorPage() {
  const [operators, setOperators] = useState(initialOperators);
  const [search, setSearch] = useState("");
  const [newOperator, setNewOperator] = useState({ name: "" });
  const [showConfirm, setShowConfirm] = useState(null);
  const [showQR, setShowQR] = useState(null);

  const filteredOperators = operators.filter((op) =>
    op.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddOperator = () => {
    if (!newOperator.name) return;
    const id = operators.length ? operators[operators.length - 1].id + 1 : 1;
    const operatorId = `O${String(id).padStart(3, "0")}`;
    const operator = {
      id,
      operatorId,
      name: newOperator.name,
    };
    setOperators([...operators, operator]);
    setNewOperator({ name: "" });
  };

  const confirmDelete = (id) => {
    setOperators(operators.filter((op) => op.id !== id));
    setShowConfirm(null);
  };

  const downloadQR = (op) => {
    const canvas = document.getElementById("qrCode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `${op.name}_QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="tool-container">
      <h2>Operator Inventory</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search operators..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="tool-search"
      />

      {/* Add Operator */}
      <div className="tool-add-form">
        <input
          type="text"
          placeholder="Operator name"
          value={newOperator.name}
          onChange={(e) =>
            setNewOperator({ ...newOperator, name: e.target.value })
          }
        />
        <button onClick={handleAddOperator} className="add-btn">
          <FaPlus /> Add
        </button>
      </div>

      {/* Operator Table */}
      <table className="tool-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>QR</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOperators.map((op) => (
            <tr key={op.id}>
              <td>{op.operatorId}</td>
              <td>{op.name}</td>
              <td>
                <button onClick={() => setShowQR(op.id)}>
                  <FaQrcode />
                </button>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => setShowConfirm(op.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {filteredOperators.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "12px" }}>
                No operators found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Modal */}
      {showConfirm !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this operator?</p>
            <div className="modal-actions">
              <button onClick={() => confirmDelete(showConfirm)}>Yes</button>
              <button onClick={() => setShowConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {showQR !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <h4 style={{ marginBottom: "16px", fontWeight: "bold" }}>
              QR Code for {operators.find((o) => o.id === showQR)?.name}
            </h4>
            <div style={{ marginBottom: "16px" }}>
              <QRCodeCanvas
                id="qrCode"
                value={`Operator ID: ${
                  operators.find((o) => o.id === showQR).operatorId
                }\nOperator Name: ${
                  operators.find((o) => o.id === showQR).name
                }`}
                size={200}
                fgColor="#000000"
                bgColor="#ffffff"
                includeMargin={true}
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={() =>
                  downloadQR(operators.find((o) => o.id === showQR))
                }
              >
                Download QR
              </button>
              <button onClick={() => setShowQR(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OperatorPage;
