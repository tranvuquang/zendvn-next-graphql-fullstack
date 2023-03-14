export const typePost = `#graphql
  scalar Date

  type Post {
    id: String!
    uid: String!
    email: String!
    post_content: String!
    category:[String]!
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getPosts:[Post]
    getPost(id:String!):Post
  }
 
  type Mutation {
    createPost(post_content: String!, uid: String!, email: String!,category:[String]!): Post
    updatePost(id:String!, post_content: String!, uid: String!, email: String!, category:[String]!): Post
  }
`;
