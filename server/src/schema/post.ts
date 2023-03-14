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
    comments:[Comment]
  }
  type PostData{
    posts:[Post]!
    page:Int
    limit:Int
    total:Int
  }

  type Query {
    getPosts(page:Int, limit:Int):PostData!
    getPost(id:String!):Post
  }
 
  type Mutation {
    createPost(post_content: String!, uid: String!, email: String!,category:[String]!): Post
    updatePost(id:String!, post_content: String!, uid: String!, email: String!, category:[String]!): Post
    deletePost(id:String!, idArr:[String]):Post
  }
`;
