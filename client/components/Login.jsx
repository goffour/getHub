import React, { useState, useContext } from 'react';
import { AuthContext } from '../lib/AuthProvider.jsx';
import { useLocation, Link } from 'wouter';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useLocation();
  const userContext = useContext(AuthContext);
  
  // TODO: confirm route/API call with backend team
  const checkLogin = () => {
    const userInfo = {
      username: username,
      password: password
    }
    fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(userInfo)
    })
    .then (response => response.json())
    .then (data => {
      if (data.verified) {
        userContext.setUser(data);
        setLocation('/dashboard');
      }
    })
    .catch (err => {
      alert(err);
      setLocation('/');
    })
  }


  const handleClick = () => {
    let verified = true;
    userContext.setUser({...userContext, verified, first_name: 'Paul', last_name: 'Yi'});
    return setLocation('/dashboard');
  }

  // TODO: change onclick back to checkLogin once the function works as intended
  return(
    <div id='loginContainer'>
      <input className='inputField' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)}/>
      <input className='inputField' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
      <button id='loginBtn' onClick={handleClick}>Login</button>
      <Link href='/signup'>
        <a className='link'>Don't have an account? Sign up</a>
      </Link>
    </div>
  );
}

export default Login;