import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import "./AddClass.css";

export default function AddClass() {
  const navigate = useNavigate();
  const [className, setClassName] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const teachersList = [
    { id: "T1", name: "A" },
    { id: "T2", name: "B" },
    { id: "T3", name: "C" },
    { id: "T4", name: "D" }
  ];

  const handleSubmit = () => {
    console.log({ className, selectedTeacher });
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="section">
        <h1>Add Class</h1>
        <div className="form-box">
          <div className="each-line">
            <label>Enter Class Name</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Class Name"
              required
            />
          </div>
          <div className="each-line">
            <label>Select Teacher</label>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              required
            >
              <option value="">Select a Teacher</option>
              {teachersList.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <PrimaryBtn btnText="Add Class" btnOnClick={handleSubmit} />
        </div>
      </div>
    </>
  );
}
