import React from 'react'
import '../Style/RentedBTN.css'
function RentedBTN() {
  return (
    <div className="rented">
      <button><a href="#"><i class="fa-solid fa-car"></i></a>All</button>
      <button><a href="#"><i class="fa-solid fa-plane-departure"></i></a>Airports</button>
      <button><a href="#"><i class="fa-solid fa-calendar"></i></a>Monthly</button>
      <button><a href="#"><i class="fa-solid fa-location-dot"></i></a>Nearby</button>
      <button><a href="#"><i class="fa-solid fa-location-arrow"></i></a>Delivered</button>
      <button><a href="#"><i class="fa-solid fa-chart-bar"></i></a>Cities</button>

    </div>
  )
}

export default RentedBTN