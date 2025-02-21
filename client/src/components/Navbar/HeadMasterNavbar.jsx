import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function HeadMasterNavbar() {
  const navigate=useNavigate();
  function Logout(){
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="section">
        <div className="left">
            <h1>HeadMaster Panel</h1>
        </div>
        <div className="right profile">
            <img src="/images/profile.png" alt="Profile" />
            <div className="text-box">
                <p>Name of User</p>
                <p className="link-tag" onClick={Logout}>Logout</p>
            </div>
        </div>
    </nav>
  )
}