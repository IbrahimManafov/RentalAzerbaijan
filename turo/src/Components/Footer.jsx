import React from "react";
import "../Style/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      {/* TOP LINKS */}
      <div className="footer-top">
        <div className="footer-links">
          <h4>VEHICLE TYPES</h4>
          <ul>
            <li>Car rental</li>
            <li>Convertible car rental</li>
            <li>Electric car rental</li>
            <li>Luxury car rental</li>
            <li>Minivan rental</li>
            <li>Box truck rental</li>
            <li>Sport car rental</li>
            <li>SUV rental</li>
            <li>Truck rental</li>
            <li>Van rental</li>
            <li>Cargo van rental</li>
          </ul>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="footer-main">
        <div className="footer-col">
          <h4>Turo</h4>
          <ul>
            <li>About</li>
            <li>Team</li>
            <li>Policies</li>
            <li>Careers</li>
            <li>Press</li>
            <li>OpenRoad</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Locations</h4>
          <ul>
            <li>USA (EN)</li>
            <li>Australia (EN)</li>
            <li>Canada (EN)</li>
            <li>Canada (FR)</li>
            <li>France (FR)</li>
            <li>UK (EN)</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li>Why choose Turo</li>
            <li>Pitch a trip</li>
            <li>Trust & safety</li>
            <li>Get help</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Hosting</h4>
          <ul>
            <li>List your car</li>
            <li>Calculator</li>
            <li>All-Star Hosts</li>
            <li>Host tools</li>
            <li>Insurance & protection</li>
            <li>Host learning hub</li>
          </ul>
        </div>

        {/* SOCIAL + APPS */}
        <div className="footer-social">
          <div className="social-text">Follow us:</div>
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">TikTok</a>
            <a href="#">YouTube</a>
          </div>
          <div className="apps">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="appstore"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="playstore"
            />
          </div>
          <div className="language">🌐 English</div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 Turo, Inc.</p>
        <div className="bottom-links">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Cookie preferences</span>
          <span>Do not sell or share my personal information</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;