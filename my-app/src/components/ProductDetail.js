import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../components-css/ProductDetail.css";

function ProductDetail({ products, cartItems, addToCart, removeFromCart }) {
  const { id } = useParams();
  const productId = parseInt(id);
  console.log(productId);

 const [product, setProduct] = useState(null);
 const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const foundProduct = products?.find((product) => product.id === productId);
    setProduct(foundProduct);

    const isProductInCart = cartItems?.some(
      (item) => item.id === foundProduct?.id
    );
    setIsAddedToCart(isProductInCart);
     console.log("FOUND PRODUCT", foundProduct);
  }, [id, products, cartItems]);


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
        <img src={product?.image} alt={product?.name} className="product-image" />
        <div className="product-info">
          <h2 className="product-name">{product?.name}</h2>
          <p className="product-price">${product?.price}</p>
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