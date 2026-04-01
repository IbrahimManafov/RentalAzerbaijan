import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import '../Style/CarDetail.css';

const MOCK_REVIEWS = [
  {
    id: 1, name: "Sarah M.", avatar: "S", color: "#e8f4fd", textColor: "#1a6fa8",
    date: "March 2026", rating: 5,
    text: "Absolutely amazing car! Super clean, drives like a dream. The host was very responsive and made the whole process seamless. Would definitely rent again!",
  },
  {
    id: 2, name: "James K.", avatar: "J", color: "#edf7ed", textColor: "#1e7e34",
    date: "February 2026", rating: 5,
    text: "Great experience overall. The car was exactly as described, pickup was easy, and drop-off was a breeze. Highly recommend to anyone visiting Honolulu.",
  },
  {
    id: 3, name: "Aisha T.", avatar: "A", color: "#fef3e2", textColor: "#b06000",
    date: "January 2026", rating: 4,
    text: "Really nice vehicle and a smooth rental process. Only minor thing was the GPS took a sec to connect but no big deal. Great host, great car!",
  },
  {
    id: 4, name: "Carlos R.", avatar: "C", color: "#fce8f3", textColor: "#a0196e",
    date: "December 2025", rating: 5,
    text: "Loved it! Perfect for exploring the island. Comfortable, fuel-efficient, and the host had everything ready on time. 10/10 would recommend.",
  },
  {
    id: 5, name: "Mei L.", avatar: "M", color: "#ede8fc", textColor: "#5b3db5",
    date: "November 2025", rating: 5,
    text: "Seamless from start to finish. The car was spotless and the host communicated perfectly. Perfect car for our Hawaii trip!",
  },
  {
    id: 6, name: "David P.", avatar: "D", color: "#e8faf4", textColor: "#0f6e56",
    date: "October 2025", rating: 4,
    text: "Very smooth experience. Car was clean and comfortable. Only wish parking instructions were a bit clearer but overall a great trip.",
  },
];

const SIMILAR_CARS = [
  {
    id: 101, name: "Tesla Model 3", year: 2024, price: 89, rating: 4.97, reviews: 210,
    img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80",
    location: "Honolulu, HI",
  },
  {
    id: 102, name: "BMW X5", year: 2023, price: 124, rating: 4.91, reviews: 87,
    img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
    location: "Honolulu, HI",
  },
  {
    id: 103, name: "Ford Mustang", year: 2023, price: 95, rating: 4.88, reviews: 143,
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
    location: "Honolulu, HI",
  },
  {
    id: 104, name: "Jeep Wrangler", year: 2024, price: 110, rating: 4.93, reviews: 198,
    img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    location: "Honolulu, HI",
  },
];

function StarRating({ rating }) {
  return (
    <span className="cd-star-row">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? "cd-star filled" : "cd-star empty"}>★</span>
      ))}
    </span>
  );
}

