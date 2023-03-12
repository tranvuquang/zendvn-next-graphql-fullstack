import type { NextPage } from "next";
import { wrapper } from "../app/store";
import React from "react";
import { useNotAuthen } from "../helpers/useAuthen";

type Props = {
  user: {
    id: string;
    email: string;
  };
};

const PostPage: NextPage<Props> = (props) => {
  useNotAuthen();
  return <div>Posts Page</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      console.log("store state on the server posts.tsx", store.getState().auth);
      return {
        props: {},
      };
    }
);

export default PostPage;
