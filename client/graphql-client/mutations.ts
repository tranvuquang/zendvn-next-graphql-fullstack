import { gql } from "@apollo/client";

const loginMutation = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      accessToken
    }
  }
`;

const updatePostMutation = gql`
  mutation updatePostMutation(
    $id: String!
    $post_content: String!
    $uid: String!
    $email: String!
    $category: [String]!
  ) {
    updatePost(
      id: $id
      post_content: $post_content
      uid: $uid
      email: $email
      category: $category
    ) {
      category
      email
      id
      post_content
      uid
      createdAt
      updatedAt
    }
  }
`;

const createCommentMutation = gql`
  mutation createCommentMutation(
    $comment_content: String!
    $uid: String!
    $email: String!
    $pid: String!
  ) {
    createComment(
      comment_content: $comment_content
      uid: $uid
      email: $email
      pid: $pid
    ) {
      comment_content
      email
      id
      pid
      uid
      createdAt
      updatedAt
    }
  }
`;

const createPostMutation = gql`
  mutation createPostMutation(
    $post_content: String!
    $uid: String!
    $email: String!
    $category: [String]!
  ) {
    createPost(
      post_content: $post_content
      uid: $uid
      email: $email
      category: $category
    ) {
      id
      uid
      email
      post_content
      category
      createdAt
      updatedAt
    }
  }
`;

const deleteCommentMutation = gql`
  mutation deleteCommentMutation($id: String!) {
    deleteComment(id: $id) {
      comment_content
      createdAt
      email
      id
      pid
      uid
      updatedAt
    }
  }
`;

const deleteAllCommentsMutation = gql`
  mutation Mutation($idArr: [String]!) {
    deleteAllComments(idArr: $idArr)
  }
`;

const deletePostMutation = gql`
  mutation deletePostMutation($id: String!, $idArr: [String]) {
    deletePost(id: $id, idArr: $idArr) {
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

export {
  loginMutation,
  updatePostMutation,
  createCommentMutation,
  createPostMutation,
  deleteCommentMutation,
  deleteAllCommentsMutation,
  deletePostMutation,
};
