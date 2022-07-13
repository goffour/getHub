import React from 'react';
import { formatter } from '../lib/currencyFormatters.js';

const Cart = (props) => {
  const { cartHistory, setCartHistory } = props;
  const cartItems = [];
  
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
        {formatter.format(cartHistory.reduce((acc, curr) => acc + curr.price, 0))}
      </h1>
      <button id='btn-checkout'>Proceed to Checkout</button>
    </div>
  )

}

export default Cart;


