import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="navbar">
        <div className="navlogo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2_CMBQHLaRWRkSOBjBOcomWYZRtromx44BQ&s"
            alt="Turo"
          />
        </div>
        <div className="navhref">
          <div className="navsign">
            <button>Why choose Turo</button>
          </div>
          <div className="navavr">
            <a href="#">
              <i className="fa-solid fa-bars"></i>
            </a>
            <a href="#">
              <i className="fa-regular fa-circle-user"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
