import React, { useContext, useState } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";

import Navbar from "../Navbar/Navbar";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import { UserContext } from "../../context";
import "./AddTeacher.css";

export default function AddTeacher() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(UserContext);

  const REGISTER_TEACHER_URL = "http://localhost:3000/api/teachers/register";

  async function handleSubmit(name, email, password, headmasterId) {
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(user);
    const payload = {
      name,
      email,
      hashedPassword,
      headmasterId,
    };
    try {
      const result = await axios.post(REGISTER_TEACHER_URL, payload);
      if (result.status === 201 || result.status === 200) {
        return alert(`Teacher ${name} created successfully!`);
      }
    } catch (error) {
      console.log(error);
      alert(
        "There was an error while adding teacher." + error.response.data.error
      );
    }
  }

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
          <PrimaryBtn
            btnText="Add Teacher"
            btnOnClick={() => handleSubmit(name, email, password, user.userId)}
          />
        </div>
      </div>
    </>
  );
}
