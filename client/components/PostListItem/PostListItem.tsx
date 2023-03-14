import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";
import { queryClient } from "../../graphql-client/config";
import { getPostsQuery } from "../../graphql-client/queries";
import { Button } from "../Button";
import { PostItem } from "../PostItem";

type PropsType = {
  listPosts: any[];
  total: number;
};

const limit = 3;

const PostListItem: React.FC<PropsType> = (props) => {
  const { loading, accessToken } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [currPage, setCurrPage] = useState(1);
  const [listPosts, setListPosts] = useState(props.listPosts);

  const totalPages = Math.ceil(props.total / limit);

  const handleLoadMore = async () => {
    try {
      const resData = await queryClient(accessToken, dispatch, getPostsQuery, {
        page: currPage + 1,
        limit,
      });
      if (resData) {
        setListPosts([...listPosts, ...resData.data.getPosts.posts]);
        setCurrPage(currPage + 1);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="ass1-section__list">
      {listPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}

      <Button
        isLoading={loading}
        type="button"
        onClick={handleLoadMore}
        className="load-more ass1-btn"
        disabled={currPage >= totalPages ? true : false}
      >
        Xem thêm
      </Button>
    </div>
  );
};

export default PostListItem;
