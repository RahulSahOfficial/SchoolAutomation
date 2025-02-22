import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { IoCameraReverse } from "react-icons/io5";
import { IoCameraSharp } from "react-icons/io5";
import "./Camera.css";

export default function Camera({onCapture}) {
  const [facingMode, setFacingMode] = useState("user");
  const webcamRef = useRef(null);
  const videoConstraints = {
    facingMode: facingMode,
  };
  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
      onCapture(imageSrc);
    }
  };

  return (
    <div className="camera">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        style={{ width: "100%", maxWidth: "500px"}}
      />

      <div className="buttons-box">
        <button onClick={toggleCamera}>
            <IoCameraReverse />
        </button>
        <button onClick={capturePhoto}>
            <IoCameraSharp />
        </button>
      </div>
    </div>
  );
};
