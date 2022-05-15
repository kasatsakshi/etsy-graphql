import {
  publicRequestClient,
  userRequestClient,
} from '../api/http';
import {
  getProductsFailure,
  getProductsSuccess,
  createFavoriteProductSuccess,
  getUserFavoritesSuccess,
  getUserFavoritesFailure,
  createFavoriteProductFailure,
  deleteFavoriteProductSuccess,
  deleteFavoriteProductFailure,
  getSearchProductByNameSuccess,
  getSearchProductByNameFailure,
} from './productRedux';
import {
  getProductsQuery,
  getUserFavoritesQuery,
  searchProductsByNameQuery,
} from '../api/queries/queries';
import { createFavoriteProductMutation, deleteFavoriteProductMutation } from '../api/mutations/mutation';

export const getProducts = async (dispatch, shop) => {
  try {
    const res = await publicRequestClient.request(getProductsQuery);
    await dispatch(getProductsSuccess(res));
  } catch (err) {
    console.log(err);
    await dispatch(getProductsFailure());
  }
};

export const createFavoriteProduct = async (dispatch, product) => {
  try {
    const res = await userRequestClient.request(createFavoriteProductMutation, { input: product });
    await dispatch(createFavoriteProductSuccess(res));
  } catch (err) {
    console.log(err);
    await dispatch(createFavoriteProductFailure());
  }
};

export const deleteFavoriteProduct = async (dispatch, product) => {
  try {
    const res = await userRequestClient.request(deleteFavoriteProductMutation, { input: product });
    dispatch(deleteFavoriteProductSuccess(res));
  } catch (err) {
    console.log(err);
    dispatch(deleteFavoriteProductFailure());
  }
};

export const getUserFavorites = async (dispatch) => {
  try {
    const res = await userRequestClient.request(getUserFavoritesQuery);
    dispatch(getUserFavoritesSuccess(res));
  } catch (err) {
    console.log(err);
    dispatch(getUserFavoritesFailure());
  }
};

export const searchProductsByName = async (dispatch, data) => {
  try {
    const res = await publicRequestClient.request(searchProductsByNameQuery, { input: { name: data.searchParam } });
    dispatch(getSearchProductByNameSuccess(res));
  } catch (err) {
    console.log(err);
    dispatch(getSearchProductByNameFailure());
  }
};
