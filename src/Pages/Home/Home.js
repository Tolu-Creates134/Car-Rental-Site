import React from 'react'
import { Link}  from 'react-router-dom'
import './Home.css'


export const Home = () => {


  return (
    <div className='home'>

      <div className='hero'>

        <div className='text'>
          <h1>Find your new car today</h1>
        </div>

        <div className='buttons'>
          <button className='btn'>FIND OUT MORE</button>
          <Link  to='/cars'>
          <button className='btn' type='button'>SHOP NOW</button>
          </Link>
        </div>

      </div>

      <div id='about' className='about' textAlign='center' gutterbottom >
        <h1> ABOUT</h1>
        <p>
          Welcome to CarDeals , where you'll always find amazing deals on our 200 quality used cars,
          including 4x4s, SUVs, prestige vehicles and high-spec models. Come to our impressive undercover
          dealership and explore our range of desirable used cars now!
        </p>
      
      </div>

      <div className='car-picture'>

      </div>

      
        





        









    </div>
  )
}
