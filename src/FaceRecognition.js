import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

function FaceRecognition({ onVerified }) {
  const videoRef = useRef();
  const [status, setStatus] = useState("Facial authentication in progress...");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [verified, setVerified] = useState(false);

  // Load face-api.js models and reference face
  useEffect(() => {
    const loadAll = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);

        const referenceImage = await faceapi.fetchImage(
          process.env.PUBLIC_URL + "/reference.jpg"
        );

        const referenceDetection = await faceapi
          .detectSingleFace(
            referenceImage,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!referenceDetection) {
          setStatus("Reference face not found. Check reference.jpg.");
          return;
        }

        setFaceMatcher(new faceapi.FaceMatcher(referenceDetection.descriptor));
        setModelsLoaded(true);
      } catch (error) {
        setStatus("Error loading models: " + error);
      }
    };

    loadAll();

    // Cleanup camera stream on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Start video stream once models are loaded
  useEffect(() => {
    if (!modelsLoaded) return;

    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => setStatus("Camera error: " + err.message));
  }, [modelsLoaded]);

  // Detect face continuously
  useEffect(() => {
    if (!modelsLoaded || !faceMatcher) return;
    let intervalId;

    const detectFace = async () => {
      if (videoRef.current && videoRef.current.readyState === 4 && !verified) {
        const detection = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detection) {
          const match = faceMatcher.findBestMatch(detection.descriptor);
          if (match.distance < 0.5) {
            setStatus("Verification successful.");
            setVerified(true);
            if (onVerified) onVerified();
          } else {
            setStatus("Face not recognized.");
          }
        } else {
          setStatus("No face detected.");
        }
      }
    };

    intervalId = setInterval(detectFace, 1500);

    return () => clearInterval(intervalId);
  }, [modelsLoaded, faceMatcher, verified, onVerified]);

  // Map status to custom color codes
  const statusColor =
    status === "Verification successful."
      ? "#28a745" // Green
      : status === "Face not recognized."
      ? "#dc3545" // Red
      : status === "No face detected."
      ? "#1a2b3c"
      : status.startsWith("Camera error")
      ? "#b02a37" // Dark red
      : "#1a2b3c"; // Custom dark blue-gray for in-progress

  return (
    <div
      className="login-image"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "0px",
      }}
    >
      <div
        style={{
          width: "320px",
          height: "240px",
          borderRadius: "10px",
          boxShadow: "0 0 5px rgba(0,0,0,0.2)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          width="100%"
          height="100%"
          style={{ borderRadius: "8px" }}
        />
      </div>

      <div
        style={{
          marginTop: "45px",
          textAlign: "center",
          minHeight: "24px",
          fontWeight: "bold",
          color: statusColor,
        }}
      >
        {status}
      </div>
    </div>
  );
}

export default FaceRecognition;
