import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../components-css/Login.css';           
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const navigate = useNavigate();
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
      .then((userCredential) => {
      const user = userCredential.user;
      window.alert("Inicio de sesion exitoso")
      navigate("/")
      }) 

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    };
  
    return (
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Iniciar Sesión</button>
        </form>
        <div>
          <NavLink to= "/reset">
            <h2>Olvidaste tu contraseña?</h2>
          </NavLink>
        </div>
      </div>
    );
  }
  
  export default Login;