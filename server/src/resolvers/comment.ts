require("dotenv").config();
import { GraphQLError } from "graphql";
import db from "../models";
import { checkAuth } from "../middlewares/auth";

type Context = {
  accessToken: string;
};

const { comments } = db;

export const commentResolver = {
  Mutation: {
    async createComment(
      _parent: any,
      { uid, email, comment_content, pid }: any,
      { accessToken }: Context
    ) {
      try {
        if (!checkAuth(accessToken)) {
          throw new GraphQLError(`Token is invalid`);
        }
        const comment = await comments.create({
          uid,
          email,
          comment_content,
          pid,
        });
        return comment;
      } catch (error) {
        console.log(error.message);
        throw new GraphQLError(error.message);
      }
    },
    async deleteComment(_parent: any, { id }: any, { accessToken }: Context) {
      try {
        if (!checkAuth(accessToken)) {
          throw new GraphQLError(`Token is invalid`);
        }
        const commentFounder = await comments.findByPk(id);
        const comment = await comments.destroy({
          where: {
            id,
          },
        });
        if (comment && commentFounder) {
          return commentFounder;
        }
      } catch (error) {
        console.log(error.message);
        throw new GraphQLError(error.message);
      }
    },
    async deleteAllComments(
      _parent: any,
      { idArr }: any,
      { accessToken }: Context
    ) {
      try {
        if (!checkAuth(accessToken)) {
          throw new GraphQLError(`Token is invalid`);
        }
        const res = await comments.destroy({ where: { id: idArr } });
        if (!res) {
          throw new GraphQLError(`Internal server error`);
        }
        return "Delete All Comments Success";
      } catch (error) {
        console.log(error.message);
        throw new GraphQLError(error.message);
      }
    },
  },
};
