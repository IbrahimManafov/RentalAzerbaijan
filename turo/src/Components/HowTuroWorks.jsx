import React from "react";
import "../Style/HowTuroWorks.css";

function HowTuroWorks() {
  return (
    <div className="turo">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>How car sharing works</h1>
          <p>
            Skip the rental counter and book cars shared by real people. 
            Simple, fast, and flexible.
          </p>
          <button>Browse cars</button>
        </div>
      </section>

      {/* STEPS */}
      <section className="steps">
        <h2>Book a car in 3 easy steps</h2>

        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Find your car</h3>
            <p>
              Enter location and dates to discover thousands of available cars.
            </p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Book instantly</h3>
            <p>
              Choose a car and confirm your trip in minutes.
            </p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Drive & enjoy</h3>
            <p>
              Pick up or get it delivered and enjoy your ride.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Why choose us</h2>

        <div className="features-grid">
          <div className="feature">
            <h3>Wide selection</h3>
            <p>Economy to luxury cars available anytime.</p>
          </div>

          <div className="feature">
            <h3>Flexible booking</h3>
            <p>Cancel or change your trip easily.</p>
          </div>

          <div className="feature">
            <h3>Secure & trusted</h3>
            <p>Verified hosts and secure payments.</p>
          </div>

          <div className="feature">
            <h3>Affordable prices</h3>
            <p>Better prices than traditional rentals.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Start your journey today</h2>
        <button>Explore cars</button>
      </section>

    </div>
  );
}

export default HowTuroWorks;