import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import TeacherDashboard from "./components/Dashboard/TeacherDashboard";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import SelectClass from "./components/SelectClass/SelectClass";
import MarkAttendence from "./components/MarkAttendence/MarkAttendence";
import AddStudent from "./components/AddStudent/AddStudent";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<TeacherDashboard />} />
        <Route path="/select-class" element={<SelectClass />} />
        <Route path="/mark-attendence" element={<MarkAttendence />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
