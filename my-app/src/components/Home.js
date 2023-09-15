import React from "react";
import "../components-css/Home.css";
import carrito from "../components/assets/shopping-cart.png";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <h1 className="text-center">Bienvenido a mi carrito de compras</h1>
      <p className="text-center">
        Aca podes agregar los productos que deseas comprar y realizar el proceso
        de compra de forma sencilla y segura.
      </p>
      <div className="text-center">
        <NavLink to={"/products"}>
          <button>Comenzar</button>
        </NavLink>
      </div>
      <div className="text-center">
        <img src={carrito} alt="Carrito de compras" />
      </div>
    </div>
  );
}

export default Home;
