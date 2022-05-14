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

export { getProductsQuery, getUserFavoritesQuery };
