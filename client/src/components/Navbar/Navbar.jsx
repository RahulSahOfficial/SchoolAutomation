import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./Navbar.css";
import { UserContext } from "../../context";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { name, role, profilePic } = user;

  function Logout() {
    localStorage.removeItem("user");
    setUser({});
    navigate("/login");
  }

  let panelTitle = "HeadMaster Panel";
  if (role === "student") {
    panelTitle = "Student Panel";
  } else if (role === "teacher") {
    panelTitle = "Teacher Panel";
  }

  return (
    <nav className="section">
      <div className="left">
        <h2>{panelTitle}</h2>
      </div>
      <div className="right profile">
        <img
          src={profilePic ? profilePic : "/images/default.png"}
          alt="Profile"
        />
        <div className="text-box">
          <p>{name ? name : "Guest User"}</p>
          <p className="link-tag" onClick={Logout}>
            Logout
          </p>
        </div>
      </div>
    </nav>
  );
}
