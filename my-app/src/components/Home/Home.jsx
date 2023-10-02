/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase/config';
import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  STORE_PRODUCTS,
  selectProducts,
  selectedCategory,
} from '../redux/slices/productSlice';
import CartItem from '../CartItem/CartItem';

function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const currentCategory = useSelector(selectedCategory);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsRef = collection(db, 'Productos');
        const q = query(productsRef, orderBy('createdAt', 'desc'));
        await onSnapshot(q, (snapshot) => {
          const productsFromDB = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(
            STORE_PRODUCTS({
              products: productsFromDB,
            }),
          );
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    getProducts();
  }, [currentCategory]);

  const handleAddToCart = (product) => {
    dispatch(ADD_PRODUCT_TO_CART(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(REMOVE_PRODUCT_FROM_CART(product.id));
  };

  return (
    <div className="container mx-auto py-8">
      {products !== undefined && products.length > 0 ? (
        <ul className="cart-list">
          {products.map((item, idx) => (
            <CartItem
              key={idx}
              itemKey={idx}
              item={item}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
              allowRemoval={false}
            />
          ))}
        </ul>
      ) : (
        <p>
          No se encuentran artículos disponibles.
          <br />
          Por favor, inicia sesión o regístrate.
        </p>
      )}
    </div>
  );
}

export default Home;
