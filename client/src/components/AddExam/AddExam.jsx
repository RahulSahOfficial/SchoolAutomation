import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import "./AddExam.css";

export default function AddExam() {
  const navigate = useNavigate();
  const [examName, setExamName] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const handleSubmit = () => {
    if (!examName || !totalMarks) {
      alert("Please fill all fields!");
      return;
    }

    console.log({ examName, totalMarks });
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="section">
        <h1>Add Exam</h1>
        <div className="form-box">
          <div className="each-line">
            <label>Enter Exam Name</label>
            <input
              type="text"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              placeholder="Exam Name"
              required
            />
          </div>

          <div className="each-line">
            <label>Enter Total Marks</label>
            <input
              type="number"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              placeholder="Total Marks"
              required
              min="1"
            />
          </div>

          <PrimaryBtn btnText="Add Exam" btnOnClick={handleSubmit} />
        </div>
      </div>
    </>
  );
}
