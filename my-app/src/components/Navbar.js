/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink, useNavigate } from 'react-router-dom';
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
import Search from './Search';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [tvImages, setTvImages] = useState(false);
  const [celularImages, setCelularImages] = useState(false);
  const [computadoraImages, setComputadoraImages] = useState(false); 
  const [displayName, setDisplayName] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
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
    navigate("/productos/television")
  };

  const handleCelClick = () => {
    setCelularImages(true);
    setIsDropdownOpen(false);
    setTvImages(false);
    setComputadoraImages(false);
    navigate("/productos/celular")
  };

  const handleCompClick = () => {
    setComputadoraImages(true);
    setIsDropdownOpen(false);
    setTvImages(false);
    setCelularImages(false);
    navigate("/productos/computadora");
  };

  const handleHomeClick = () => {
    setIsDropdownOpen(false);
    setTvImages(false);
    setCelularImages(false);
    setComputadoraImages(false);
    navigate("/");
  };

    const handleCarrito = () => {
      setIsDropdownOpen(false);
      setTvImages(false);
      setCelularImages(false);
      setComputadoraImages(false);
      navigate("/cart");
  };
  
     const handleRegister = () => {
       setIsDropdownOpen(false);
       setTvImages(false);
       setCelularImages(false);
       setComputadoraImages(false);
       navigate("/register");
  };

    const handleLogin = () => {
      setIsDropdownOpen(false);
      setTvImages(false);
      setCelularImages(false);
      setComputadoraImages(false);
      navigate("/login")
    };

    const handleSearch = (searchTerm) => {
      // Aquí puedes implementar la lógica de búsqueda
      console.log(`Buscando productos con el término: ${searchTerm}`);
      // Puedes navegar a una página de resultados de búsqueda o realizar una búsqueda en la base de datos aquí.
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
         {/* Agrega el componente Search */}
         <Search onSearch={handleSearch} />
        <ul>
          <li>
            <a onClick={handleHomeClick}>
              <button className="nav-button">Home</button>
            </a>
          </li>
          <li
            className="dropdown"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <button>Productos</button>
            {isDropdownOpen && (
              <ul className="dropdown-content">
                <li>
                  <a onClick={handleCelClick}>
                    Celular
                  </a>
                </li>
                <li>
                  <a  onClick={handleTvClick}>
                    Televisión
                  </a>
                </li>
                <li>
                  <a
                    onClick={handleCompClick}
                  >
                    Computadora
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a>
              <button className="nav-button" onClick={handleCarrito}>
                Carrito
              </button>
            </a>
          </li>

          <li>
            <a>
              <button className="nav-button" onClick={handleRegister}>
                Register
              </button>
            </a>
          </li>
          <li>
            <a >
              <button className="nav-button" onClick={handleLogin}>
                Login
              </button>
            </a>
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






