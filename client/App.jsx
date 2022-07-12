import React from 'react';
import StoreItem from './components/StoreItem.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
// import Shop from './components/Shop.jsx';
import { Route, Link } from 'wouter';

const App = (props) => {
  return (
    <div>
      <Route path='/' component={Login}/>
      <Route path='/signup' component={Signup}/>
      {/* <Route path='/shop' component={Shop}/> */}
    </div>
  )
}


export default App;