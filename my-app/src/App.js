import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import React from 'react';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ResetPassword from './components/Auth/ResetPassword';
import AddProducts from './components/AddProducts'
import Footer from './components/Footer';


function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        {/* Ruta diferente para Cart */}
        <Route path="/products" element={<Products />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/addProd" element={<AddProducts />} />
      </Routes>
      <Footer/>
    </HashRouter>
  );
}

export default App;
