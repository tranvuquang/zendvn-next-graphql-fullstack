import type { NextPage } from "next";
import { wrapper } from "../../app/store";
import React from "react";
import { useNotAuthen } from "../../helpers/useAuthen";
import { queryClient } from "../../graphql-client/config";
import { getPostsQuery } from "../../graphql-client/queries";
import { PostListItem } from "../../components/PostListItem";

type Props = {
  user: {
    id: string;
    email: string;
  };
  posts: any[];
  total: number;
};

const PostPage: NextPage<Props> = ({ posts = [], total }) => {
  useNotAuthen();
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostListItem listPosts={posts} total={total}/>
        </div>
        <div className="col-lg-4">
          {/* <HomeSidebar userPosts={userPosts} /> */}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      const { dispatch, getState } = store;
      let posts = [];
      let total = 1;
      const { accessToken } = getState().auth;
      console.log(
        "02 posts/index.tsx store state on the server:",
        store.getState().auth.user
      );
      if (accessToken) {
        const postsData = await queryClient(
          accessToken,
          dispatch,
          getPostsQuery,
          { page: 1, limit: 3 }
        );
        if (postsData) {
          posts = postsData.data.getPosts.posts;
          total = postsData.data.getPosts.total;
        }
      }
      return {
        props: {
          posts,
          total,
        },
      };
    }
);

export default PostPage;
