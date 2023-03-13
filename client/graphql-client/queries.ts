import { gql } from "@apollo/client";

const getCategoriesQuery = gql`
  query getCategoriesQuery {
    getCategories {
      createdAt
      id
      text
      updatedAt
    }
  }
`;

const getUserQuery = gql`
  query getUserQuery($id: String) {
    getUser(id: $id) {
      accessToken
      createdAt
      email
      id
      updatedAt
    }
  }
`;

export { getUserQuery, getCategoriesQuery };
