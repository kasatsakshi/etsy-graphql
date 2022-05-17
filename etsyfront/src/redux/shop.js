import {
  getShopStart, getShopSuccess, getShopFailure, shopCreateSuccess,
  shopCreateFailure, getShopCategorySuccess, shopProductUpdateSuccess,
  getShopCategoryFailure, shopProductCreateSuccess,
} from './shopRedux';
import { userRequest, userRequestClient } from '../api/http';
import {
  isShopNameAvailableMutation, createShopMutation, createShopProductMutation, updateShopProductMutation,
} from '../api/mutations/mutation';
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
  if (data.pictureUrl.file) {
    const formData = new FormData();
    formData.append('myImage', data.pictureUrl.file);
    const pictureUrl = await userRequest.post('/upload', formData);
    data.pictureUrl = pictureUrl.data;
  }

  try {
    const res = await userRequestClient.request(updateShopProductMutation, { input: data });
    dispatch(shopProductUpdateSuccess(res));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
