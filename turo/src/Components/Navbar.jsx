import React from "react";
import "../Style/Navbar.css";

function Navbar() {
  return (
    <header>
      <div className="navbar">
        <div className="navlogo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/92/Turo_company_logo.png"
            alt=""
          />
        </div>
        <div className="navhref">
          <div className="navsign">
            <button>Why choose Turo</button>
          </div>
          <div className="navavr">
            <a href="#">
              <i class="fa-solid fa-bars"></i>
            </a>
            <a href="#">
              <i class="fa-regular fa-circle-user"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
