import React from 'react';
import LabelText from './LabelText.jsx';
import ItemLabelContainer from './ItemLabelContainer.jsx';
import { formatter } from '../lib/currencyFormatters.js';


const StoreItem = (props) => {
  const imgString = `http://localhost:3000/${props.data.file_location}`
  return (
    <div className='item-group'>
      <img src={imgString} className='content-img'></img>
      <div className='details'>
        <ItemLabelContainer>
          <LabelText label='Description' value={props.data.description} />
          <LabelText label='Price' value={formatter.format(props.data.price)} />
        </ItemLabelContainer>
        <button
          className='btn-buy'
          onClick={() => props.setCartHistory([...props.cartHistory, props.data])}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default StoreItem