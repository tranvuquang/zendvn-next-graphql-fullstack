import { userResolver } from "./user";
import { categoryResolver } from "./category";

import { GraphQLDateTime } from "graphql-iso-date";

const customScalarResolver = {
  Date: GraphQLDateTime,
};

const resolvers = [customScalarResolver, userResolver,categoryResolver];

export default resolvers;
