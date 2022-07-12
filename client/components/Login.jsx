import React, { useState } from 'react';
import { useLocation } from 'wouter';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useLocation();
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
        setLocation('/dashboard');
      }
    })
    .catch (err => {
      alert(err);
      setLocation('/');
    })
  }
  return(
    <div id='loginContainer'>
      <input className='inputField' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)}/>
      <input className='inputField' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
      <button onClick={checkLogin}>Login</button>
    </div>
  );
}

export default Login;