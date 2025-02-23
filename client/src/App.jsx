import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
// import Home from "./components/Home/Home";
import SelectClass from "./components/SelectClass/SelectClass";
import MarkAttendence from "./components/MarkAttendence/MarkAttendence";
import AddStudent from "./components/AddStudent/AddStudent";
import AddTeacher from "./components/AddTeacher/AddTeacher";
import AddClass from "./components/AddClass/AddClass";
import ViewAttendance from "./components/ViewAttendance/ViewAttendance";
import StudentViewAttendance from "./components/StudentViewAttendance/StudentViewAttendance";
import AddSubject from "./components/AddSubject/AddSubject";
import AddExam from "./components/AddExam/AddExam";
import AddMarks from "./components/AddMarks/AddMarks";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/select-class" element={<SelectClass />} />
        <Route path="/mark-attendence" element={<MarkAttendence />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-teacher" element={<AddTeacher />} />
        <Route path="/add-class" element={<AddClass />} />
        <Route path="/add-exam" element={<AddExam />} />
        <Route path="/add-subject" element={<AddSubject />} />
        <Route path="/view-attendance" element={<ViewAttendance />} />
        <Route path="/add-marks" element={<AddMarks />} />
        <Route path="/student-view-attendance" element={<StudentViewAttendance />} />
      </Routes>
    </Router>
  )
}

export default App
