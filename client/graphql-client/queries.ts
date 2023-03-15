import { gql } from "@apollo/client";

const getCategoriesQuery = gql`
  query getCategoriesQuery {
    getCategories {
      id
      text
      createdAt
      updatedAt
    }
  }
`;

const getUserQuery = gql`
  query getUserQuery($id: String) {
    getUser(id: $id) {
      id
      email
      accessToken
      createdAt
      updatedAt
    }
  }
`;

const getPostsQuery = gql`
  query getPostsQuery(
    $page: Int
    $limit: Int
    $categoryId: String
    $searchStr: String
  ) {
    getPosts(
      page: $page
      limit: $limit
      categoryId: $categoryId
      searchStr: $searchStr
    ) {
      filter {
        page
        limit
        total
        searchStr
        categoryId
      }
      posts {
        id
        post_content
        uid
        email
        category
        createdAt
        updatedAt
        comments {
          id
          comment_content
          pid
          uid
          email
          createdAt
          updatedAt
        }
      }
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
