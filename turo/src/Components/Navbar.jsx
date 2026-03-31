import React from "react";
import "../Style/Navbar.css";

function Navbar() {
  return (
    <header>
      <div className="navbar">
        <div className="navlogo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2_CMBQHLaRWRkSOBjBOcomWYZRtromx44BQ&s"
            alt=""
          />
        </div>
        <div className="navhref">
          <div className="navsign">
            <button>
              Why choose Turo
            </button>
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
