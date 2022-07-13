import React, { useContext, useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import ItemContainer from './ItemContainer.jsx';

const Shop = (props) => {

  useEffect(() => {
    fetch('products/products')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        props.setStore([...props.store, ...data]);
      })
      .catch(err => console.log(err.message))
  }, []);

  return (
    <div id='shop'>
      <Navbar></Navbar>
      {props.children}
    </div>
  );
}

export default Shop;