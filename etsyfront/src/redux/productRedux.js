import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    currentProducts: null,
    favoriteProducts: null,
    searchedProducts: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    getProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.currentProducts = action.payload.products;
    },
    getProductsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    createFavoriteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.favoriteProducts = action.payload.createFavoriteProduct;
    },
    createFavoriteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteFavoriteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.favoriteProducts = action.payload.deleteFavoriteProduct;
    },
    deleteFavoriteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getUserFavoritesSuccess: (state, action) => {
      state.isFetching = false;
      state.favoriteProducts = action.payload.userFavorites;
    },
    getUserFavoritesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getSearchProductByNameSuccess: (state, action) => {
      state.isFetching = false;
      state.searchedProducts = action.payload;
    },
    getSearchProductByNameFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.searchedProducts = null;
    },
  },
});

export const {
  getProductsSuccess, getProductsFailure, createFavoriteProductSuccess,
  createFavoriteProductFailure, deleteFavoriteProductSuccess, getUserFavoritesSuccess, getUserFavoritesFailure,
  deleteFavoriteProductFailure, getSearchProductByNameSuccess, getSearchProductByNameFailure,
} = productsSlice.actions;
export default productsSlice.reducer;
