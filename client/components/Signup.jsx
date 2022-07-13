import React, {useState} from 'react';
import { Link } from 'wouter';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkSignup = () => {
    const credentials = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: username,
      password: password
    };
    fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({credentials})
    })
    .then (response => response.json())
    .then (data => {
      if (data.verified) {
        setLocation('/');
      }
    })
    .catch (err => {
      alert(err);
      setLocation('/signup');
    })
  }
  return (
    <div id="signup">
    <div id='signupContainer'>
      <input className='inputField' placeholder='First name' value={firstName} onChange={e=>setFirstName(e.target.value)} />
      <input className='inputField' placeholder='Last name' value={lastName} onChange={e=>setLastName(e.target.value)} />
      <input className='inputField' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
      <input className='inputField' placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)} />
      <input className='inputField' placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} />
      <button id="signupBtn" onClick={checkSignup}>Sign up</button>
      <span>Already have an account? <Link href='/'>
         <a className='link'>Log in</a>
      </Link></span>
      

    </div>
    </div>

  )
}

export default Signup;