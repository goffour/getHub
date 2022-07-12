import React from 'react';

const LabelText = (props) => {
  return (
    <p className='label-text'>
      <strong>{ `${props.label}: `}</strong>
      {props.value}
    </p>
  )
}

export default LabelText;