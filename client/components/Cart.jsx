import React, { useContext } from 'react';
import { useLocation } from 'wouter';
import { formatter } from '../lib/currencyFormatters.js';
import { AuthContext } from '../lib/AuthProvider.jsx';

const Cart = (props) => {
  // Cart history all of the data on items in an array of obj. 
  const { cartHistory, setCartHistory } = props;
  const [location, setLocation] = useLocation();
  // user Id and information
  const user = useContext(AuthContext); 
  const cartItems = [];
  const totalCost = cartHistory.reduce((acc, curr) => acc + curr.price, 0);

  
    const buyItems = () => {
      fetch('http://localhost:3000/products/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify({order: {
          products: cartHistory.map(el => el._id),
          buyer_id: user._id,
          cost: totalCost,
          date: new Date(),
        }})
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          return; 
        })
        .catch(err => {
          console.log(err.message);
        })
    }
  
  const removeFromCart = (id) => {
    let sliceIdx = 0;
    for (let i = 0; i < cartHistory.length; i++) {
      if (cartHistory[i]._id === id) {
        sliceIdx = i;
        break;
      }
    }
    setCartHistory([].concat(cartHistory.slice(0,sliceIdx), cartHistory.slice(sliceIdx + 1)));
    // setCartHistory(cartHistory.slice(sliceIdx + 1,sliceIdx));
    return;
  }

  cartHistory.forEach(item => {
    cartItems.push(
    <div className='cartListContainer'>
      <div className='itemText'>
        <p>{item.desc}</p>
        <p>{formatter.format(item.price)}</p>
      </div>
      <button className='btn-delete' id={item._id} onClick={() => removeFromCart(item._id)}>Remove</button>
    </div>);
  });

  return(
    <div id='cartContainer'>
      {cartItems}
      <h1>
        Total Purchase Amount:
        {formatter.format(totalCost)}
      </h1>
      <button id='btn-checkout' onClick={buyItems}>Proceed to Checkout</button>
      <a className='link' onClick={() => setLocation('/dashboard/store')}>Keep shopping</a>
    </div>
  )

}

export default Cart;


