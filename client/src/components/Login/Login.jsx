import "./Login.css";
import { useState } from "react";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate=useNavigate();
  const [userRole,changeRole]=useState("student");
  return (
    <>
      <div className="outer">
      <div className="login-box">
        <div className="left">
          <img src="images/graphics/teacher-students.png" alt="Teacher Student" />
        </div>
        <div className="right">
          <h1>School Automation</h1>
          <h2>Login</h2>
          <div className="each-line">
            <label htmlFor="input-email">Enter your Email</label>
            <input type="email" id="input-email" />
          </div>
          <div className="each-line">
            <label htmlFor="input-password">Enter your Password</label>
            <input type="password" id="input-password" />
          </div>
          <div className="each-line">
            <label>Select Your Role</label>
            <div className="options">
              <div className={`each-option ${(userRole=='student')?'active':''} student`} onClick={()=>changeRole('student')}>
                <img src="images/graphics/student.png" alt="Student" />
                <p>Student</p>
              </div>
              <div className={`each-option ${(userRole=='teacher')?'active':''} teacher`} onClick={()=>changeRole('teacher')}>
                <img src="images/graphics/teacher.png" alt="Teacher" />
                <p>Teacher</p>
              </div>
              <div className={`each-option ${(userRole=='headmaster')?'active':''} headmaster`} onClick={()=>changeRole('headmaster')}>
                <img src="images/graphics/headmaster.png" alt="Headmaster" />
                <p>Headmaster</p>
              </div>
            </div>
            
          </div>
          <PrimaryBtn btnText="Submit" btnOnClick={()=>{navigate("/home")}}/>
        </div>
      </div>
      </div>
      
    </>
  )
}