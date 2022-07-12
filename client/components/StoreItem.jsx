import React from 'react';
import LabelText from './LabelText.jsx';
import ItemLabelContainer from './ItemLabelContainer.jsx';

// Formatting fro currnecy is currently in en-us. Could consider checkcing 
// the actuall settings for the browser.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

const StoreItem = (props) => {
  return (
    <div className='item-group'>
      <img src={props.file_location} className='content-img'></img>
      <div className='details'>
        <ItemLabelContainer>
          <LabelText label='Description' value={props.desc} />
          <LabelText label='Price' value={formatter.format(props.price)} />
        </ItemLabelContainer>
        <button className='btn-buy'>Buy</button>
      </div>
    </div>
  )
}

export default StoreItem