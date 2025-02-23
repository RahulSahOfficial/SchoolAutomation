import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./SelectClass.css";

export default function SelectClass() {
  return (
    <div>
        <Navbar />
        <div className="section select-class">
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