import React, { useContext, useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import ItemContainer from './ItemContainer.jsx';

const Shop = (props) => {

  useEffect(() => {
    fetch('http://localhost:3000/products/products')
      .then(res => res.json())
      .then(data => {
        console.log('data retured', data);
        props.setStore(data.products.map(el => Object.assign({}, el, {price: Number(el.price)})));
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