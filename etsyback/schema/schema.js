import { gql } from 'apollo-server-express';

import {
  getProducts,
} from '../controllers/products';

// The GraphQL schema
export const typeDefs = gql`
  input UserInput {
    email: String
    password: String
  }
  type Order {
    id: ID,
    itemId: String
    userId: String
  }
  type User {
    id: ID
    name: String
    email: String
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
  }
  type Mutation {
    addUser(user: UserInput): User 
    addOrder(itemId: ID): Order
  }
`;

export const resolvers = {
  Query: {
    products: async () => getProducts(),
  },
};
