import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
// import Home from "./components/Home/Home";
import SelectClass from "./components/SelectClass/SelectClass";
import MarkAttendence from "./components/MarkAttendence/MarkAttendence";
import AddStudent from "./components/AddStudent/AddStudent";
import AddTeacher from "./components/AddTeacher/AddTeacher";
import AddClass from "./components/AddClass/AddClass";
import ViewAttendance from "./components/ViewAttendance/ViewAttendance";

//user context
import { UserProvider } from "./context";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/select-class" element={<SelectClass />} />
          <Route path="/mark-attendence" element={<MarkAttendence />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/add-teacher" element={<AddTeacher />} />
          <Route path="/add-class" element={<AddClass />} />
          <Route path="/view-attendance" element={<ViewAttendance />} />
          {/* <Route path="/home" element={<Home />} /> */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
