import type { NextPage } from "next";
import { wrapper } from "../../app/store";
import React from "react";
import { useNotAuthen } from "../../helpers/useAuthen";
import { queryClient } from "../../graphql-client/config";
import { getPostQuery } from "../../graphql-client/queries";

type Props = {
  user: {
    id: string;
    email: string;
  };
  posts: any[];
};

const PostPage: NextPage<Props> = ({ posts }) => {
  useNotAuthen();
  console.log(posts);
  return <div>Posts Page</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      let posts = [];
      const dispatch = store.dispatch;
      const { accessToken } = store.getState().auth;
      console.log(
        "02 posts/index.tsx store state on the server:",
        store.getState().auth.user
      );
      if (accessToken) {
        const postsData = await queryClient(
          accessToken,
          dispatch,
          getPostQuery,
          {}
        );
        if (postsData) {
          posts = postsData.data.getPosts;
        }
      }
      return {
        props: {
          posts,
        },
      };
    }
);

export default PostPage;
