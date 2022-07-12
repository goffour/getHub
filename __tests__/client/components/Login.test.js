import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '../../../client/components/Login';

describe('Unit testing Login component', () => {
  beforeEach(() => {
    render(<Login/>);
  });
  
  it('should render username and password input fields', () => {
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should update the input fields when the user types', async () => {
    const user = userEvent.setup();
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    expect(usernameInput.value).toBe('');
    expect(passwordInput.value).toBe('');
 
    await user.type(usernameInput,'testuser');
    await user.type(passwordInput,'testpw');

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpw');
  });

  it('should have a button to sign up', () => {
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
})