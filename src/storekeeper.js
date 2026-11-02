import React, { useState } from "react";
import { FaTrash, FaPlus, FaQrcode } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import "./styles.css";

const initialStorekeepers = [
  { id: 1, sid: "S001", name: "Ramesh Verma" },
  { id: 2, sid: "S002", name: "Neha Reddy" },
  { id: 3, sid: "S003", name: "Amit Chauhan" },
  { id: 4, sid: "S004", name: "Kavita Nair" },
  { id: 5, sid: "S005", name: "Manoj Mehta" },
];

function StorekeeperPage() {
  const [storekeepers, setStorekeepers] = useState(initialStorekeepers);
  const [search, setSearch] = useState("");
  const [newStorekeeper, setNewStorekeeper] = useState({ name: "" });
  const [showConfirm, setShowConfirm] = useState(null);
  const [showQR, setShowQR] = useState(null);

  const filteredStorekeepers = storekeepers.filter((sk) =>
    sk.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddStorekeeper = () => {
    if (!newStorekeeper.name) return;
    const id = storekeepers.length
      ? storekeepers[storekeepers.length - 1].id + 1
      : 1;
    const sid = `S${String(id).padStart(3, "0")}`;
    const storekeeper = {
      id,
      sid,
      name: newStorekeeper.name,
    };
    setStorekeepers([...storekeepers, storekeeper]);
    setNewStorekeeper({ name: "" });
  };

  const confirmDelete = (id) => {
    setStorekeepers(storekeepers.filter((sk) => sk.id !== id));
    setShowConfirm(null);
  };

  const downloadQR = (storekeeper) => {
    const canvas = document.getElementById("qrCode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `${storekeeper.name}_QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="tool-container">
      <h2>Storekeeper Inventory</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search storekeepers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="tool-search"
      />

      {/* Add Form */}
      <div className="tool-add-form">
        <input
          type="text"
          placeholder="Storekeeper name"
          value={newStorekeeper.name}
          onChange={(e) =>
            setNewStorekeeper({ ...newStorekeeper, name: e.target.value })
          }
        />
        <button onClick={handleAddStorekeeper} className="add-btn">
          <FaPlus /> Add
        </button>
      </div>

      {/* Storekeeper Table */}
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
          {filteredStorekeepers.map((sk) => (
            <tr key={sk.id}>
              <td>{sk.sid}</td>
              <td>{sk.name}</td>
              <td>
                <button onClick={() => setShowQR(sk.id)}>
                  <FaQrcode />
                </button>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => setShowConfirm(sk.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {filteredStorekeepers.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "12px" }}>
                No storekeepers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showConfirm !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this storekeeper?</p>
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
              QR Code for {storekeepers.find((s) => s.id === showQR)?.name}
            </h4>
            <div style={{ marginBottom: "16px" }}>
              <QRCodeCanvas
                id="qrCode"
                value={`Storekeeper ID: ${
                  storekeepers.find((s) => s.id === showQR).sid
                }\nName: ${storekeepers.find((s) => s.id === showQR).name}`}
                size={200}
                fgColor="#000000"
                bgColor="#ffffff"
                includeMargin={true}
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={() =>
                  downloadQR(storekeepers.find((s) => s.id === showQR))
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

export default StorekeeperPage;
