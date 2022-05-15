import express from 'express';
import upload from './upload';
import { update } from './user';
import {
  createShopProduct, createShop, updateShopProduct,
} from './shop';
import { createOrder } from './order';

import passport from '../helpers/passport';

const router = new express.Router();

router.put('/user/update', passport.authenticate('jwt', { session: false }), update);
router.post('/upload', passport.authenticate('jwt', { session: false }), upload);
router.post('/shop/create', passport.authenticate('jwt', { session: false }), createShop);
router.post('/shop/product/create', passport.authenticate('jwt', { session: false }), createShopProduct);
router.post('/shop/product/update', passport.authenticate('jwt', { session: false }), updateShopProduct);

router.post('/order', passport.authenticate('jwt', { session: false }), createOrder);

export default router;
