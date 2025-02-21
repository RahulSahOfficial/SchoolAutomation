import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import StudentNavbar from "./components/Navbar/StudentNavbar";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<StudentNavbar />} />
      </Routes>
    </Router>
  )
}

export default App
