import { useState } from 'react';

import './App.css';
import Header from './components/Header';
import Homepage from './components/Homepage.js';
import LookBook from './components/LookBook';
import Insperations from './components/Insperations';
import Shop from './components/Shop.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function App() {

  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };


  return (
    <div>
      <Router>
        <HeaderWrapper></HeaderWrapper>
        <Routes>
          <Route path="/" component={<Homepage />} />
          <Route path="/Home" element={<Homepage />} />
          <Route path="/LookBook" element={<LookBook />} />
          <Route path="/Insperations" element={<Insperations />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Product/:prodId" element={<Product />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </Router>

    </div>
  );
}

function HeaderWrapper() {
  const location = useLocation();
  const hideHeader = location.pathname === '/Home';

  if (hideHeader) {
    return null; // Hide the header on the /Home route
  }

  return <Header />;
}