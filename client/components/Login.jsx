import React, { useState, useContext } from 'react';
import { AuthContext } from '../lib/AuthProvider.jsx';
import { useLocation, Link, Redirect } from 'wouter';

const Login = (props) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useLocation();
  const userContext = useContext(AuthContext);
  
  // TODO: confirm route/API call with backend team
  const checkLogin = () => {
    const credentials = {
      username: username,
      password: password
    }
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({credentials})
    })
    .then (response => response.json())
    .then (data => {
      const { history } = data;
      const { isVerified, first_name, last_name, username, email, _id } = data.verified; 

      console.log('in login component, returned data', data);
      if (isVerified) {
        userContext.setUser({...userContext, isVerified, first_name, last_name, username, email, _id});
        props.setHistory(history);
        
        return setLocation('/dashboard/store');
      }
    })
    .catch (err => {
      alert(err);
      setLocation('/');
    })
  }


  const handleClick = () => {
    let isVerified = true;
    userContext.setUser({...userContext, isVerified, first_name: 'Paul', last_name: 'Yi'});
    return setLocation('/dashboard/store');
  }

  // TODO: change onclick back to checkLogin once the function works as intended
  return(
    <div id="login">
    <div id='loginContainer'>
      <input className='inputField' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)}/>
      <input className='inputField' type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
      <button id='loginBtn' onClick={checkLogin}>Login</button>
      <span>Don't have an account? <a className='link' onClick={() => setLocation('/signup')}>Sign up</a></span>
    </div>
    </div>

  );
}

export default Login;