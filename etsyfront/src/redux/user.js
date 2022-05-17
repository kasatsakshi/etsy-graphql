import {
  loginFailure, loginStart, loginSuccess, logoutUser,
  signupStart, signupSuccess, signupFailure, accountInfoStart,
  accountInfoSuccess, accountInfoFailure, updateUserInfoSuccess,
  updateUserCurrencySuccess,
} from './userRedux';
import {
  loginMutation, signupMutation, updateCurrencyMutation, userUpdateMutation,
} from '../api/mutations/mutation';
import {
  userRequest, publicRequestClient, userRequestClient,
} from '../api/http';
import { userQuery } from '../api/queries/queries';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequestClient.request(loginMutation, { input: user });
    const token = res.login.token;
    localStorage.setItem('token', token);
    dispatch(loginSuccess(res));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const signup = async (dispatch, user) => {
  dispatch(signupStart());
  try {
    const res = await publicRequestClient.request(signupMutation, { input: user });
    const token = res.signup.token;
    localStorage.setItem('token', token);
    dispatch(signupSuccess(res));
  } catch (err) {
    dispatch(signupFailure());
  }
};

export const accountInfo = async (dispatch, user) => {
  dispatch(accountInfoStart());
  try {
    const res = await userRequestClient.request(userQuery);
    dispatch(accountInfoSuccess(res));
  } catch (err) {
    console.log(err);
    dispatch(accountInfoFailure());
  }
};

export const updateUserInfo = async (dispatch, data) => {
  try {
    const formData = new FormData();
    let avatarUrl;
    if (data && data.avatarUrl && data.avatarUrl.file) {
      formData.append('myImage', data.avatarUrl.file);
      avatarUrl = await userRequest.post('/upload', formData);
      data.avatarUrl = avatarUrl.data;
    }

    const res = await userRequestClient.request(userUpdateMutation, { input: data });
    dispatch(updateUserInfoSuccess(res));
  } catch (err) {
    console.log(err);
  }
};

export const updateCurrency = async (dispatch, data) => {
  try {
    const res = await userRequestClient.request(updateCurrencyMutation, { input: data });
    dispatch(updateUserCurrencySuccess(res));
  } catch (err) {
    console.log(err);
  }
};

export const logout = (dispatch) => {
  dispatch(logoutUser());
  localStorage.removeItem('token');
};
