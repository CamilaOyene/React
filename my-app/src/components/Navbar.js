import { NavLink } from 'react-router-dom';
import '../components-css/Navbar.css';
import React, { useState } from 'react';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar">
      <h1>Pre Entrega 1</h1>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
          <a href="#" onClick={toggleDropdown}>
            Productos
          </a>
          <ul className="dropdown-content">
            <li>
              <NavLink to="/productos/celular">Celular</NavLink>
            </li>
            <li>
              <NavLink to="/productos/television">Televisión</NavLink>
            </li>
            <li>
              <NavLink to="/productos/computadora">Computadora</NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink to="/cart">
            Carrito
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;