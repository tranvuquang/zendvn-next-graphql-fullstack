import type { NextPage } from "next";

type Props = {
  user: {
    id: string;
    email: string;
  };
  post: any;
};
import { wrapper } from "../../../app/store";
import React from "react";
import { queryClient } from "../../../graphql-client/config";
import { getPostQuery } from "../../../graphql-client/queries";
import { PostCreateAndUpdate } from "../../../components/PostCreateAndUpdate";
import { useNotAuthen } from "../../../helpers/useAuthen";

const UpdatePost: NextPage<Props> = ({ post = {}, user }) => {
  useNotAuthen();
  return <PostCreateAndUpdate post={post}/>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      const { dispatch, getState } = store;
      const {
        auth: { accessToken, user },
      } = getState();
      let post = {};
      const { postId } = query;
      console.log(
        "02 posts/[postId]/update.tsx store state on the server: ",
        user
      );

      if (postId) {
        const getPostData = await queryClient(
          accessToken,
          dispatch,
          getPostQuery,
          {
            id: postId,
          }
        );
        if (getPostData) {
          post = getPostData.data.getPost;
        }
      }
      return {
        props: {
          post,
        },
      };
    }
);

export default UpdatePost;
