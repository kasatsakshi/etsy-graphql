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

const signupMutation = gql`
mutation Mutation($input: SignupInput!) {
  signup(input: $input) {
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

const isShopNameAvailableMutation = gql`
mutation Mutation($input: ShopAvailabilityInput!) {
  isShopNameAvailable(input: $input) {
    available
  }
}
`;

const createOrderMutation = gql`
mutation Mutation($input: CreateOrderInput!) {
  createOrder(input: $input) {
    order {
      _id
      finalAmount
      status
      orderId
      orderedDate
      userId
      createdAt
      updatedAt
    }
    orderDetails {
      _id
      orderQuantity
      orderId
      name
      description
      pictureUrl
      category
      price
      shopId
      inventoryId
      createdAt
      updatedAt
    }
  }
}
`;

const createShopMutation = gql`
mutation Mutation($input: CreateShopInput!) {
  createShop(input: $input) {
    user {
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
    shop {
      _id
      name
      description
      avatarUrl
      userId
      address
      createdAt
      updatedAt
    }
    inventory {
      _id
      name
      description
      pictureUrl
      category
      price
      quantity
      shopId
      createdAt
      updatedAt
    }
    totalSales
  }
}
`;

const createShopProductMutation = gql`
mutation Mutation($input: CreateShopProductInput!) {
  createShopProduct(input: $input) {
    user {
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
    shop {
      _id
      name
      description
      avatarUrl
      userId
      address
      createdAt
      updatedAt
    }
    inventory {
      _id
      name
      description
      pictureUrl
      category
      price
      quantity
      shopId
      createdAt
      updatedAt
    }
    totalSales
  }
}
`;

const userUpdateMutation = gql`
mutation Mutation($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
  loginMutation, signupMutation, createFavoriteProductMutation,
  deleteFavoriteProductMutation, updateCurrencyMutation, isShopNameAvailableMutation,
  createOrderMutation, createShopMutation, createShopProductMutation, userUpdateMutation,
};
