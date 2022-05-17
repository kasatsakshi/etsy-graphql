import {
  getShopStart, getShopSuccess, getShopFailure, shopCreateSuccess,
  shopCreateFailure, getShopCategorySuccess, shopProductUpdateSuccess,
  getShopCategoryFailure, shopProductCreateSuccess,
} from './shopRedux';
import { userRequest, userRequestClient } from '../api/http';
import { isShopNameAvailableMutation, createShopMutation, createShopProductMutation } from '../api/mutations/mutation';
import { getShopQuery, getShopCateogoriesQuery } from '../api/queries/queries';

export const getShop = async (dispatch) => {
  dispatch(getShopStart());
  try {
    const res = await userRequestClient.request(getShopQuery);
    dispatch(getShopSuccess(res));
  } catch (err) {
    console.log(err);
    dispatch(getShopFailure());
  }
};

export const getShopCategories = async (dispatch, shop) => {
  try {
    const res = await userRequestClient.request(getShopCateogoriesQuery, { input: { shopId: shop.id } });
    dispatch(getShopCategorySuccess(res));
  } catch (err) {
    console.log(err);
    dispatch(getShopCategoryFailure());
  }
};

export const isShopNameAvailable = async (shop) => {
  try {
    const res = await userRequestClient.request(isShopNameAvailableMutation, { input: { name: shop.shopName } });
    return res.isShopNameAvailable;
  } catch (err) {
    console.log(err);
  }
};

export const shopCreate = async (dispatch, shopData) => {
  const formData = new FormData();
  formData.append('myImage', shopData.avatarUrl.file);

  try {
    let avatarUrl = { data: '' };
    if (shopData.avatarUrl.file) {
      avatarUrl = await userRequest.post('/upload', formData);
    }
    shopData.avatarUrl = avatarUrl.data;
    const res = await userRequestClient.request(createShopMutation, { input: shopData });
    dispatch(shopCreateSuccess(res));
    return res.data;
  } catch (err) {
    console.log(err);
    dispatch(shopCreateFailure());
  }
};

export const shopProductCreate = async (dispatch, shopProductData) => {
  const formData = new FormData();
  formData.append('myImage', shopProductData.pictureUrl.file);

  try {
    let pictureUrl = { data: '' };
    if (shopProductData.pictureUrl.file) {
      pictureUrl = await userRequest.post('/upload', formData);
    }
    shopProductData.pictureUrl = pictureUrl.data;
    const res = await userRequestClient.request(createShopProductMutation, { input: shopProductData });
    dispatch(shopProductCreateSuccess(res));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const shopProductUpdate = async (dispatch, data) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('isCustom', data.isCustom);
  formData.append('category', data.category);
  formData.append('price', data.price);
  formData.append('quantity', data.quantity);
  formData.append('productId', data.productId);
  if (data.pictureUrl.file) {
    formData.append('pictureUrl', data.pictureUrl.file);
  } else {
    formData.append('pictureUrl', data.pictureUrl);
  }
  try {
    const res = await userRequest.post('/shop/product/update', formData);
    dispatch(shopProductUpdateSuccess(res.data));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
