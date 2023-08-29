/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../components-css/Navbar.css';
import React, { useState } from 'react';
import Tv from './Tv';
import Celular from './Celular';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [tvImages, setTvImages] = useState([]);
  const [celularImages, setCelularImages] = useState([]);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setTvImages(false);
    setCelularImages(false);
  };

  const handleTvClick = () => {
    setTvImages(true);
    setIsDropdownOpen(false);
    setCelularImages(false);
  };

  const handleCelClick = () => {
    setCelularImages(true);
    setIsDropdownOpen(false);
    setTvImages(false);
  };

  return (
    <>
      <div className="navbar">
        <NavLink to="/">
          <h1 className="">Pre Entrega 2</h1>
        </NavLink>
        <ul>
          <li>
            <Link
              to="/"
              onClick={() => {
                setIsDropdownOpen(false);
                setTvImages(false);
                setCelularImages(false);
              }}
            >
              Home
            </Link>
          </li>
          <li className="dropdown">
            <a href="#" onClick={toggleDropdown}>
              Productos
            </a>
            {isDropdownOpen && (
              <ul className="dropdown-content">
                <li>
                  <NavLink to="/productos/celular" onClick={handleCelClick}>
                    Celular
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/productos/television" onClick={handleTvClick}>
                    Televisión
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/productos/computadora">Computadora</NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <NavLink to="/cart">Carrito</NavLink>
          </li>
        </ul>
      </div>
      <div className="">
        {/* Renderiza la vista de TV solo si se hizo clic en el enlace "Televisión" */}
        {tvImages && (
          <div className="tv-images">
            <Tv />
          </div>
        )}
        {/* Renderiza la vista de Celular solo si se hizo clic en el enlace "Celular" */}
        {celularImages && (
          <div className="celular-images">
            <Celular />
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;