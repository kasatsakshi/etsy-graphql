import express from 'express';
import upload from './upload';
import { update } from './user';
import {
  updateShopProduct,
} from './shop';

import passport from '../helpers/passport';

const router = new express.Router();

router.put('/user/update', passport.authenticate('jwt', { session: false }), update);
router.post('/upload', passport.authenticate('jwt', { session: false }), upload);
router.post('/shop/product/update', passport.authenticate('jwt', { session: false }), updateShopProduct);

export default router;
