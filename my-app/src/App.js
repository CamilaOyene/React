import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Cart from './Cart';
import React from 'react';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} /> {/* Ruta diferente para Cart */}
      </Routes>
    </HashRouter>
  );
}

export default App;
