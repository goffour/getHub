import React, { useContext, useState } from 'react';
import Navbar from './Navbar.jsx';
import ItemContainer from './ItemContainer.jsx';

const Shop = (props) => {
  return (
    <div id='shop'>
      <Navbar></Navbar>
      {props.children}
    </div>
  );
}

export default Shop;