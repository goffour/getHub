import React from 'react';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
// TODO: make dashboard component
import ItemContainer from './components/ItemContainer.jsx';
// -------------------------
import { Route } from 'wouter';
import { AuthProvider, ProtectedRoute } from './lib/AuthProvider.jsx';
import Shop from '../client/components/Shop.jsx'
  
const App = (props) => {
  const dummyData = [{
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
    }];
  
  
  return (
    <AuthProvider>
      <Route path='/' component={Login}/>
      <Route path='/signup' component={Signup} />
      <Route path='/dashboard'>
        <ProtectedRoute>
          <Shop>
            <ItemContainer data ={dummyData} />
          </Shop>
        </ProtectedRoute>
      </Route>
    </AuthProvider>
  )
}


export default App;