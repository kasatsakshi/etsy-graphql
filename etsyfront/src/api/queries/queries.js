import { gql } from 'graphql-request';

const getProductsQuery = gql`
  {
    products{
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
  }
`;

const getUserFavoritesQuery = gql`
  {
    userFavorites{
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
  }
`;

const ordersQuery = gql`
  {
    orders {
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

const userQuery = gql`
{
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
}
`;

const searchProductsByNameQuery = gql`
query Query($input: ProductNameInput!) {
    searchProductsByName(input: $input){
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
  }
`;

const getShopQuery = gql`
query Query {
  getShop {
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

const getShopCateogoriesQuery = gql`
query Query($input: ShopCategoriesInput!) {
    getShopCategories(input: $input){
      default
      custom {
        _id
        name
        shopId
      }
    }
  }
`;

export {
  getProductsQuery, getUserFavoritesQuery, searchProductsByNameQuery, ordersQuery, userQuery,
  getShopQuery, getShopCateogoriesQuery,
};
