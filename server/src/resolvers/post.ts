require("dotenv").config();
import { GraphQLError } from "graphql";
import db from "../models";
import { checkAuth } from "../middlewares/auth";

type Context = {
  accessToken: string;
};

const { posts } = db;

export const postResolver = {
  Query: {
    async getPosts(_parent: any, _args: any, _context: Context) {
      try {
        const postsFounder = await posts.findAll();
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
  },
};
