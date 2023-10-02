import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importa Link desde React Router
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import './styles.css';

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

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
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
