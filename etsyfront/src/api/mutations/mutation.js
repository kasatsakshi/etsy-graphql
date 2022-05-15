import { gql } from 'graphql-request';

const loginMutation = gql`
mutation Mutation($input: LoginInput!) {
  login(input: $input) {
    _id
    name
    email
    gender
    phone
    avatarUrl
    birthday
    bio
    userStatus
    lastLoginAt
    lastLogoutAt
    currency
    userLevel
    address
    createdAt
    updatedAt
    token
  }
}
`;

const createFavoriteProductMutation = gql`
mutation Mutation($input: CreateFavoriteProductInput!) {
  createFavoriteProduct(input: $input) {
    _id
    userId
    inventoryId
    createdAt
    updatedAt
  }
}
`;

const deleteFavoriteProductMutation = gql`
mutation Mutation($input: DeleteFavoriteProductInput!) {
  deleteFavoriteProduct(input: $input) {
    _id
    userId
    inventoryId
    createdAt
    updatedAt
  }
}
`;

const updateCurrencyMutation = gql`
mutation Mutation($input: UpdateCurrencyInput!) {
  updateUserCurrency(input: $input) {
    _id
    name
    email
    gender
    phone
    avatarUrl
    birthday
    bio
    userStatus
    lastLoginAt
    lastLogoutAt
    currency
    userLevel
    address
    createdAt
    updatedAt
  }
}
`;

export {
  loginMutation, createFavoriteProductMutation,
  deleteFavoriteProductMutation, updateCurrencyMutation,
};
