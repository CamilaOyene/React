/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../components-css/Navbar.css';
import React, { useState } from 'react';
import Tv from './Tv';
import Celular from './Celular';
import Computadora from './Computadora'; // Importa el componente Computadora
import Register from './Auth/Register';
import Login from './Auth/Login';
import { signOut } from "firebase/auth";
import { auth } from './firebase/config';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Cambiado a false para que el menú no esté abierto inicialmente
  const [tvImages, setTvImages] = useState(false);
  const [celularImages, setCelularImages] = useState(false);
  const [computadoraImages, setComputadoraImages] = useState(false); // Nuevo estado para el componente Computadora
  
 const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setTvImages(false);
    setCelularImages(false);
    setComputadoraImages(false); // Asegúrate de restablecer el estado de la Computadora al cerrar el menú
  };

  const handleTvClick = () => {
    setTvImages(true);
    setIsDropdownOpen(false);
    setCelularImages(false);
    setComputadoraImages(false);
  };

  const handleCelClick = () => {
    setCelularImages(true);
    setIsDropdownOpen(false);
    setTvImages(false);
    setComputadoraImages(false);
  };

  const handleCompClick = () => {
    setComputadoraImages(true);
    setIsDropdownOpen(false);
    setTvImages(false);
    setCelularImages(false);
  };

  const handleHomeClick = () => {
    setIsDropdownOpen(false);
    setTvImages(false);
    setCelularImages(false);
    setComputadoraImages(false);
  };

  const Logout = () => {
    signOut(auth).then(() => {
    window.alert("sesion cerrada")
    navigate("/")
    }).catch((error) => {
    });
    
  };

  return (
    <>
      <div className="navbar">
        <NavLink to="/">
          <h1 className="">Pre Entrega 2</h1>
        </NavLink>
        <ul>
          <li>
            <Link to="/" onClick={handleHomeClick}>
              Home
            </Link>
          </li>
          <li className="dropdown">
            <button onClick={toggleDropdown}>Productos</button>
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
                  <NavLink to="/productos/computadora" onClick={handleCompClick}>
                    Computadora
                  </NavLink>
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
        {/* Renderiza la vista de Computadora solo si se hizo clic en el enlace "Computadora" */}
        {computadoraImages && (
          <div className="computadora-images">
            <Computadora />
          </div>
        )}
      </div>
      <NavLink to="/register"><button> Register </button> </NavLink>
      <NavLink to="/login"><button> Login </button> </NavLink>
      <button onClick={Logout}> Log Out </button> 
    </>
  );
}


export default Navbar;