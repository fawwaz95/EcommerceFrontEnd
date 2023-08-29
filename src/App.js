import { useState } from 'react';

import './App.css';
import Homepage from './components/Homepage.js';
import Shop from './components/Shop.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Header from './components/Header';
import Insperations from './components/Insperations';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Router>
        <HeaderWrapper></HeaderWrapper>
        <Routes>
          <Route path="/Home" element={<Homepage />} />
          <Route path="/Shop" element={<Shop />} />
          {/*<Route path="/Product" element={<Product />} />*/}
          <Route path="/Product/:prodId" element={<Product />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Insperations" element={<Insperations />} />
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