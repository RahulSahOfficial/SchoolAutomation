import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import "./AddTeacher.css";

export default function AddTeacher() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const headmasterId = user.userId;

  const handleSubmit = () => {
    console.log({ name, email, password, headmasterId});
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="section">
        <h1>Add Teacher</h1>
        <div className="form-box">
          <div className="each-line">
            <label>Enter the Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Teacher Name"
              required
            />
          </div>
          <div className="each-line">
            <label>Enter the Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Teacher Email"
              required
            />
          </div>
          <div className="each-line">
            <label>Enter the Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Teacher Password"
              required
            />
          </div>
          <PrimaryBtn btnText="Add Teacher" btnOnClick={handleSubmit} />
        </div>
      </div>
    </>
  );
}
