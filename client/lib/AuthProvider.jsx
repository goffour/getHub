import React, { useContext, useState } from 'react';
import { useLocation } from 'wouter';
const defaultContext = {
  verified: false,
  first_name: '',
  last_name: '',
  user_name: '',
  email: '',
  address: '',
  zipcode: '',
  _id: '', 
}

export const AuthContext = React.createContext(null); // returns a context object to be passed to useContext Hook 
/*
import AuthContext
data
import useContext
const context = useContext(AuthContext); -> 
context.setUser({...context, verifed: true})
*/

export const AuthProvider = (props) => {
  const [user, setUser] = useState(defaultContext);
  return (
    <AuthContext.Provider value={{ ...user, setUser }} >
      {props.children}
    </AuthContext.Provider>)
}

export const ProtectedRoute = (props) => {
  const [location, setLocation] = useLocation();
  const authContext = useContext(AuthContext);

  if (!authContext.verified) {
    return setLocation('/');
  }

  return (
    <>
      { props.children }
    </>
  );
}