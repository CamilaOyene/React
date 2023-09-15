import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components-css/Login.css";
import { auth } from "../firebase/config";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      sendPasswordResetEmail(auth, formData.email)
          .then(() => {
                    window.alert(
                      "Chequea tu correo para el resetear su contraseña");
              navigate("/")
              console.log("succesfully");
         })
         .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
         });
  };

  return (
    <div className="login-form">
      <h2>Recuperar Contraseña</h2>
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
        <button type="submit">Recuperar</button>
      </form>
    </div>
  );
}

export default ResetPassword;
