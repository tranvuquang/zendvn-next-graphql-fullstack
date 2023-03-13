require("dotenv").config();
import { GraphQLError } from "graphql";
import db from "../models";
import { checkAuth } from "../middlewares/auth";

type Context = {
  accessToken: string;
};

const { categories } = db;

export const categoryResolver = {
  Query: {
    async getCategories(_parent: any, _args: any, _context: Context) {
      try {
        const categoriesFounder = await categories.findAll();
        if (categoriesFounder.lenth===0) {
          throw new GraphQLError(`Categories list not found!`);
        }
        return categoriesFounder.map((category: any) => {
          return {
            id: category.id,
            text: category.text,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
          };
        });
      } catch (error) {
        console.log(error.message);
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    async createCategory(
      _parent: any,
      { text }: any,
      { accessToken }: Context
    ) {
      try {
        if (!checkAuth(accessToken)) {
          throw new GraphQLError(`Token is invalid`);
        }
        const categoryFounder = await categories.findOne({
          where: {
            text,
          },
        });
        if (categoryFounder) {
          throw new GraphQLError(`Category already exists`);
        }
        const category = await categories.create({
          text,
        });
        return {
          id: category.id,
          text,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        };
      } catch (error) {
        console.log(error.message);
        throw new GraphQLError(error.message);
      }
    },
  },
};
