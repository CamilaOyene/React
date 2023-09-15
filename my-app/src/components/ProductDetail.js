import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Importa Link desde React Router
import "../components-css/ProductDetail.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/config";

function ProductDetail({ products, cartItems, addToCart, removeFromCart }) {
  const { id } = useParams();
  const productId = parseInt(id);

  const [product, setProduct] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const foundProduct = products?.find((product) => product.id === productId);
    setProduct(foundProduct);

    const isProductInCart = cartItems?.some(
      (item) => item.id === foundProduct?.id
    );
    setIsAddedToCart(isProductInCart);
  }, [id, products, cartItems]);

  const toggleCart = () => {
    if (isAddedToCart) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
    setIsAddedToCart(!isAddedToCart);
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "Productos", id);
        const productDoc = await getDoc(productRef);

        if (productDoc.exists()) {
          setProduct(productDoc.data());
        } else {
          // Manejar el caso donde el producto no existe
          console.log("El producto no existe");
        }
      } catch (error) {
        // Manejar errores de consulta
        console.error("Error al obtener el producto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <img
          src={product?.imagenURL}
          alt={product?.nombre}
          className="product-image"
        />
        <div className="product-info">
          <h2 className="product-name">{product?.nombre}</h2>
          <p className="product-price">${product?.precio}</p>
          <p className="product-detalle">{product?.detalle}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
