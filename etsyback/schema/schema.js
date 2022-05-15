import { gql } from 'apollo-server-express';

import {
  deleteFavoriteProduct,
  favoriteProduct,
  getProducts, getUserFavorites,
} from '../controllers/products';

import login from '../controllers/login';
import { getOrders } from '../controllers/order';
import { user } from '../controllers/user';

// The GraphQL schema
export const publicTypeDefs = gql`
  input LoginInput {
    email: String
    password: String
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
  }
  type Mutation {
    login(input: LoginInput!): User
  }
`;

export const typeDefs = gql`
  input CreateFavoriteProductInput {
    inventoryId: String!
  }
  input DeleteFavoriteProductInput {
    inventoryId: String!
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
  type Query {
    user: User
    orders: [OrderInfo]
    userFavorites: [Product]
  }
  type Mutation {
    createFavoriteProduct(input: CreateFavoriteProductInput!): [FavoriteProduct]
    deleteFavoriteProduct(input: DeleteFavoriteProductInput!): [FavoriteProduct]
  }
`;

export const publicResolvers = {
  Query: {
    products: async () => getProducts(),
  },
  Mutation: {
    login: async (parent, input) => {
      return login(input);
    },
  },
};

export const resolvers = {
  Query: {
    userFavorites: async (parent, _, context) => getUserFavorites(context),
    orders: async (parent, _, context) => getOrders(context),
    user: async (parent, _, context) => user(context),
  },
  Mutation: {
    createFavoriteProduct: async (parent, input, context) => {
      return favoriteProduct(context, input);
    },
    deleteFavoriteProduct: async (parent, input, context) => {
      return deleteFavoriteProduct(context, input);
    },
  },
};
