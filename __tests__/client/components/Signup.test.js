import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Signup from '../../../client/components/Signup';

describe('Unit testing Signup component', () => {
  beforeEach(() => {
    render(<Signup/>);
  });
  
  it('should render first name, last name, email, username, and password input fields', () => {
    expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should update the input fields when the user types', async () => {
    const user = userEvent.setup();
    const firstNameInput = screen.getByPlaceholderText('First name');
    const lastNameInput = screen.getByPlaceholderText('Last name');
    const emailInput = screen.getByPlaceholderText('Email');
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    expect(firstNameInput.value).toBe('');
    expect(lastNameInput.value).toBe('');    
    expect(emailInput.value).toBe('');
    expect(usernameInput.value).toBe('');
    expect(passwordInput.value).toBe('');


    await user.type(firstNameInput,'test');   
    await user.type(lastNameInput,'test');    
    await user.type(emailInput,'test@test.com');   
    await user.type(usernameInput,'testuser');
    await user.type(passwordInput,'testpw');

    expect(firstNameInput.value).toBe('test');
    expect(lastNameInput.value).toBe('test');
    expect(emailInput.value).toBe('test@test.com');    
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpw');
  });
  
  it('should have a link to go back to the login screen', () => {
    expect(screen.getByText('Already have an account? Log in')).toBeInTheDocument();
  });

  it('should have a button to sign up', () => {
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });
})