import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../components-css/ProductDetail.css";

function ProductDetail({ products, cartItems, addToCart, removeFromCart }) {
  const { productId } = useParams();
  const product = products.find((product) => product.id === parseInt(productId));

  const [isAddedToCart, setIsAddedToCart] = useState(
    cartItems.some((item) => item.id === product.id)
  );

  const toggleCart = () => {
    if (isAddedToCart) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
    setIsAddedToCart(!isAddedToCart);
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">${product.price}</p>
          <button
            className={`add-to-cart ${isAddedToCart ? "added" : ""}`}
            onClick={toggleCart}
          >
            {isAddedToCart ? "Eliminar del carrito" : "Agregar al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;