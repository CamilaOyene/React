import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
      state.products = action.payload.products;
    },
  },
});

export const { STORE_PRODUCTS } = productSlice.actions;
export const selectProducts = (state) => state.products;
// export const selectMinPrice = (state) =>
//   state.drinks.minPrice;
// export const selectMaxPrice = (state) =>
//   state.drinks.maxPrice;
export default productSlice.reducer;
