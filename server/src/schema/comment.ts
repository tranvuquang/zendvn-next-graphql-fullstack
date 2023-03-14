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

  type Mutation {
    createComment(comment_content: String!, uid: String!, email: String!, pid: String!): Comment
    deleteComment(id:String!):Comment!
    deleteAllComments(idArr:[String]!):String!
  }
`;
