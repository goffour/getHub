import React, { useContext } from 'react';
import profilePic from '../assets/profilepic.png';
import { Route, Link } from 'wouter';
import { AuthContext } from '../lib/AuthProvider.jsx';

const Navbar = () => {
  const userContext = useContext(AuthContext); 
  
  return(
    <div id='navbar'>

      <div id='navbar-left'>
        <p id='gethub-title'>GetHub</p>
        <p className='welcome'>Welcome, {userContext.first_name}</p>
      </div>
      {/* <div id='welcome'>
      </div> */}
      <div id='profile-link'>
        <Link to='/profile'>
          <p id=''>{userContext.first_name[0]}{userContext.last_name[0]}</p>
        </Link>
      </div>

      <div>
      <Link to='/dashboard/cart'>
          <a className='link-to-cart'>Cart</a>
          {/* <img src={profilePic}/> */}
        </Link>
      </div>
  </div>
  );
}

export default Navbar;