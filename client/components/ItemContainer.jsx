import React from 'react';
import StoreItem from './StoreItem.jsx';


// Expected input is an array of item data reflecting the items dex, price, and an img
// at the very least. 

const ItemContainer = (props) => {
  return (
    <div className='item-container'>
      {props.data.map(item =>
        <StoreItem
          data={item}
          setCartHistory={props.setCartHistory}
          cartHistory={props.cartHistory}
        />
      )}
    </div>
  )
}

export default ItemContainer
