import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  products: [],
  selectedCategory: undefined,
  searchTerm: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
      return {
        ...state,
        products: [...action.payload.products],
      };
    },
    SELECT_CATEGORY(state, action) {
      return {
        ...state,
        selectedCategory: action.payload.selectedCategory,
      };
    },
    SET_SEARCH_TERM(state, action) {
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };
    },
    ADD_PRODUCT_TO_CART(state, action) {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    },
    REMOVE_PRODUCT_FROM_CART(state, action) {
      const productIdToRemove = action.payload;
      const updatedCart = state.cart.filter(
        (product) => product.id !== productIdToRemove,
      );

      return {
        ...state,
        cart: updatedCart,
      };
    },
    CHECKOUT(state) {
      return {
        ...state,
        cart: [],
      };
    },
    EMPTY_CART(state) {
      return {
        ...state,
        cart: [],
      };
    },
  },
});

export const {
  STORE_PRODUCTS,
  SELECT_CATEGORY,
  SET_SEARCH_TERM,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  CHECKOUT,
  EMPTY_CART,
} = productSlice.actions;
export const selectProducts = (state) => {
  if (state.products.selectedCategory !== undefined) {
    return state.products.products.filter(
      (product) => product.descripcion === state.products.selectedCategory,
    );
  }

  if (state.products.searchTerm !== '') {
    const searchTermLower = state.products.searchTerm.toLowerCase();

    return state.products.products.filter((product) =>
      product.nombre.toLowerCase().includes(searchTermLower),
    );
  }

  return state.products.products;
};

export const selectedCategory = (state) => state.products.selectedCategory;
export const getCartItems = (state) => state.products.cart;
export default productSlice.reducer;
