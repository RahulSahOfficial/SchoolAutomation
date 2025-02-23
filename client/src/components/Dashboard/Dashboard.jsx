import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { SiGoogleclassroom } from "react-icons/si";
import { VscGraphLine } from "react-icons/vsc";
import "./Dashboard.css";
import { useContext } from "react";
import { UserContext } from "../../context";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <div>
      <Navbar />
      <div className="section">
        <h1>Reports</h1>
        <div className="cards-box">
          <div className="each-card"></div>
          <div className="each-card"></div>
        </div>
        <hr />

        <h1>Options</h1>
        <div className="options-box">
          {/* Teacher-specific options */}
          {user.role === "teacher" && (
            <>
              <Link to="/select-class">
                <MdFormatListBulletedAdd />
                <br />
                Add Attendance
              </Link>

              <Link to={"/add-student/"}>
                <IoIosPersonAdd />
                <br />
                Add Student
              </Link>
            </>
          )}

          {/* Headmaster-specific options */}
          {user.role === "headmaster" && (
            <>
              <Link to="/add-teacher">
                <IoIosPersonAdd />
                <br />
                Add Teachers
              </Link>

              <Link to="/add-class">
                <SiGoogleclassroom />
                <br />
                Add Class
              </Link>

              <Link to="/view-attendance">
                <VscGraphLine />
                <br />
                View Attendence
              </Link>
            </>
          )}

          {/* Student-specific options */}
          {user.role === "student" && (
            <>
              <Link to="/view-attendance">
                <MdFormatListBulletedAdd />
                <br />
                View Attendance
              </Link>

              <Link to="/class-performance">
                <IoIosPersonAdd />
                <br />
                View Performance
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
