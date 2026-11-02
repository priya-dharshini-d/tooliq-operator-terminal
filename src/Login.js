import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import FaceRecognition from "./FaceRecognition";
import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qrVerified, setQrVerified] = useState(false);
  const [FaceVerified, setFaceVerified] = useState(false);
  const [scanError, setScanError] = useState("");
  const navigate = useNavigate();

  const SECRET_QR_VALUE = "admin1";
  const ADMIN_CREDENTIALS = {
    username: "PD",
    password: "tooliq@123",
  };

  const handleScan = (data) => {
    if (data?.text === SECRET_QR_VALUE) {
      setQrVerified(true);
      setScanError("");
    } else if (data?.text) {
      setScanError("Invalid QR code. Please try again.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!qrVerified) {
      alert("Please scan the valid QR code first.");
      return;
    }
    if (
      email === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      navigate(`/welcome/${encodeURIComponent(email)}`);
    } else {
      alert("Invalid username or password.");
    }
  };

  const handleFaceVerified = () => {
    // You can navigate or set state to show "verified"
    setFaceVerified(true);
    setQrVerified(true)
    // Or redirect to welcome page, etc.
  };

  return (
    <div className="container">
      <div className="login-box">
        {/* Left: Login Form */}
        <div className="login-form">
          <h2>ADMIN LOGIN</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Admin Name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={!qrVerified}>
              LOGIN
            </button>
          </form>
        </div>
        <FaceRecognition onVerified={handleFaceVerified} />
        {/* Right: QR Scanner */}

      </div>

    </div>
  );
}

export default Login;
