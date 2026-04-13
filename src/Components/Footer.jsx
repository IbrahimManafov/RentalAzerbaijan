import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Rental</h4>
          <Link to="/">About</Link>
          <Link to="/">Team</Link>
          <Link to="/">Policies</Link>
          <Link to="/">Careers</Link>
          <Link to="/">Press</Link>
        </div>

        <div className="footer-section">
          <h4>Locations</h4>
          <Link to="/search?location=Baku">Baku</Link>
          <Link to="/search?location=Ganja">Ganja</Link>
          <Link to="/search?location=Sumgait">Sumgait</Link>
          <Link to="/search?location=Mingachevir">Mingachevir</Link>
          <Link to="/search?location=Shaki">Shaki</Link>
        </div>

        <div className="footer-section">
          <h4>Explore</h4>
          <Link to="/search">Book a car</Link>
          <Link to="/host">List your car</Link>
          <Link to="/search?category=electric">Electric cars</Link>
          <Link to="/search?category=sports">Sports cars</Link>
          <Link to="/search?category=suv">SUVs</Link>
        </div>

        <div className="footer-section">
          <h4>Hosting</h4>
          <Link to="/host">List your car</Link>
          <Link to="/">Calculator</Link>
          <Link to="/">Insurance</Link>
          <Link to="/">Host tools</Link>
          <Link to="/">Host guide</Link>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <Link to="/">Help center</Link>
          <Link to="/">Contact us</Link>
          <Link to="/">Trust & safety</Link>
          <Link to="/">Cancellation</Link>
          <Link to="/">Get the app</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2026 Rental . All rights reserved. | Terms | Privacy | Sitemap
        </p>
      </div>
    </footer>
  );
}

export default Footer;
