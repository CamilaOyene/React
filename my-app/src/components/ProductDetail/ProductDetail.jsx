import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; // Importa Link desde React Router
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import './styles.css';
import { ADD_PRODUCT_TO_CART } from '../redux/slices/productSlice';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    dispatch(ADD_PRODUCT_TO_CART(product));
    // eslint-disable-next-line
    alert('Producto agregado al carrito!');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'Productos', id);
        const productDoc = await getDoc(productRef);

        if (productDoc.exists()) {
          setProduct(productDoc.data());
        } else {
          // eslint-disable-next-line
          console.log('El producto no existe');
        }
      } catch (error) {
        // eslint-disable-next-line
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        {product && (
          <div>
            <img
              src={product.imagenURL}
              alt={product.nombre}
              className="product-image"
            />
            <div className="product-info">
              <h2 className="product-name">{product.nombre}</h2>
              <p className="product-price">${product.precio}</p>
              <p className="product-detalle">{product.detalle}</p>
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => handleAddItemToCart(e)}
            >
              Agregar al carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
