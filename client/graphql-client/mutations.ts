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

export { loginMutation, updatePostMutation };
