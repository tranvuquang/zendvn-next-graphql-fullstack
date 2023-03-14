import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";
import { Button } from "../Button";
import { PostItem } from "../PostItem";

type PropsType = {
  listPosts: any[];
};

const pagesize = 3;

const PostListItem: React.FC<PropsType> = (props) => {
  const { loading } = useAppSelector(selectAuth);
  const [currPage, setCurrPage] = useState(1);
  const [listPosts, setListPosts] = useState(props.listPosts);

  function handleLoadMore() {
    // if (loading) return;
    // setLoading(true);
    // postService
    //   .getPostsPaging({ pagesize, currPage: currPage + 1 })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       const newPosts = res.posts || [];
    //       setListPosts([...listPosts, ...newPosts]);
    //       setCurrPage((prev) => prev + 1);
    //     }
    //   })
    //   .finally(() => setLoading(false));
  }

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
      >
        Xem thêm
      </Button>
    </div>
  );
};

export default PostListItem;
