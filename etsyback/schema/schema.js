import { gql } from 'apollo-server-express';

import {
  deleteFavoriteProduct,
  favoriteProduct,
  getProducts, getUserFavorites, searchProductsByName,
} from '../controllers/products';

import login from '../controllers/login';
import signup from '../controllers/signup';
import { createOrder, getOrders } from '../controllers/order';
import { user, updateCurrency, update } from '../controllers/user';
import {
  createShop, getShop, createShopProduct,
  getShopCategories, isShopNameAvailable,
} from '../controllers/shop';

// The GraphQL schema
export const publicTypeDefs = gql`
  input LoginInput {
    email: String!
    password: String!
  }
  input SignupInput {
    name: String!
    email: String!
    password: String!
  }
  input ProductNameInput {
    name: String!
  }
  type User {
    _id: ID
    name: String
    email: String
    gender: String
    phone: String
    avatarUrl: String
    birthday: String
    bio: String
    userStatus: String
    lastLoginAt: String
    lastLogoutAt: String
    currency: String
    userLevel: Int
    address: String
    createdAt: String
    updatedAt: String
    token: String
  }
  type Product {
    _id: ID
    name: String
    description: String
    pictureUrl: String
    category: String
    price: String
    quantity: Int
    shopId: String
    createdAt: String
    updatedAt: String
  }
  type Query {
    products: [Product]
    searchProductsByName(input: ProductNameInput!): [Product]
  }
  type Mutation {
    login(input: LoginInput!): User
    signup(input: SignupInput!): User
  }
`;

export const typeDefs = gql`
  input CreateFavoriteProductInput {
    inventoryId: String!
  }
  input DeleteFavoriteProductInput {
    inventoryId: String!
  }
  input UpdateCurrencyInput {
    currency: String!
  }
  input ShopAvailabilityInput {
    name: String!
  }
  input ShopCategoriesInput {
    shopId: String!
  }
  input OrderItemsInput {
    quantityNeeded: Int!
    quantity: Int!
    price: String!
    pictureUrl: String
    name: String
    description: String
    category: String
    shopId: String
    _id: String
    createdAt: String
    updatedAt: String
  }
  input CreateOrderInput {
    orderItems: [OrderItemsInput]
  }
  input CreateShopProductInput {
    pictureUrl: String
    shopId: String!
    name: String!
    description: String
    isCustom: Boolean
    category: String
    price: String
    quantity: String
  }
  input CreateShopInput {
    avatarUrl: String
    name: String!
    description: String
    phone: String
    address: String
  }
  input UpdateUserInput {
    name: String
    email: String
    gender: String
    phone: String
    avatarUrl: String
    birthday: String
    bio: String
    address: String
  }
  type FavoriteProduct {
    _id: ID
    userId: String
    inventoryId: String
    createdAt: String
    updatedAt: String
  }
  type User {
    _id: ID
    name: String
    email: String
    gender: String
    phone: String
    avatarUrl: String
    birthday: String
    bio: String
    userStatus: String
    lastLoginAt: String
    lastLogoutAt: String
    currency: String
    userLevel: Int
    address: String
    createdAt: String
    updatedAt: String
    token: String
  }
  type Product {
    _id: ID
    name: String
    description: String
    pictureUrl: String
    category: String
    price: String
    quantity: Int
    shopId: String
    createdAt: String
    updatedAt: String
  }
  type OrderDetails {
    _id: ID
    orderQuantity: Int
    orderId: String
    name: String
    description: String
    pictureUrl: String
    category: String
    price: Int
    shopId: String
    inventoryId: String
    createdAt: String
    updatedAt: String
  }
  type Order {
    _id: ID
    finalAmount: Int
    status: String
    orderId: String
    orderedDate: String
    userId: String
    createdAt: String
    updatedAt: String
  }
  type OrderInfo {
    order: Order
    orderDetails: [OrderDetails]
  }
  type ShopAvailability {
    available: Boolean
  }
  type Shop {
    _id: ID
    name: String
    description: String
    avatarUrl: String
    userId: String
    address: String
    createdAt: String
    updatedAt: String
  }
  type ShopInfo {
    user: User
    shop: Shop
    inventory: [Product]
    totalSales: Int
  }
  type CustomCategory {
    _id: ID
    name: String
    shopId: String
    createdAt: String
    updatedAt: String
  }
  type ShopCategory {
    default: [String]
    custom: [CustomCategory]
  }
  type Query {
    user: User
    orders: [OrderInfo]
    userFavorites: [Product]
    getShop: ShopInfo
    getShopCategories(input: ShopCategoriesInput!): ShopCategory
  }
  type Mutation {
    createFavoriteProduct(input: CreateFavoriteProductInput!): [FavoriteProduct]
    deleteFavoriteProduct(input: DeleteFavoriteProductInput!): [FavoriteProduct]
    updateUserCurrency(input: UpdateCurrencyInput!): User
    isShopNameAvailable(input: ShopAvailabilityInput!): ShopAvailability
    createOrder(input: CreateOrderInput!): [OrderInfo]
    createShop(input: CreateShopInput!): ShopInfo
    createShopProduct(input: CreateShopProductInput!): ShopInfo
    updateUser(input: UpdateUserInput!): User
  }
`;

export const publicResolvers = {
  Query: {
    products: async () => getProducts(),
    searchProductsByName: async (parent, input, context) => {
      return searchProductsByName(context, input);
    },
  },
  Mutation: {
    login: async (parent, input) => {
      return login(input);
    },
    signup: async (parent, input) => {
      return signup(input);
    },
  },
};

export const resolvers = {
  Query: {
    userFavorites: async (parent, _, context) => getUserFavorites(context),
    orders: async (parent, _, context) => getOrders(context),
    user: async (parent, _, context) => user(context),
    getShop: async (parent, _, context) => getShop(context),
    getShopCategories: async (parent, input, context) => getShopCategories(context, input),
  },
  Mutation: {
    createFavoriteProduct: async (parent, input, context) => {
      return favoriteProduct(context, input);
    },
    deleteFavoriteProduct: async (parent, input, context) => {
      return deleteFavoriteProduct(context, input);
    },
    updateUserCurrency: async (parent, input, context) => {
      return updateCurrency(context, input);
    },
    isShopNameAvailable: async (parent, input, context) => {
      return isShopNameAvailable(context, input);
    },
    createOrder: async (parent, input, context) => {
      return createOrder(context, input);
    },
    createShop: async (parent, input, context) => {
      return createShop(context, input);
    },
    createShopProduct: async (parent, input, context) => {
      return createShopProduct(context, input);
    },
    updateUser: async (parent, input, context) => {
      return update(context, input);
    },
  },
};
