import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='link'>
        <Link to="/login">Login</Link>
      </div>
      <div className='link'>
        <Link to="/">Home</Link>
      </div>
      <div className='link'>
        <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

export default Navbar
