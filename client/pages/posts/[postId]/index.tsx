import React from "react";
import type { NextPage } from "next";
import { useNotAuthen } from "../../../helpers/useAuthen";
import { wrapper } from "../../../app/store";
import { queryClient } from "../../../graphql-client/config";
import { getPostQuery } from "../../../graphql-client/queries";
import { PostDetailContent } from "../../../components/PostDetailContent";

type Props = {
  post:any
};

const PostId: NextPage<Props> = ({post}) => {
  useNotAuthen();
  return <div className="container">
  <div className="row">
      <div className="col-lg-8">
          <PostDetailContent 
              postDetailData={post}
          />
      </div>
      <div className="col-lg-4">
          {/* <HomeSidebar userPosts={userPosts} /> */}
      </div>
  </div>
</div>;
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
        "02 posts/[postId]/index.tsx store state on the server: ",
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

export default PostId;
