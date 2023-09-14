import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components-css/Login.css';           

function Login() {
    const history = useNavigate();
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
      // Aquí puedes realizar la lógica de inicio de sesión, por ejemplo, verificar credenciales en el servidor.
      
      // Simulamos un inicio de sesión exitoso después de 2 segundos.
      setTimeout(() => {
        // Redirige al usuario a la página de inicio después del inicio de sesión exitoso.
        history('/');
      }, 2000);
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
      </div>
    );
  }
  
  export default Login;