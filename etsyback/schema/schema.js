import { gql } from 'apollo-server-express';

import {
  getProducts, getUserFavorites,
} from '../controllers/products';

import login from '../controllers/login';
import { getOrders } from '../controllers/order';

// The GraphQL schema
export const typeDefs = gql`
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
    users: [User]
    products: [Product]
    orders: [OrderInfo]
    userFavorites: [Product]
  }
  type Mutation {
    login(input: LoginInput!): User
  }
`;

export const resolvers = {
  Query: {
    products: async () => getProducts(),
    userFavorites: async (parent, _, context) => getUserFavorites(context),
    orders: async (parent, _, context) => getOrders(context),
  },
  Mutation: {
    login: async (parent, input) => {
      return login(input);
    },
  },
};
