import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import "./AddMarks.css";

export default function AddMarks() {
  const navigate = useNavigate();

//Data Fetching
  const exams = [
    { examId: 123, examName: "MidSem 2024", totalMarks: 20 },
    { examId: 124, examName: "EndSem 2024", totalMarks: 100 },
  ];

  const subjects = [
    { subjectId: 201, subjectName: "Maths" },
    { subjectId: 202, subjectName: "Physics" },
  ];

  const students = [
    { studentId: 301, rollNo: "123", name: "Rahul Sah" },
    { studentId: 302, rollNo: "124", name: "Amit Kumar" },
  ];

  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [marks, setMarks] = useState({});

  const handleExamChange = (e) => {
    const examId = parseInt(e.target.value);
    const exam = exams.find((ex) => ex.examId === examId);
    setSelectedExam(exam);
    setMarks({});
  };


  const handleSubjectChange = (e) => {
    const subjectId = parseInt(e.target.value);
    setSelectedSubject(subjectId);
  };


  const handleMarksChange = (studentId, value) => {
    const newMarks = { ...marks, [studentId]: value };
    setMarks(newMarks);
  };


  const handleSubmit = () => {
    if (!selectedExam || !selectedSubject) {
      alert("Please select an Exam and a Subject!");
      return;
    }

    const results = students.map((student) => ({
      studentId: student.studentId,
      examId: selectedExam.examId,
      subjectId: selectedSubject,
      marksObtained: parseInt(marks[student.studentId]) || 0,
    }));

    console.log("Results Data:", results);
    alert("Marks added successfully!");
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="section">
        <h1>Add Marks</h1>
        <div className="form-box">
          <div className="each-line">
            <label>Select Exam</label>
            <select onChange={handleExamChange}>
              <option value="">Select an Exam</option>
              {exams.map((exam) => (
                <option key={exam.examId} value={exam.examId}>
                  {exam.examName}
                </option>
              ))}
            </select>
          </div>

          <div className="each-line">
            <label>Select Subject</label>
            <select onChange={handleSubjectChange}>
              <option value="">Select a Subject</option>
              {subjects.map((subject) => (
                <option key={subject.subjectId} value={subject.subjectId}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>

          {selectedExam && (
            <p className="imp-message">Total Marks for {selectedExam.examName}: {selectedExam.totalMarks}</p>
          )}

          <div className="marks-table">
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.studentId}>
                    <td>{student.rollNo}</td>
                    <td>{student.name}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max={selectedExam ? selectedExam.totalMarks : ""}
                        value={marks[student.studentId] || ""}
                        onChange={(e) => handleMarksChange(student.studentId, e.target.value)}
                        placeholder="Enter Marks"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PrimaryBtn btnText="Submit Marks" btnOnClick={handleSubmit} />
        </div>
      </div>
    </>
  );
}
