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
const dummyData = [
  {
    _id: 0,
    seller_id: 0,
    desc: 'An item made by jake',
    category: 'clothing',
    price: 100,
    file_location: 0
  },
  {
    _id: 1,
    seller_id: 1,
    desc: 'An item made by paul',
    category: 'clothing',
    price: 1000,
    file_location: 1
  },
  {
    _id: 2,
    seller_id: 2,
    desc: 'An item made by josephine',
    category: 'Misc',
    price: 10000,
    file_location: 2
  },
  {
    _id: 3,
    seller_id: 3,
    desc: 'An item made by Alexa',
    category: 'Rolex',
    price: 100000,
    file_location: 3
  }
];


const App = (props) => {

  const [store, setStore] = useState(dummyData);
  const [history, setHistory] = useState([]); 
  const [cartHistory, setCartHistory] = useState([]);
  console.log('updated cart histroy', cartHistory)
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
              break
          };
          return (
          <ProtectedRoute>
            <Shop>
              {component}
            </Shop>
          </ProtectedRoute>)
        }}
      </Route>
    </AuthProvider>
  )
}


export default App;