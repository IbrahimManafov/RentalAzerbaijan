import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { locations } from "../data/cars";

function HostCar() {
  const { user, addCar } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "2023",
    category: "Sedan",
    price: "",
    location: "",
    transmission: "Automatic",
    fuelType: "Gas",
    seats: "5",
    doors: "4",
    description: "",
    features: [],
  });

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const allFeatures = [
    "Bluetooth",
    "USB Charger",
    "Backup Camera",
    "Navigation",
    "Heated Seats",
    "Leather Seats",
    "Sunroof",
    "Apple CarPlay",
    "Android Auto",
    "Cruise Control",
    "4WD",
    "Sport Mode",
    "Parking Sensors",
    "Blind Spot Monitor",
    "Lane Assist",
    "Autopilot",
  ];

  const carMakes = [
    "Acura",
    "Audi",
    "BMW",
    "Buick",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Dodge",
    "Ferrari",
    "Ford",
    "GMC",
    "Honda",
    "Hyundai",
    "Infiniti",
    "Jaguar",
    "Jeep",
    "Kia",
    "Lamborghini",
    "Land Rover",
    "Lexus",
    "Lincoln",
    "Maserati",
    "Mazda",
    "Mercedes-Benz",
    "Mini",
    "Mitsubishi",
    "Nissan",
    "Porsche",
    "Ram",
    "Subaru",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages(imageUrls);
  };

  const handleFeatureToggle = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/signin");
      return;
    }

    if (
      !formData.make ||
      !formData.model ||
      !formData.price ||
      !formData.location
    ) {
      setMessage("Please fill in all required fields");
      return;
    }

    setLoading(true);

    const newCar = {
      ...formData,
      price: parseInt(formData.price),
      year: parseInt(formData.year),
      seats: parseInt(formData.seats),
      doors: parseInt(formData.doors),
      image: images[0] || "",
      images: images,
    };

    setTimeout(() => {
      addCar(newCar);
      setMessage("Car listed successfully!");
      setLoading(false);

      setTimeout(() => {
        navigate("/dashboard?tab=cars");
      }, 1500);
    }, 1000);
  };

  if (!user) {
    return (
      <div className="host-page">
        <div className="empty-state">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
            <circle cx="6.5" cy="16.5" r="2.5" />
            <circle cx="16.5" cy="16.5" r="2.5" />
          </svg>
          <h3>Sign in to list your car</h3>
          <p>Create an account or sign in to start earning with your car.</p>
          <button
            onClick={() => navigate("/signin")}
            className="btn btn-primary"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="host-page">
      <h1>List your car</h1>
      <p>Share your car with travelers and earn extra income</p>

      {message && (
        <div
          className={`message ${message.includes("success") ? "success" : "error"}`}
        >
          {message}
        </div>
      )}

      <form className="host-form" onSubmit={handleSubmit}>
        {/* Car Details */}
        <div className="form-section">
          <h3>Car Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Make *</label>
              <select
                name="make"
                value={formData.make}
                onChange={handleChange}
                required
              >
                <option value="">Select make</option>
                {carMakes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Model *</label>
              <input
                type="text"
                name="model"
                placeholder="e.g., Model 3, Camry, Mustang"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Year</label>
              <select name="year" value={formData.year} onChange={handleChange}>
                {Array.from({ length: 15 }, (_, i) => 2024 - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Sports">Sports</option>
                <option value="Electric">Electric</option>
                <option value="Exotic">Exotic</option>
                <option value="Truck">Truck</option>
                <option value="Van">Van</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Transmission</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div className="form-group">
              <label>Fuel Type</label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
              >
                <option value="Gas">Gas</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Seats</label>
              <select
                name="seats"
                value={formData.seats}
                onChange={handleChange}
              >
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8+</option>
              </select>
            </div>
            <div className="form-group">
              <label>Doors</label>
              <select
                name="doors"
                value={formData.doors}
                onChange={handleChange}
              >
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing & Location */}
        <div className="form-section">
          <h3>Pricing & Location</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Daily Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="25"
                max="2000"
                required
              />
            </div>
            <div className="form-group">
              <label>Location *</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              >
                <option value="">Select location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="form-section">
          <h3>Description</h3>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your car..."
            className="fixed-textarea"
          />
        </div>

        {/* Features */}
<div className="form-section">
  <h3>Features</h3>
  <div className="feature-checkboxes vip-features">
    {allFeatures.map((feature) => (
      <label key={feature} className="feature-label">
        <input
          type="checkbox"
          checked={formData.features.includes(feature)}
          onChange={() => handleFeatureToggle(feature)}
        />
        <span>{feature}</span>
      </label>
    ))}
  </div>
</div>

        {/* Images */}
        <div className="image-upload">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            id="fileInput"
            hidden
          />
          <label htmlFor="fileInput" className="upload-box">
            <p>Click to upload car photos</p>
          </label>
          <div className="preview">
            {images.map((img, i) => (
              <img key={i} src={img} alt="car" />
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Listing..." : "List your car"}
        </button>
      </form>
    </div>
  );
}

export default HostCar;
