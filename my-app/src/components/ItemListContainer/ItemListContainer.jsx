import React from 'react';
import { useDispatch } from 'react-redux';
import CardProduct from '../CardProduct/CardProduct';
import './ItemListContainer.css';
import { SELECT_CATEGORY } from '../redux/slices/productSlice';

function ItemListContainer({ products, currentCategory }) {
  // const category = currentCategory ? currentCategory : 'Todos los productos';
  const dispatch = useDispatch();

  const showAllProducts = () => {
    dispatch(SELECT_CATEGORY({ selectedCategory: undefined }));
  };

  return (
    <div className="conteinerItemList">
      <h3>Lista de Productos</h3>
      <p>Categoría: {currentCategory || 'Todos los productos'}</p>
      {currentCategory && (
        <button type="button" onClick={showAllProducts}>
          Mostrar todo
        </button>
      )}

      <div className="containerCardsProducts">
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
