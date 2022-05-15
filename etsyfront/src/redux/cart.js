import {
  addCartSuccess, addCartFailure, createOrderSuccess, createOrderFailure, getOrderSuccess,
} from './cartRedux';
import { userRequestClient, userRequest } from '../api/http';
import { ordersQuery } from '../api/queries/queries';

export const addToCart = async (dispatch, order) => {
  try {
    await dispatch(addCartSuccess(order));
  } catch (err) {
    console.log(err);
    dispatch(addCartFailure());
  }
};

export const createOrder = async (dispatch, order) => {
  try {
    const res = await userRequest.post('/order', order);
    await dispatch(createOrderSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(createOrderFailure());
  }
};

export const getOrders = async (dispatch) => {
  try {
    const res = await userRequestClient.request(ordersQuery);
    dispatch(getOrderSuccess(res));
  } catch (err) {
    console.log(err);
  }
};
