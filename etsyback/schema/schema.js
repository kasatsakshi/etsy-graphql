import { gql } from 'apollo-server-express';

import {
  getProducts, getUserFavorites,
} from '../controllers/products';

import login from '../controllers/login';

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
  type Query {
    users: [User]
    products: [Product]
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
  },
  Mutation: {
    login: async (parent, input) => {
      return login(input);
    },
  },
};
