import type { NextPage } from "next";

type Props = {
  user: {
    id: string;
    email: string;
  };
  post: any;
};

const postDataDefaultValue = {
  id: "",
  uid: "",
  email: "",
  post_content: "",
  category: [],
};

import { wrapper } from "../../app/store";
import React from "react";
import { PostCreateAndUpdate } from "../../components/PostCreateAndUpdate";
import { useNotAuthen } from "../../helpers/useAuthen";

const CreatePost: NextPage<Props> = ({ post = postDataDefaultValue }) => {
  useNotAuthen();
  return <PostCreateAndUpdate post={post} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      console.log(
        "02 posts/create.tsx store state on the server: ",
        store.getState().auth.user
      );
      return {
        props: {},
      };
    }
);

export default CreatePost;
