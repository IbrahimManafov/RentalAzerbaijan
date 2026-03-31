import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/CarCardTwo.css";

function CarCardTwo() {
  const navigate = useNavigate();

  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);
  const sliderRef3 = useRef(null);
  const sliderRef4 = useRef(null);

  const scrollLeft = (ref) => ref.current.scrollBy({ left: -320, behavior: "smooth" });
  const scrollRight = (ref) => ref.current.scrollBy({ left: 320, behavior: "smooth" });

  const cars = [
    { name: "Land Rover Range Rover", year: 2018, rating: 5.0, reviews: 61, price: 420, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/qZN4oIFjQuKk0KSbDNnQnw.291x194.jpg" },
    { name: "Mitsubishi Outlander", year: 2015, rating: 4.95, reviews: 28, price: 136, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/2Hrb0jfIQoa1BoNS_HiGgg.291x194.jpg" },
    { name: "BMW X3", year: 2018, rating: 5.0, reviews: 85, price: 193, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/OrlE3UDzSVqUsVjNtVSV1A.291x194.jpg" },
    { name: "Kia Niro", year: 2020, rating: 5.0, reviews: 53, price: 151, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/kmgfqEtjQBuAel6qsCamWQ.291x194.jpg" },
    { name: "Tesla Model 3", year: 2023, rating: 4.85, reviews: 43, price: 194, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/mpSMPFlnSfSW0Oe28hAiwA.291x194.jpg" },
    { name: "Suzuki S-Cross", year: 2023, rating: 5.0, reviews: 10, price: 155, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/5dkKuF4KT_Kopfwg5XBYlQ.291x194.heic" },
    { name: "Mercedes-Benz CLA", year: 2021, rating: 5.0, reviews: 49, price: 146, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/hXG1X3mnS5idoeU9VruE5A.291x194.heic" },
    { name: "MINI Cooper", year: 2018, rating: 5.0, reviews: 5, price: 146, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/YnbhUkjeTSSORRmXG5issQ.291x194.heic" },
    { name: "BMW 1 Series", year: 2017, rating: 4.88, reviews: 274, price: 146, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/Jop4FP0vQnikY9Dn18uEdg.291x194.jpg" },
    { name: "Audi Q2", year: 2017, rating: 4.88, reviews: 274, price: 146, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/QEggh2xnSLqCjNH01KvqaQ.291x194.jpg" },
     { name: "Land Rover Range Rover", year: 2018, rating: 5.0, reviews: 61, price: 420, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/qZN4oIFjQuKk0KSbDNnQnw.291x194.jpg" },
    { name: "Mitsubishi Outlander", year: 2015, rating: 4.95, reviews: 28, price: 136, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/2Hrb0jfIQoa1BoNS_HiGgg.291x194.jpg" },
    { name: "BMW X3", year: 2018, rating: 5.0, reviews: 85, price: 193, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/OrlE3UDzSVqUsVjNtVSV1A.291x194.jpg" },
    { name: "Kia Niro", year: 2020, rating: 5.0, reviews: 53, price: 151, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/kmgfqEtjQBuAel6qsCamWQ.291x194.jpg" },
    { name: "Tesla Model 3", year: 2023, rating: 4.85, reviews: 43, price: 194, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/mpSMPFlnSfSW0Oe28hAiwA.291x194.jpg" },
    { name: "Suzuki S-Cross", year: 2023, rating: 5.0, reviews: 10, price: 155, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/5dkKuF4KT_Kopfwg5XBYlQ.291x194.heic" },
    { name: "Mercedes-Benz CLA", year: 2021, rating: 5.0, reviews: 49, price: 146, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/hXG1X3mnS5idoeU9VruE5A.291x194.heic" },
    { name: "MINI Cooper", year: 2018, rating: 5.0, reviews: 5, price: 146, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/YnbhUkjeTSSORRmXG5issQ.291x194.heic" },
    { name: "BMW 1 Series", year: 2017, rating: 4.88, reviews: 274, price: 146, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/Jop4FP0vQnikY9Dn18uEdg.291x194.jpg" },
    { name: "Audi Q2", year: 2017, rating: 4.88, reviews: 274, price: 146, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/QEggh2xnSLqCjNH01KvqaQ.291x194.jpg" }, { name: "Land Rover Range Rover", year: 2018, rating: 5.0, reviews: 61, price: 420, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/qZN4oIFjQuKk0KSbDNnQnw.291x194.jpg" },
    { name: "Mitsubishi Outlander", year: 2015, rating: 4.95, reviews: 28, price: 136, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/2Hrb0jfIQoa1BoNS_HiGgg.291x194.jpg" },
    { name: "BMW X3", year: 2018, rating: 5.0, reviews: 85, price: 193, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/OrlE3UDzSVqUsVjNtVSV1A.291x194.jpg" },
    { name: "Kia Niro", year: 2020, rating: 5.0, reviews: 53, price: 151, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/kmgfqEtjQBuAel6qsCamWQ.291x194.jpg" },
    { name: "Tesla Model 3", year: 2023, rating: 4.85, reviews: 43, price: 194, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/mpSMPFlnSfSW0Oe28hAiwA.291x194.jpg" },
    { name: "Suzuki S-Cross", year: 2023, rating: 5.0, reviews: 10, price: 155, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/5dkKuF4KT_Kopfwg5XBYlQ.291x194.heic" },
    { name: "Mercedes-Benz CLA", year: 2021, rating: 5.0, reviews: 49, price: 146, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/hXG1X3mnS5idoeU9VruE5A.291x194.heic" },
    { name: "MINI Cooper", year: 2018, rating: 5.0, reviews: 5, price: 146, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/YnbhUkjeTSSORRmXG5issQ.291x194.heic" },
    { name: "BMW 1 Series", year: 2017, rating: 4.88, reviews: 274, price: 146, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/Jop4FP0vQnikY9Dn18uEdg.291x194.jpg" },
    { name: "Audi Q2", year: 2017, rating: 4.88, reviews: 274, price: 146, duration: "3 days", img: "https://images.turo.com/media/vehicle/images/QEggh2xnSLqCjNH01KvqaQ.291x194.jpg" },
  ];

  // Randomly shuffle cars
  const shuffledCars = cars

  // Split into 4 sliders (bərabər yoxsa qalanlar son sliderdə)
  const chunkSize = Math.ceil(shuffledCars.length / 4);
  const slidersData = [];
  for (let i = 0; i < 4; i++) {
    slidersData.push(shuffledCars.slice(i * chunkSize, (i + 1) * chunkSize));
  }

  const sliders = [
    { data: slidersData[0], ref: sliderRef1 },
    { data: slidersData[1], ref: sliderRef2 },
    { data: slidersData[2], ref: sliderRef3 },
    { data: slidersData[3], ref: sliderRef4 },
  ];

  const handleCarClick = (car) => {
    navigate(`/car/${car.id}`, { state: { car } });
  };

  return (
    <div className="pages">
      {sliders.map((slider, i) => (
        <div className="cardtwo" key={i}>
          <div className="sidebtn">
            <h1>SUV rental at Manchester (MAN) airport</h1>
            <div className="buttons">
              <button onClick={() => scrollLeft(slider.ref)}>&lt;</button>
              <button onClick={() => scrollRight(slider.ref)}>&gt;</button>
            </div>
          </div>
          <div className="car" ref={slider.ref}>
            {slider.data.map((car) => (
              <div
                className="box"
                key={car.id}
                onClick={() => handleCarClick(car)}
                style={{ cursor: "pointer" }}
              >
                <img src={car.img} alt={car.name} />
                <h1>{car.name}</h1>
                <p>
                  {car.year} {car.rating} ★ ({car.reviews})
                </p>
                <h2>£{car.price} for {car.duration}</h2>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CarCardTwo;