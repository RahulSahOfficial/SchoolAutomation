import TeacherNavbar from "../Navbar/TeacherNavbar";
import { Link } from "react-router-dom";
import { MdFormatListBulletedAdd } from "react-icons/md";
import "./Dashboard.css";

export default function TeacherDashboard() {
  return (
    <div>
      <TeacherNavbar />
      <div className="section">
        <h1>Reports</h1>
        <div className="cards-box">
          <div className="each-card">

          </div>
          <div className="each-card">

          </div>
        </div>
        <hr />

        <h1>Options</h1>
        <div className="options-box">
          <Link to="/select-class">
          <MdFormatListBulletedAdd />
            <br />
            Add Attendence
          </Link>
        </div>
      </div>
    </div>
  )
}