/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../components-css/Navbar.css';
import React, { useEffect, useState } from 'react';
import Tv from './Tv';
import Celular from './Celular';
import Computadora from './Computadora'; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './firebase/config';
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from './redux/slices/authSlice';
import ShowOnLogin from './HiddenLinks';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [tvImages, setTvImages] = useState(false);
  const [celularImages, setCelularImages] = useState(false);
  const [computadoraImages, setComputadoraImages] = useState(false); 
  const [displayName, setDisplayName] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    navigate("/products");
    setIsDropdownOpen(!isDropdownOpen);
    setTvImages(false);
    setCelularImages(false);
    setComputadoraImages(false); 
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
      window.alert("Sesión cerrada");
      navigate("/");
    }).catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const slice = user.email.slice(0, 4)
        setDisplayName(slice);
        dispatch(SET_ACTIVE_USER(
          {
            email: user.email,
            userName: user.displayName,
            userID: user.uid
          }
        ))

      } else {
        setDisplayName("");
        dispatch(
          REMOVE_ACTIVE_USER({
            email: null,
            userName: null,
            userID: null,
          })
        );
      }
    });
  }, [dispatch, displayName]);

  const addProducts = () => {
    setIsDropdownOpen(false);
    setTvImages(false);
    setComputadoraImages(false);
    setCelularImages(false);
    navigate("/addProd");
}

  return (
    <>
      <div className="navbar">
        <NavLink to="/">
          <h1 className="">Proyecto Final</h1>
        </NavLink>
        <ul>
          <li>
            <Link to="/" onClick={handleHomeClick}>
            <button className="nav-button">Home</button>
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
                  <NavLink
                    to="/productos/computadora"
                    onClick={handleCompClick}
                  >
                    Computadora
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <NavLink to="/cart">
            <button className="nav-button">Carrito</button>
            </NavLink>
          </li>
         
          <li>
            <NavLink to="/register">
             <button className="nav-button">Register</button>
            </NavLink>
          </li>
          <li>
           <NavLink to="/login">
            <button className="nav-button">Login</button>
           </NavLink>
          </li>
          <ShowOnLogin>
           <li>
           <button className="nav-button" onClick={Logout}>
             Log Out
            </button>
           </li>
          </ShowOnLogin>
          <ShowOnLogin>
            <li>
              <a href="#">
                <AiOutlineUser />
                Hola, {displayName}
              </a>
            </li>
          </ShowOnLogin>
          <li>
          <button onClick={addProducts}>Agregar Productos</button>
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
    </>
  );
}

export default Navbar;






