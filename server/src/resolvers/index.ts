import { GraphQLDateTime } from "graphql-iso-date";

import { userResolver } from "./user";
import { categoryResolver } from "./category";
import { postResolver } from "./post";
import { commentResolver } from "./comment";

const customScalarResolver = {
  Date: GraphQLDateTime,
};

const resolvers = [
  customScalarResolver,
  userResolver,
  categoryResolver,
  postResolver,
  commentResolver,
];

export default resolvers;
