require("dotenv").config();
import { GraphQLError } from "graphql";
import db from "../models";
import { checkAuth } from "../middlewares/auth";

type Context = {
  accessToken: string;
};

const { posts, comments } = db;

export const postResolver = {
  Post: {
    comments: async (parent: any, _args: any, { accessToken }: Context) => {
      try {
        if (!checkAuth(accessToken)) {
          throw new GraphQLError(`Token is invalid`);
        }
        const commentsFounder = await comments.findAll({
          where: { pid: parent.id },
          order: [["createdAt", "DESC"]],
        });
        return commentsFounder.map((comment: any) => {
          return {
            id: comment.id,
            uid: comment.uid,
            email: comment.email,
            comment_content: comment.comment_content,
            pid: comment.pid,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
          };
        });
      } catch (error) {
        console.log(error.message);
        throw new GraphQLError(error.message);
      }
    },
  },
  Query: {
    async getPosts(_parent: any, _args: any, _context: Context) {
      try {
        const postsFounder = await posts.findAll({
          order: [["createdAt", "DESC"]],
        });
        if (postsFounder.lenth === 0) {
          throw new GraphQLError(`Posts list not found!`);
        }
        return postsFounder.map((post: any) => {
          return {
            id: post.id,
            uid: post.uid,
            email: post.email,
            post_content: post.post_content,
            category: post.category,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          };
        });
      } catch (error) {
        console.log(error.message);
        throw new GraphQLError(error.message);
      }
    },
    async getPost(_parent: any, { id }: any, _context: Context) {
      try {
        const postFounder = await posts.findByPk(id);
        if (!postFounder) {
          throw new GraphQLError(`Post not found!`);
        }
        return {
          id: postFounder.id,
          uid: postFounder.uid,
          email: postFounder.email,
          post_content: postFounder.post_content,
          category: postFounder.category,
          createdAt: postFounder.createdAt,
          updatedAt: postFounder.updatedAt,
        };
      } catch (error) {
        console.log(error.message);
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    async createPost(
      _parent: any,
      { uid, email, post_content, category }: any,
      { accessToken }: Context
    ) {
      try {
        if (!checkAuth(accessToken)) {
          throw new GraphQLError(`Token is invalid`);
        }
        const post = await posts.create({ uid, email, post_content, category });

        return {
          id: post.id,
          uid,
          email,
          post_content,
          category,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        };
      } catch (error) {
        console.log(error.message);
        throw new GraphQLError(error.message);
      }
    },
    async updatePost(
      _parent: any,
      { id, post_content, category }: any,
      { accessToken }: Context
    ) {
      try {
        if (!checkAuth(accessToken)) {
          throw new GraphQLError(`Token is invalid`);
        }
        const postUpdated = await posts.update(
          { post_content, category },
          { where: { id }, returning: true, plain: true }
        );
        const post = postUpdated[1].dataValues;
        return post;
      } catch (error) {
        console.log(error.message);
        throw new GraphQLError(error.message);
      }
    },
    async deletePost(
      _parent: any,
      { id, idArr }: any,
      { accessToken }: Context
    ) {
      try {
        if (!checkAuth(accessToken)) {
          throw new GraphQLError(`Token is invalid`);
        }
        const postFounder = await posts.findByPk(id);
        const commentsFounder = await comments.destroy({
          where: { id: idArr },
        });
        const post = await posts.destroy({ where: { id } });
        if (postFounder && post && commentsFounder) {
          return postFounder;
        }
        throw new GraphQLError(`Internal server error`);
      } catch (error) {
        console.log(error.message);
        throw new GraphQLError(error.message);
      }
    },
  },
};
