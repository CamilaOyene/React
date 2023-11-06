/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
  selectEmail,
  selectIsLoggedIn,
} from '../redux/slices/authSlice';
import { auth } from '../firebase/config';
import { SELECT_CATEGORY, SET_SEARCH_TERM } from '../redux/slices/productSlice';

function Navbar() {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectEmail);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleSearch = (searchTerm) => {
    dispatch(SET_SEARCH_TERM({ searchTerm }));
  };

  const handleLogOut = () => {
    dispatch(REMOVE_ACTIVE_USER());
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName,
            userID: user.uid,
          }),
        );
      } else {
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch]);

  const handleSelectCategory = (selectedCategory) => {
    dispatch(SELECT_CATEGORY({ selectedCategory }));
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Proyecto Final
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/"
                onClick={() => handleSelectCategory(undefined)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Productos
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSelectCategory('celular')}
                  >
                    Celulares
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSelectCategory('pc')}
                  >
                    Computadoras
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSelectCategory('tv')}
                  >
                    Televisores
                  </a>
                </li>
              </ul>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <AiOutlineUser />
                    Hola, {userEmail}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    onClick={handleLogOut}
                  >
                    Salir
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="dropdown-item nav-link" to="/register">
                    Registrarse
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="dropdown-item nav-link" to="/login">
                    Entrar
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="dropdown-item nav-link" to="/cart">
                Carrito
              </Link>
            </li>
            <li className="nav-item">
              <Link className="dropdown-item nav-link" to="/shopping-history">
                Historial de Compras
              </Link>
            </li>
          </ul>
          <Search onSearch={handleSearch} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
