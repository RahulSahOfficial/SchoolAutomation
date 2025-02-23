import TeacherNavbar from "../Navbar/TeacherNavbar";
import { Link } from "react-router-dom";
import "./SelectClass.css";

export default function SelectClass() {
  return (
    <div>
        <TeacherNavbar />
        <div className="section selectClass">
        <h1>Add Attendence</h1>
        <h3>Select Class</h3>
        <div className="options-box">
            <Link to="/mark-attendence?classId=xii">
                <div className="each-option">
                    Class XII
                </div>
            </Link>

            <Link to="/mark-attendence?classId=xii">
                <div className="each-option">
                    Class IX
                </div>
            </Link>

            <Link to="/mark-attendence?classId=xii">
                <div className="each-option">
                    Class VII
                </div>
            </Link>
        </div>
        </div>
        
    </div>
  )
}