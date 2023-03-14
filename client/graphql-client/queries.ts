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

const getPostsQuery = gql`
  query getPostsQuery($page: Int, $limit: Int) {
  getPosts(page: $page, limit: $limit) {
    posts {
      email
      post_content
      comments {
        comment_content
        createdAt
        email
        id
        pid
        uid
        updatedAt
      }
      category
      createdAt
      id
      uid
      updatedAt
    }
    limit
    page
    total
  }
}
`;
const getPostQuery = gql`
  query getPostQuery($id: String!) {
    getPost(id: $id) {
      category
      createdAt
      email
      id
      post_content
      uid
      updatedAt
      comments {
        comment_content
        createdAt
        email
        id
        pid
        uid
        updatedAt
      }
    }
  }
`;

export { getUserQuery, getCategoriesQuery, getPostsQuery, getPostQuery };
