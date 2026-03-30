import React from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Rented from './Components/Rented'
import RentedBTN from './Components/RentedBTN'
import CarCardTwo from './Components/CarCardTwo'
import CarCardThere from './Components/CarCardThere'
import NavHref from './Pages/NavHref'
import CarCardFour from './Components/CarCardFour'
import CardCardSix from './Components/CardCardSix'
import Footer from './Components/Footer'

function App() {
  return (
    <div className="container">
      <Navbar />
      <NavHref />
      <Rented />
      <RentedBTN />
      <CarCardTwo />
      <CarCardThere />
      <CarCardFour/>
      <CardCardSix/>
      <Footer/>
    </div>
  )
}

export default App