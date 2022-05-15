import {
  publicRequest,
  userRequest,
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
} from '../api/queries/queries';

export const getProducts = async (dispatch, shop) => {
  try {
    const res = await publicRequestClient.request(getProductsQuery);
    // const res = await publicRequest.get('/products');
    await dispatch(getProductsSuccess(res));
  } catch (err) {
    console.log(err);
    await dispatch(getProductsFailure());
  }
};

export const createFavoriteProduct = async (dispatch, product) => {
  try {
    const res = await userRequest.post('/product/favorite', product);
    await dispatch(createFavoriteProductSuccess(res.data));
  } catch (err) {
    console.log(err);
    await dispatch(createFavoriteProductFailure());
  }
};

export const deleteFavoriteProduct = async (dispatch, product) => {
  try {
    const res = await userRequest.post('/product/favorite/delete', product);
    dispatch(deleteFavoriteProductSuccess(res.data));
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
    const res = await publicRequest.get(`/product/search/${data.searchParam}`);
    dispatch(getSearchProductByNameSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getSearchProductByNameFailure());
  }
};
