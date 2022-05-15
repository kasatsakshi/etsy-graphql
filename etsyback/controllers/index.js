import express from 'express';
import upload from './upload';
import { update } from './user';
import {
  createShopProduct, createShop, getShop, isShopNameAvailable, getShopCategories, updateShopProduct,
} from './shop';
import { createOrder } from './order';

import passport from '../helpers/passport';

const router = new express.Router();

router.put('/user/update', passport.authenticate('jwt', { session: false }), update);
router.post('/upload', passport.authenticate('jwt', { session: false }), upload);
router.get('/shop', passport.authenticate('jwt', { session: false }), getShop);
router.post('/shop/name', passport.authenticate('jwt', { session: false }), isShopNameAvailable);
router.post('/shop/create', passport.authenticate('jwt', { session: false }), createShop);
router.post('/shop/product/create', passport.authenticate('jwt', { session: false }), createShopProduct);
router.post('/shop/product/update', passport.authenticate('jwt', { session: false }), updateShopProduct);
router.get('/shop/:shopId/categories', passport.authenticate('jwt', { session: false }), getShopCategories);

router.post('/order', passport.authenticate('jwt', { session: false }), createOrder);

export default router;
