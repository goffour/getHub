import React from 'React';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import StoreItem from '../client/components/StoreItem.jsx';


describe('Unit testing for store item', () => {
  let item
  const props = {
    _id: 0,
    seller_id: 0,
    desc: 'An item made by jake',
    category: 'clothing',
    price: 100,
    file_location: 0
  };
  
  beforeEach(() => {
    item = render(<StoreItem data={...props} />);
  })

  test('Item should render the appropriate elements', () => {
    const imgElement = item.getByRole('img');
    const btnElement = item.getByRole('button', {name: 'Buy'});
    const descElement = item.getByText(/description:/i);
    const priceElement = item.getByText(/price:/i);

    expect(imgElement).toBeInTheDocument()
    expect(btnElement).toBeInTheDocument()
    expect(descElement).toBeInTheDocument()
    expect(priceElement).toBeInTheDocument()
  })

  test('Price should reflect USD currency format', () => {
    const priceElement = item.getByText(/price:/i);
    expect(priceElement.nextSibling).toHaveTextContent(/\$\d+/g)
  })
  

})
