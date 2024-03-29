import { createSlice } from '@reduxjs/toolkit';

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    currentShop: null,
    currentCategories: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    getShopStart: (state) => {
      state.isFetching = true;
    },
    getShopSuccess: (state, action) => {
      state.isFetching = false;
      state.currentShop = action.payload.getShop;
    },
    getShopFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    shopCreateSuccess: (state, action) => {
      state.isFetching = false;
      state.currentShop = action.payload.createShop;
    },
    shopCreateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getShopCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.currentCategories = action.payload.getShopCategories;
    },
    getShopCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    shopProductCreateSuccess: (state, action) => {
      state.isFetching = false;
      state.currentShop = action.payload.createShopProduct;
    },
    shopProductUpdateSuccess: (state, action) => {
      state.isFetching = false;
      state.currentShop = action.payload.updateShopProduct;
    },
  },
});

export const {
  getShopStart, getShopSuccess, getShopFailure, shopCreateSuccess, shopCreateFailure, getShopCategorySuccess, getShopCategoryFailure, shopProductCreateSuccess, shopProductUpdateSuccess,
} = shopSlice.actions;
export default shopSlice.reducer;
