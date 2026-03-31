import React from "react";
import { useLocation, useParams } from "react-router-dom";

function CarDetail() {
  const { state } = useLocation();
  const { id } = useParams();

  const car = state?.car;

  if (!car) {
    return <p>Car information not found for id: {id}</p>;
  }

  return (
    <div className="car-detail-container">
      <h1>{car.name}</h1>
      <img src={car.img} alt={car.name} className="car-detail-img" />
      <div className="car-detail-info">
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Rating:</strong> {car.rating} ★ ({car.reviews} reviews)</p>
        <p><strong>Price:</strong> £{car.price} for {car.duration}</p>
      </div>
    </div>
  );
}

export default CarDetail;