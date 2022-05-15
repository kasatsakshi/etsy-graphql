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

export { getProductsQuery, getUserFavoritesQuery, ordersQuery };
