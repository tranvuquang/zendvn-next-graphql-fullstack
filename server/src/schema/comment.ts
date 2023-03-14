export const typeComment = `#graphql
  scalar Date

  type Comment {
    id: String!
    pid: String!
    uid: String!
    email: String!
    comment_content: String!
    createdAt: Date
    updatedAt: Date
  }

  # type Query {
  #   # getPosts:[Post]
  #   # getPost(id:String!):Post
  # }
 
  type Mutation {
    createComment(comment_content: String!, uid: String!, email: String!, pid: String!): Comment
  }
`;
