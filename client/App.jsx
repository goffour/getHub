import React, { useState } from 'react';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
// TODO: make dashboard component
import ItemContainer from './components/ItemContainer.jsx';
// -------------------------
import { Route, Switch } from 'wouter';
import { AuthProvider, ProtectedRoute } from './lib/AuthProvider.jsx';
import Shop from '../client/components/Shop.jsx';
import Cart from '../client/Components/Cart.jsx';
import Profile from '../client/Components/Profile.jsx';

import '../client/css/index.css';
import '../client/css/shop.css';
import '../client/css/login.css';
import '../client/css/signup.css';
import '../client/css/navbar.css';
import '../client/css/cart.css';

const App = (props) => {

  const [store, setStore] = useState([]);
  const [history, setHistory] = useState([]); 
  const [cartHistory, setCartHistory] = useState([]);
  console.log('updated cart histroy', cartHistory)
  console.log('updated Store', store);
  return (
    <AuthProvider>
      <Route path='/'>
        <Login setHistory={setHistory} />
      </Route>

      <Route path='/signup'>
        <Signup />
      </Route>

      <Route path='/dashboard/:endpoint'>
        {(params) => {
          let component;
          switch (params.endpoint) {
            case 'profile':
              component = <Profile />;
              break;
            case 'cart':
              component = <Cart cartHistory={cartHistory} setCartHistory={setCartHistory} />;
              break;
            case 'store':
              component = <ItemContainer data={store} setCartHistory={setCartHistory} cartHistory={cartHistory} />;
              break;
          };
          return (
          <ProtectedRoute>
            <Shop setStore ={setStore}>
              {component}
            </Shop>
          </ProtectedRoute> 
          )
        }}
      </Route>
    </AuthProvider>
  )
}


export default App;