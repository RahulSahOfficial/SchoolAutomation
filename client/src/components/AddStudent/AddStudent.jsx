import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import { UserContext } from "../../context";
import axios from "axios";
import bcrypt from "bcryptjs";
import { emailRegex } from "../../../../server/utils/checks";

const GET_TEACHER_CLASSES_URL = "http://localhost:3000/api/classes/";
const REGISTER_STUDENT_URL = "http://localhost:3000/api/students/register";

export default function AddStudent() {
  const { user } = useContext(UserContext);
  const [studentClasses, setStudentClasses] = useState([]);
  useEffect(() => {
    async function getTeacherClasses() {
      if (user.userId) {
        if (user.role != "teacher") {
          navigate("/dashboard");
        }
        const result = await axios.get(GET_TEACHER_CLASSES_URL + user.userId);

        if (result.status == 200 || result.status == 201) {
          const data = result.data;
          setStudentClasses(data);
          return;
        }
        return console.log(
          "There was some error while fetching data. " +
            result.response.data.error
        );
      }
    }
    getTeacherClasses();
  }, [user]);

  const navigate = useNavigate();
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (rollNo, name, email, password, classId) => {
    try {
      if (
        name.trim() === "" ||
        rollNo.trim() === "" ||
        !emailRegex.test(email) ||
        password.trim() === ""
      ) {
        return alert("Enter valid values.");
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const payload = {
        rollNo,
        name,
        email,
        hashedPassword,
        classId,
      };
      const result = await axios.post(REGISTER_STUDENT_URL, payload);
      if (result.status === 200 || result.status === 201) {
        return alert("Succesfully uploaded student's details✅.");
      }
    } catch (error) {
      return alert(
        "There was an error while uploading student's details. " +
          error.response.data.error
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="section">
        <h1>Add Student</h1>
        <div className="form-box">
          <div className="each-line">
            <label>Enter the Roll No</label>
            <input
              type="number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
            />
          </div>
          <div className="each-line">
            <label>Enter the Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="each-line">
            <label>Enter the Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="each-line">
            <label>Enter the Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div className="each-line">
            <label>Upload Student Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {image && <img src={image} alt="Student" width="100" />}
          </div> */}
          <div className="each-line">
            <label>Select Class:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {studentClasses.map((cls) => (
                <option key={cls.class_id} value={cls.class_id}>
                  {cls.class_name}
                </option>
              ))}
            </select>
          </div>
          <PrimaryBtn
            btnText="Add Student"
            btnOnClick={() =>
              handleSubmit(rollNo, name, email, password, selectedClass)
            }
          />
        </div>
      </div>
    </>
  );
}
