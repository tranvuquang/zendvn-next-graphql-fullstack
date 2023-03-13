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

const getPostQuery = gql`
  query getPostsQuery {
    getPosts {
      category
      createdAt
      email
      id
      post_content
      uid
      updatedAt
    }
  }
`;

export { getUserQuery, getCategoriesQuery, getPostQuery };
