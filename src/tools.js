import React, { useState } from "react";
import { FaTrash, FaPlus, FaQrcode } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import "./styles.css";

const initialTools = [
  { id: 1, serial: "T001", name: "Hammer", stock: 12 },
  { id: 2, serial: "T002", name: "Screwdriver", stock: 20 },
  { id: 3, serial: "T003", name: "Wrench", stock: 7 },
  { id: 4, serial: "T004", name: "Drill", stock: 5 },
];

function ToolPage() {
  const [tools, setTools] = useState(initialTools);
  const [search, setSearch] = useState("");
  const [newTool, setNewTool] = useState({ name: "", stock: "" });
  const [showConfirm, setShowConfirm] = useState(null);
  const [showQR, setShowQR] = useState(null);

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddTool = () => {
    if (!newTool.name || !newTool.stock) return;
    const id = tools.length ? tools[tools.length - 1].id + 1 : 1;
    const serial = `T${String(id).padStart(3, "0")}`;
    const tool = {
      id,
      serial,
      name: newTool.name,
      stock: parseInt(newTool.stock),
    };
    setTools([...tools, tool]);
    setNewTool({ name: "", stock: "" });
  };

  const confirmDelete = (id) => {
    setTools(tools.filter((tool) => tool.id !== id));
    setShowConfirm(null);
  };

  const downloadQR = (tool) => {
    const canvas = document.getElementById("qrCode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `${tool.name}_QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="tool-container">
      <h2>Tool Inventory</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search tools..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="tool-search"
      />

      {/* Add Tool Form */}
      <div className="tool-add-form">
        <input
          type="text"
          placeholder="Tool name"
          value={newTool.name}
          onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={newTool.stock}
          onChange={(e) => setNewTool({ ...newTool, stock: e.target.value })}
        />
        <button onClick={handleAddTool} className="add-btn">
          <FaPlus /> Add
        </button>
      </div>

      {/* Tool Table */}
      <table className="tool-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stock</th>
            <th>QR</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTools.map((tool) => (
            <tr key={tool.id}>
              <td>{tool.serial}</td>
              <td>{tool.name}</td>
              <td>{tool.stock}</td>
              <td>
                <button onClick={() => setShowQR(tool.id)}>
                  <FaQrcode />
                </button>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => setShowConfirm(tool.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {filteredTools.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "12px" }}>
                No tools found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showConfirm !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this tool?</p>
            <div className="modal-actions">
              <button onClick={() => confirmDelete(showConfirm)}>Yes</button>
              <button onClick={() => setShowConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQR !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <h4 style={{ marginBottom: "16px", fontWeight: "bold" }}>
              QR Code for {tools.find((t) => t.id === showQR)?.name}
            </h4>
            <div style={{ marginBottom: "16px" }}>
              <QRCodeCanvas
                id="qrCode"
                value={`Tool ID: ${
                  tools.find((t) => t.id === showQR).serial
                }\nTool Name: ${
                  tools.find((t) => t.id === showQR).name
                }\nStock: ${tools.find((t) => t.id === showQR).stock}`}
                size={200}
                fgColor="#000000"
                bgColor="#ffffff"
                includeMargin={true}
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={() => downloadQR(tools.find((t) => t.id === showQR))}
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

export default ToolPage;
