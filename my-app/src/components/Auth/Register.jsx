import React, { useState } from 'react';
import '../../components-css/Register.css';
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../firebase/config';


function Register() {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
  
    const user = userCredential.user;
    console.log(user);
    navigate('/login');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
      window.alert("registro exitoso")
      console.log(formData);
    };

    return(
        <div className="register-form">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
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
          <button type="submit">Registrarse</button>
        </form>
      </div>
    );
  }

  export default Register;