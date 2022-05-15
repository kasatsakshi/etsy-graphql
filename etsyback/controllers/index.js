import express from 'express';
import login from './login';
import signup from './signup';
import upload from './upload';
import { user, update, updateCurrency } from './user';
import {
  createShopProduct, createShop, getShop, isShopNameAvailable, getShopCategories, updateShopProduct,
} from './shop';
import {
  deleteFavoriteProduct, favoriteProduct, getProducts, getUserFavorites, searchProductsByName,
} from './products';
import { createOrder, getOrders } from './order';

import passport from '../helpers/passport';

const router = new express.Router();

router.post('/signup', signup);
router.get('/user', passport.authenticate('jwt', { session: false }), user);
router.put('/user/update', passport.authenticate('jwt', { session: false }), update);
router.put('/user/update/currency', passport.authenticate('jwt', { session: false }), updateCurrency);
router.post('/upload', passport.authenticate('jwt', { session: false }), upload);
router.get('/shop', passport.authenticate('jwt', { session: false }), getShop);
router.post('/shop/name', passport.authenticate('jwt', { session: false }), isShopNameAvailable);
router.post('/shop/create', passport.authenticate('jwt', { session: false }), createShop);
router.post('/shop/product/create', passport.authenticate('jwt', { session: false }), createShopProduct);
router.post('/shop/product/update', passport.authenticate('jwt', { session: false }), updateShopProduct);
router.get('/shop/:shopId/categories', passport.authenticate('jwt', { session: false }), getShopCategories);

router.post('/product/favorite', passport.authenticate('jwt', { session: false }), favoriteProduct);
router.post('/product/favorite/delete', passport.authenticate('jwt', { session: false }), deleteFavoriteProduct);

router.get('/product/search/:name', searchProductsByName);

router.post('/order', passport.authenticate('jwt', { session: false }), createOrder);

export default router;
