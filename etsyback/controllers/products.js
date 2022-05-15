import {
  createEntity, findEntity, findOneEntity, deleteOneEntity,
} from '../models';
import { decodeToken } from '../helpers/auth';
import UserFavorites from '../models/userFavorites';
import Inventory from '../models/inventory';
import OrderDetails from '../models/orderDetails';

export async function getProducts() {
  const products = await findEntity(Inventory);
  let total = 0;
  await Promise.all(
    products.map(async (product) => {
      const temp = await findEntity(OrderDetails, { inventoryId: product._id }, 'orderQuantity');
      total = temp.length;
      product.totalSales = total;
    }),
  );

  return products;
}

export async function favoriteProduct(context, args) {
  const { req } = context;
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const userId = payload.data.id;
  const inventoryId = args.input.inventoryId;
  const userFavorites = new UserFavorites({
    inventoryId,
    userId,
  });
  await createEntity(userFavorites);
  const findFavorites = await findEntity(UserFavorites, { userId });
  return findFavorites;
}

export async function deleteFavoriteProduct(context, args) {
  const { req } = context;
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const userId = payload.data.id;
  const inventoryId = args.input.inventoryId;
  await deleteOneEntity(UserFavorites, { userId, inventoryId });
  const findFavorites = await findEntity(UserFavorites, { userId });
  return findFavorites;
}

export async function getUserFavorites(context) {
  const { req } = context;
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const userId = payload.data.id;
  const findFavorites = await findEntity(UserFavorites, { userId });
  const response = [];
  await Promise.all(
    findFavorites.map(async (product) => {
      const temp = await findOneEntity(Inventory, { _id: product.inventoryId });
      if (temp) {
        response.push(temp);
      }
    }),
  );

  return response;
}

export async function searchProductsByName(_, args) {
  const searchParam = args.input.name;
  let products = [];
  if (searchParam) {
    products = await findEntity(Inventory, { name: new RegExp(searchParam, 'i') });
  } else {
    products = await findEntity(Inventory, {});
  }
  return products;
}
