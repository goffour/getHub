import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Navbar from '../../../client/components/Navbar';

describe('Unit testing for Navbar', () => {
  beforeEach(() => {
    render(<Navbar/>);
  });

  it('should render a navbar div', () => {

  });

})

// Profile button, display cart button