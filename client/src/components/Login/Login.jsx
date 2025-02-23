import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import { UserContext } from "../../context";
import { emailRegex } from "../utils/utils";

import "./Login.css";

const HEADMASTER_LOGIN_URL = "http://localhost:3000/api/headmasters/login";
const TEACHER_LOGIN_URL = "http://localhost:3000/api/teachers/login";
const STUDENT_LOGIN_URL = "http://localhost:3000/api/students/login";

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if ("userId" in user) {
      navigate("/dashboard");
    }
  }, [user]);

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(email, password, role) {
    if (!emailRegex.test(email)) {
      return alert("Please enter a valid email id");
    }
    let url = STUDENT_LOGIN_URL;
    if (role === "teacher") url = TEACHER_LOGIN_URL;
    else if (role === "headmaster") url = HEADMASTER_LOGIN_URL;
    const payload = { email, password };
    try {
      let data = await axios.post(url, payload);
      if (data.status === 200 || data.status === 201) {
        data = data.data;
        let userId = data.student_id;
        if (role === "teacher") userId = data.teacher_id;
        else if (role === "headmaster") userId = data.headmaster_id;
        const localData = {
          userId,
          role,
          name: data.name,
          email: data.email,
          profilePic: "/images/profile.png",
        };
        localStorage.setItem("user", JSON.stringify(localData));
        setUser(localData);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert(
        "There was a problem logging you in. Make sure credentials are right."
      );
    }
  }

  return (
    <>
      <div className="outer">
        <div className="login-box">
          <div className="left">
            <img
              src="images/graphics/teacher-students.png"
              alt="Teacher Student"
            />
          </div>
          <div className="right">
            <h1>School Automation</h1>
            <h2>Login</h2>
            <div className="each-line">
              <label htmlFor="input-email">Enter your Email</label>
              <input
                type="email"
                id="input-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="each-line">
              <label htmlFor="input-password">Enter your Password</label>
              <input
                type="password"
                id="input-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="each-line">
              <label>Select Your Role</label>
              <div className="options">
                <div
                  className={`each-option ${
                    role == "student" ? "active" : ""
                  } student`}
                  onClick={() => setRole("student")}
                >
                  <img src="images/graphics/student.png" alt="Student" />
                  <p>Student</p>
                </div>
                <div
                  className={`each-option ${
                    role == "teacher" ? "active" : ""
                  } teacher`}
                  onClick={() => setRole("teacher")}
                >
                  <img src="images/graphics/teacher.png" alt="Teacher" />
                  <p>Teacher</p>
                </div>
                <div
                  className={`each-option ${
                    role == "headmaster" ? "active" : ""
                  } headmaster`}
                  onClick={() => setRole("headmaster")}
                >
                  <img src="images/graphics/headmaster.png" alt="Headmaster" />
                  <p>Headmaster</p>
                </div>
              </div>
            </div>
            <PrimaryBtn
              btnText="Submit"
              btnOnClick={() => handleLogin(email, password, role)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
