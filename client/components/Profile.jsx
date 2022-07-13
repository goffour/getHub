import React, { useContext } from 'react';
import { AuthContext } from '../lib/AuthProvider.jsx';
const Profile = () => {
  const userContext = useContext(AuthContext);
  const { first_name, last_name, email,} = userContext;
  return(
    <div id='profileContainer'>
      <h1>{first_name} {last_name}'s Profile</h1>
      <h2>Email: {email}</h2>
      <h2>Username: {username}</h2>
      <h2>Password: *******</h2>
    </div>
  )

};

export default Profile;