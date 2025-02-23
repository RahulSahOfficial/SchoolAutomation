import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../Navbar/Navbar";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import { UserContext } from "../../context";

import "./AddClass.css";

const TEACHER_UNDER_HEADMASTER_URL =
  "http://localhost:3000/api/teachers/headmaster/";

const ADD_CLASS_URL = "http://localhost:3000/api/classes/add";

export default function AddClass() {
  const navigate = useNavigate();
  const [className, setClassName] = useState("");
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function apiCallFunction() {
      if (user.role != "headmaster") {
        navigate("/dashboard");
      }
      let result = await axios.get(TEACHER_UNDER_HEADMASTER_URL + user.userId);
      result = result.data;
      setTeacherOptions(result);
    }
    apiCallFunction();
  }, [user]);

  const handleSubmit = async (className, selectedTeacher) => {
    if (!className || className.trim() === "") {
      return alert("Invalid class name.");
    }
    if (!selectedTeacher || selectedTeacher.trim() === "") {
      return alert("Invalid teacher selected.");
    }
    let result = await axios.post(ADD_CLASS_URL, {
      className,
      teacherId: selectedTeacher,
    });
    if (result.status === 200 || result.status === 201) {
      return alert(
        "Class " + result.data.class_name + " added successfully ✅."
      );
    }
    return alert("There was an error in uploading class. ");
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
              {teacherOptions.map((teacher) => (
                <option key={teacher.teacher_id} value={teacher.teacher_id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <PrimaryBtn
            btnText="Add Class"
            btnOnClick={() => handleSubmit(className, selectedTeacher)}
          />
        </div>
      </div>
    </>
  );
}
