export const typeCatgory = `#graphql
  scalar Date

  type Category {
    id: String!
    text: String!
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getCategories:[Category]
  }
 
  type Mutation {
    createCategory(text: String!): Category
  }
`;