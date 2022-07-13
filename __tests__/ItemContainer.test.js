import React from 'React';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import ItemContainer from '../client/components/ItemContainer.jsx';


describe('Integration Test for Items Container', () => {
  let data =
    [{
      _id: 0,
      seller_id: 0,
      desc: 'An item made by jake',
      category: 'clothing',
      price: 100,
      file_location: 0
    },
    {
      _id: 1,
      seller_id: 1,
      desc: 'An item made by paul',
      category: 'clothing',
      price: 1000,
      file_location: 1
    },
    {
      _id: 2,
      seller_id: 2,
      desc: 'An item made by josephine',
      category: 'Misc',
      price: 10000,
      file_location: 2
    },
    {
      _id: 3,
      seller_id: 3,
      desc: 'An item made by Alexa',
      category: 'Rolex',
      price: 100000,
      file_location: 3
      }];
  
  let items;

  beforeEach(() => {
    items = render(<ItemContainer data={data} />);
  })
  
  test('Should render correct numebr of imgs, descriptions, prices, and buttons', () => {
    const imgElements = items.queryAllByRole('img');
    const btnElements = items.queryAllByRole('button', {name: 'Add to Cart'});
    const descElements = items.queryAllByText(/description:/i);
    const priceElements = items.queryAllByText(/price:/i);

    expect(imgElements.length).toBe(4);
    expect(btnElements.length).toBe(4);
    expect(descElements.length).toBe(4);
    expect(priceElements.length).toBe(4);
  })
  
})