function CarDetail() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const car = state?.car;
  const [selectedImg, setSelectedImg] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  if (!car) {
    return <p className="not-found">Car information not found for id: {id}</p>;
  }

  const images = car.images?.length > 1
    ? car.images
    : [car.img, car.img, car.img, car.img].filter(Boolean);

  const reviews = car.reviews_list || MOCK_REVIEWS;
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 4);

  const mapLat = car.lat || 21.3069;
  const mapLng = car.lng || -157.8583;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${mapLng - 0.03}%2C${mapLat - 0.02}%2C${mapLng + 0.03}%2C${mapLat + 0.02}&layer=mapnik&marker=${mapLat}%2C${mapLng}`;

  const days = 3;
  const subtotal = car.price * days;
  const fee = Math.round(subtotal * 0.18);
  const total = subtotal + fee;

  return (
    <div className="cd-page">
      <div className="cd-main">

        {/* ===== LEFT ===== */}
        <div className="cd-left">

          {/* GALLERY */}
          <div className="cd-gallery">
            <div className="cd-main-img-wrap">
              <img src={images[selectedImg]} alt={car.name} className="cd-main-img" />
              <div className="cd-img-counter">{selectedImg + 1} / {images.length}</div>
              {selectedImg > 0 && (
                <button className="cd-nav-btn cd-nav-prev" onClick={() => setSelectedImg(i => i - 1)}>‹</button>
              )}
              {selectedImg < images.length - 1 && (
                <button className="cd-nav-btn cd-nav-next" onClick={() => setSelectedImg(i => i + 1)}>›</button>
              )}
            </div>
            <div className="cd-thumbs">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`cd-thumb-wrap ${i === selectedImg ? "active" : ""}`}
                  onClick={() => setSelectedImg(i)}
                >
                  <img src={img} alt={`view ${i + 1}`} className="cd-thumb" />
                </div>
              ))}
            </div>
          </div>

          {/* HOST */}
          <div className="cd-hosted">
            <div className="cd-host-avatar">{car.hostName ? car.hostName[0] : "K"}</div>
            <div className="cd-host-info">
              <span className="cd-host-label">Hosted by</span>
              <span className="cd-host-name">{car.hostName || "Kaimana"}</span>
              <span className="cd-host-trips">⭐ {car.hostRating || "5.0"} · {car.hostTrips || "142"} trips · All-Star Host</span>
            </div>
            <button className="cd-contact-btn">Contact</button>
          </div>

          {/* DESCRIPTION */}
          <div className="cd-section">
            <h2 className="cd-section-title">About this car</h2>
            <p className="cd-description">
              {car.description ||
                "This vehicle is immaculately maintained and ready for your Hawaiian adventure. Enjoy whisper-quiet acceleration, a spacious interior, and cutting-edge tech. Perfect for exploring the island in style and comfort — from Waikiki to the North Shore."}
            </p>
          </div>

          {/* FEATURES */}
          <div className="cd-section">
            <h2 className="cd-section-title">Features</h2>
            <div className="cd-features">
              {(car.features || [
                "Bluetooth", "GPS Navigation", "USB Charger", "Backup Camera",
                "Apple CarPlay", "Android Auto", "Heated Seats", "Sunroof",
              ]).map((f, i) => (
                <span key={i} className="cd-feature-tag">✓ {f}</span>
              ))}
            </div>
          </div>

          {/* REVIEWS */}
          <div className="cd-section">
            <h2 className="cd-section-title">★ {car.rating} · {reviews.length} reviews</h2>
            <div className="cd-reviews-grid">
              {visibleReviews.map((r) => (
                <div key={r.id} className="cd-review-card">
                  <div className="cd-review-top">
                    <div
                      className="cd-review-avatar"
                      style={{ background: r.color || "#f0f0f0", color: r.textColor || "#333" }}
                    >
                      {r.avatar}
                    </div>
                    <div className="cd-review-meta">
                      <span className="cd-review-name">{r.name}</span>
                      <span className="cd-review-date">{r.date}</span>
                    </div>
                    <StarRating rating={r.rating} />
                  </div>
                  <p className="cd-review-text">{r.text}</p>
                </div>
              ))}
            </div>
            {reviews.length > 4 && (
              <button className="cd-show-more-btn" onClick={() => setShowAllReviews(!showAllReviews)}>
                {showAllReviews ? "Show less" : `Show all ${reviews.length} reviews`}
              </button>
            )}
          </div>

          {/* MAP */}
          <div className="cd-section">
            <h2 className="cd-section-title">Location</h2>
            <p className="cd-location-desc">
              📍 {car.location || "Honolulu, HI"} — Exact pickup location provided after booking.
            </p>
            <div className="cd-map-wrapper">
              <iframe
                title="Car Location"
                src={mapSrc}
                className="cd-map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="cd-map-tags">
              <span className="cd-map-tag">🏖 Near beaches</span>
              <span className="cd-map-tag">✈️ Airport pickup available</span>
              <span className="cd-map-tag">🅿️ Free parking nearby</span>
            </div>
          </div>

        </div>

        {/* ===== RIGHT — BOOKING CARD ===== */}
        <div className="cd-right">
          <div className="cd-booking-card">
            <div className="cd-car-header">
              <h1 className="cd-car-name">{car.name}</h1>
              <div className="cd-rating-row">
                <span className="cd-stars">★ {car.rating}</span>
                <span className="cd-reviews-count">({car.reviews} reviews)</span>
                <span className="cd-year cd-badge">{car.year}</span>
              </div>
            </div>

            <div className="cd-price-row">
              <span className="cd-price">${car.price}</span>
              <span className="cd-price-unit">/day</span>
            </div>

            <div className="cd-divider" />

            <div className="cd-dates">
              <div className="cd-date-field">
                <label>TRIP START</label>
                <input type="datetime-local" defaultValue="2026-06-06T10:00" />
              </div>
              <div className="cd-date-field">
                <label>TRIP END</label>
                <input type="datetime-local" defaultValue="2026-06-09T10:00" />
              </div>
            </div>

            <div className="cd-location-field">
              <label>PICKUP & RETURN</label>
              <input type="text" defaultValue={car.location || "Honolulu, HI"} readOnly />
            </div>

            <button className="cd-book-btn">Continue</button>

            <div className="cd-price-breakdown">
              <div className="cd-pb-row">
                <span>${car.price} × {days} days</span>
                <span>${subtotal}</span>
              </div>
              <div className="cd-pb-row">
                <span>Turo trip fee</span>
                <span>${fee}</span>
              </div>
              <div className="cd-divider" />
              <div className="cd-pb-row cd-pb-total">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <p className="cd-cancel-note">✓ Free cancellation available</p>
          </div>
        </div>
      </div>

      {/* ===== SIMILAR CARS ===== */}
      <div className="cd-similar">
        <h2 className="cd-similar-title">Similar cars you might like</h2>
        <div className="cd-similar-grid">
          {(car.similar || SIMILAR_CARS).map((sc) => (
            <div
              key={sc.id}
              className="cd-sim-card"
              onClick={() => navigate(`/car/${sc.id}`, { state: { car: sc } })}
            >
              <div className="cd-sim-img-wrap">
                <img src={sc.img} alt={sc.name} className="cd-sim-img" />
                <span className="cd-sim-year-badge">{sc.year}</span>
              </div>
              <div className="cd-sim-info">
                <div className="cd-sim-top">
                  <span className="cd-sim-name">{sc.name}</span>
                  <span className="cd-sim-rating">★ {sc.rating}</span>
                </div>
                <span className="cd-sim-location">📍 {sc.location}</span>
                <div className="cd-sim-bottom">
                  <span className="cd-sim-price">
                    ${sc.price}<span className="cd-sim-per">/day</span>
                  </span>
                  <span className="cd-sim-reviews">{sc.reviews} trips</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarDetail;
