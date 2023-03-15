import type { NextPage } from "next";
import { wrapper } from "../../app/store";
import React, { useEffect, useState } from "react";
import { useNotAuthen } from "../../helpers/useAuthen";
import { queryClient } from "../../graphql-client/config";
import { getPostsQuery } from "../../graphql-client/queries";
import { PostListItem } from "../../components/PostListItem";
import { selectAuth, setFilterRedux } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PostItem } from "../../components/PostItem";

type Props = {
  user: {
    id: string;
    email: string;
  };
};

const PostPage: NextPage<Props> = (props) => {
  useNotAuthen();
  const { filter, accessToken } = useAppSelector(selectAuth);
  const { page, limit, categoryId, searchStr } = filter;
  const dispatch = useAppDispatch();

  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    (async () => {
      const postsData = await queryClient(
        accessToken,
        dispatch,
        getPostsQuery,
        { page, limit, categoryId, searchStr }
      );
      if (postsData) {
        const { posts, filter } = postsData.data.getPosts;
        setPostsList(posts);
        dispatch(setFilterRedux(filter));
      }
    })();
  }, [accessToken, categoryId, dispatch, limit, page, searchStr]);

  return (
    <div className="container">
      <div className="header-search" style={{ padding: "30px 0" }}>
        <h3>
          Từ khóa tìm kiếm: <strong>{searchStr}</strong>
        </h3>
        <p>
          Danh muc tim kiem:{" "}
          {filter.categoryId === "" ? "Tat ca" : filter.categoryId}
        </p>
        <p>Tìm kiếm được ({filter.total}) kết quả</p>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <PostListItem>
            {postsList.map((post: any) => (
              <PostItem key={post.id} post={post} />
            ))}
          </PostListItem>
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
      console.log(
        "02 posts/index.tsx store state on the server:",
        store.getState().auth.user
      );
      return {
        props: {},
      };
    }
);

export default PostPage;
