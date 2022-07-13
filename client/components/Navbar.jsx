import React, { useContext } from 'react';
import profilePic from '../assets/profilepic.png';
import { Route, Link } from 'wouter';
import { AuthContext } from '../lib/AuthProvider.jsx';

const Navbar = () => {
  const userContext = useContext(AuthContext); 
  
  return(
    <div id='navbar'>
      <h2>Welcome, {userContext.first_name}</h2>
      <Link to='/profile'>
        <p id=''>{userContext.first_name[0]}{userContext.last_name[0]}</p>
      </Link>

      <Link to='/dashboard/cart'>
        <a>Cart</a>
        {/* <img src={profilePic}/> */}
      </Link>
  </div>
  );
}

export default Navbar;