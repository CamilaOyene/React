import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import React from 'react';
import Products from './components/Products';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />{" "}
        {/* Ruta diferente para Cart */}
        <Route path="/" element={<Products />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
