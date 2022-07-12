import React from 'React';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import LabelText from '../client/components/LabelText.jsx'


describe('Unit testing for store item', () => {
  let text
  const props = {
    label: 'Description',
    value: 'An item made by Jake.'
  };
  
  beforeEach(() => {
    text = render(<LabelText {...props} />);
  })

  test('Description should render the appropriate text', () => {
    expect(text.getByText(/description:/i).nextSibling).toHaveTextContent(props.value);
    expect(text.getByText(/description:/i)).toHaveStyle('font-weight: bold');
  })

  // Please see integration test for price formating testing. 
})
