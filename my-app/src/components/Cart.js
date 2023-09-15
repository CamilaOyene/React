import React from "react";
import "../components-css/Home.css";
import carrito from "../../src/components/assets/shopping-cart.png";
import { NavLink } from "react-router-dom";

function Cart() {
  return (
    <div className="container">
      <h1 className="text-center">No hay nada en el carrito</h1>
    </div>
  );
}

export default Cart;
