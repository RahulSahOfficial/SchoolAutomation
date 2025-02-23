import { useContext, setState, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../Navbar/Navbar";

import { UserContext } from "../../context";

import "./SelectClass.css";
import axios from "axios";

const GET_CLASSES_FOR_TEACHER_URL = "http://localhost:3000/api/classes/";

export default function SelectClass() {
  const { user } = useContext(UserContext);
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    if (user.userId) {
      if (user.role != "teacher") {
        return navigate("/dashboard");
      }
      async function getClasses() {
        const result = await axios.get(
          GET_CLASSES_FOR_TEACHER_URL + user.userId
        );
        if (result.status === 200 || result.status === 201) {
          setClasses(result.data);
        }
      }
      getClasses();
    }
  }, [user]);
  return (
    <div>
      <Navbar />
      <div className="section select-class">
        <h1>Add Attendence</h1>
        <h3>Select Class</h3>
        <div className="options-box">
          {classes.map((clas) => (
            <Link
              to={`/mark-attendence?classId=${clas.class_id}&className=${clas.class_name}`}
              key={clas.class_id}
            >
              <div className="each-option">{clas.class_name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
