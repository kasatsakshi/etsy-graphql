import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import {
  findEntity, findOneEntity,
  createEntity, updateOneEntity,
} from '../models';
import { decodeToken } from '../helpers/auth';
import Shop from '../models/shop';
import User from '../models/users';
import Inventory from '../models/inventory';
import Category from '../models/category';
import OrderDetails from '../models/orderDetails';

export async function createShop(context, args) {
  // Check incoming validation
  const { req } = context;
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const userId = payload.data.id;

  const {
    name, description, address, avatarUrl, phone,
  } = args.input;
  const user = await findOneEntity(User, { _id: userId });
  // Check if this user id exists
  if (!user) {
    throw new Error("User doesn't exists");
  }

  const shop = await findOneEntity(Shop, { name });
  if (shop) {
    throw new Error('Shop name is taken');
  }

  const shopInput = new Shop({
    name,
    description,
    phone,
    avatarUrl,
    userId,
    address,
  });
  const createdShop = await createEntity(shopInput);

  const response = {
    user,
    shop: createdShop,
    inventory: [],
  };
  response.totalSales = 0;
  return response;
}

export async function getShop(context) {
  const { req } = context;
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const id = payload.data.id;

  if (!id) {
    throw new Error('user id is missing');
  }

  const user = await findOneEntity(User, { _id: id });
  // Check if this user exists
  if (!user) {
    console.error('User does not exists!');
    throw new Error('User does not exists');
  }

  const shop = await findOneEntity(Shop, { userId: id });
  let inventory = [];
  if (shop) {
    inventory = await findEntity(Inventory, { shopId: shop._id });
  }

  const response = {
    user,
    shop,
    inventory,
  };

  let total = 0;
  await Promise.all(
    inventory.map(async (item) => {
      const temp = await findEntity(OrderDetails, { inventoryId: item._id }, ['orderQuantity']);
      total += temp.length;
    }),
  );
  response.totalSales = total;

  return response;
}

export async function isShopNameAvailable(_, args) {
  const { name } = args.input;
  if (!name) {
    throw new Error('shop name is missing');
  }

  const findShop = await findOneEntity(Shop, { name });

  if (findShop) {
    return { available: false };
  }

  return { available: true };
}

export async function getShopCategories(_, args) {
  const { shopId } = args.input;

  if (!shopId) {
    throw new Error('shop id is missing');
  }

  const shop = await findOneEntity(Shop, { _id: shopId });
  if (!shop) {
    console.error('Shop does not exists!');
    throw new Error('Shop does not exists');
  }

  const defaultCategories = ['Art', 'Clothing', 'Jewellery', 'Entertainment', 'Home Decor'];
  const customCategories = await findEntity(Category, { shopId });
  const response = {
    default: defaultCategories,
    custom: customCategories,
  };
  return response;
}

export async function createShopProduct(context, args) {
  // Check incoming validation
  const {
    shopId, name, description, isCustom, category, price, quantity, pictureUrl,
  } = args.input;

  const shop = await findOneEntity(Shop, { _id: shopId });
  if (!shop) {
    throw new Error("Shop doesn't exists");
  }

  const user = await findOneEntity(User, { _id: shop.userId });

  let inventoryInput;
  if (isCustom) {
    const newCategory = new Category({
      name: category,
      shopId,
    });

    const createdCategory = await createEntity(newCategory);
    const categoryId = createdCategory._id;
    inventoryInput = new Inventory({
      name,
      description,
      pictureUrl,
      price,
      quantity,
      shopId,
      categoryId,
      category,
    });
  } else {
    inventoryInput = new Inventory({
      name,
      description,
      pictureUrl,
      price,
      quantity,
      shopId,
      category,
    });
  }

  const inventory = await createEntity(inventoryInput);

  const response = {
    user,
    shop,
    inventory,
  };

  let total = 0;
  await Promise.all(
    inventory.map(async (item) => {
      const temp = await findEntity(OrderDetails, { inventoryId: item._id }, ['orderQuantity']);
      total += temp.length;
    }),
  );
  response.totalSales = total;
  return response;
}

export async function updateShopProduct(context, args) {
  const {
    productId, name, description, isCustom, category, price, quantity, pictureUrl,
  } = args.input;

  const findProduct = await findOneEntity(Inventory, { _id: productId });
  if (!findProduct) {
    throw new Error("Product doesn't exists");
  }

  const shop = await findOneEntity(Shop, { _id: findProduct.shopId });
  const user = await findOneEntity(User, { _id: shop.userId });

  const productInput = {
    name,
    description,
    pictureUrl,
    price,
    quantity,
    shopId: shop._id,
  };

  if (isCustom) {
    const newCategory = new Category({
      name: category,
      productId,
    });

    const createdCategory = await createEntity(newCategory);
    productInput.categoryId = createdCategory._id;
    productInput.category = null;
  } else {
    productInput.category = category;
  }

  await updateOneEntity(Inventory, { _id: productId }, productInput);
  const inventory = await findEntity(Inventory, { shopId: findProduct.shopId });

  const response = {
    user,
    shop,
    inventory,
  };

  let total = 0;
  await Promise.all(
    inventory.map(async (item) => {
      const temp = await findEntity(OrderDetails, { inventoryId: item._id }, ['orderQuantity']);
      total += temp.length;
    }),
  );
  response.totalSales = total;

  return response;
}
