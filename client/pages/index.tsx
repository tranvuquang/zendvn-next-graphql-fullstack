import type { NextPage } from "next";

type Props = {
  user: {
    id: string;
    email: string;
  };
};
import { wrapper } from "../app/store";
import React from "react";

const Home: NextPage<Props> = (props) => {
  return (
    <div >
      index
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      console.log("store state on the server index.tsx", store.getState().auth);
      return {
        props: {
        }, 
      };
    }
);

export default Home;
