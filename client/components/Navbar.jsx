import React from 'react';
import ProfilePic from '../assets/profilepic.png';
import { Route, Link } from 'wouter';
const Navbar = () => {

  return(
  <div id='navbar'>
    <img src={ProfilePic} alt='placeholder profile photo'/>
  </div>
  );
}