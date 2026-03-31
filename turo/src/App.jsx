import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

// Pages
import NavHref from './Pages/NavHref';
import Rented from './Components/Rented';
import RentedBTN from './Components/RentedBTN';
import CarCardTwo from './Components/CarCardTwo';
import CarDetail from './Components/CarDetail';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <NavHref />
        <Routes>
          {/* Əsas səhifə */}
          <Route path="/" element={
            <>
              <Rented />
              <RentedBTN />
              <CarCardTwo />
            </>
          } />
          {/* Fərdi avtomobil səhifəsi */}
          <Route path="/car/:id" element={<CarDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;