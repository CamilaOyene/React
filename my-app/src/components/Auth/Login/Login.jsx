import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './styles.css';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase/config';
import { SET_ACTIVE_USER } from '../../redux/slices/authSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((data) => {
        // eslint-disable-next-line
        window.alert('Inicio de sesion exitoso');
        dispatch(
          SET_ACTIVE_USER({
            email: data.user.email,
            userName: data.user.displayName,
            userID: data.user.uid,
          }),
        );
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line
        window.alert(errorCode, errorMessage);
      });
  };

  return (
    <div className="login-form">
      <h2>Iniciar Sesión</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="button" onClick={(e) => handleSubmit(e)}>
          Iniciar Sesión
        </button>
      </form>
      <div>
        <NavLink to="/reset">
          <h2>Olvidaste tu contraseña?</h2>
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
