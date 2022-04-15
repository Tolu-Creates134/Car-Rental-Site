import React, {useRef} from 'react'
import { Link, useLocation } from 'react-router-dom'
import {IconButton, Badge} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Header.css'
import MenuIcon from '@mui/icons-material/Menu';
import { FaTimes } from 'react-icons/fa' 


export const Header = ({cart}) => {

  const navRef = useRef()
  const location = useLocation();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav')
  }

  return (
    
    <div className='header'>

      <div className='title'>
        CAR<span>DEALS</span>
      </div>

        
      <nav ref={navRef}>
        <Link to='/'>HOME</Link>
        <a href='#services'>SERVICES</a>
        <a href='#about'>ABOUT</a>
        <Link to='/cars'>CARS</Link>
        <button onClick={showNavbar} className='nav-btn nav-close-btn'><FaTimes/></button>
      </nav>
        

      <button className='nav-btn' onClick={showNavbar}>
        <MenuIcon/>
      </button>
   
      {location.pathname !== '/cart' && (
      <div className='cart-button'>
        <IconButton>
          <Link to='/cart'>
            <Badge badgeContent={cart.total_items} className='cart-icon'>
              <ShoppingCartIcon />
            </Badge> 
          </Link>
        </IconButton>
      </div>

      )}

    </div>
    
  )
}




