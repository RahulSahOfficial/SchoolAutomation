import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import "./AddSubject.css";

export default function AddSubject() {
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState("");

  const teachers = [
    { teacherId: 123, teacherName: "A" },
    { teacherId: 124, teacherName: "B" },
    { teacherId: 125, teacherName: "C" },
  ];

  const handleSubmit = () => {
    if (!subjectName || !selectedTeacherId) {
      alert("Please fill all fields!");
      return;
    }

    console.log({ subjectName, teacherId: selectedTeacherId });
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="section">
        <h1>Add Subject</h1>
        <div className="form-box">
          <div className="each-line">
            <label>Enter Subject Name</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Subject Name"
              required
            />
          </div>

          <div className="each-line">
            <label>Select Teacher</label>
            <select
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
              required
            >
              <option value="" disabled>Select a Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.teacherId} value={teacher.teacherId}>
                  {teacher.teacherName}
                </option>
              ))}
            </select>
          </div>

          <PrimaryBtn btnText="Add Subject" btnOnClick={handleSubmit} />
        </div>
      </div>
    </>
  );
}
