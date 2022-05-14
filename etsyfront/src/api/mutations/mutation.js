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

export { loginMutation };
