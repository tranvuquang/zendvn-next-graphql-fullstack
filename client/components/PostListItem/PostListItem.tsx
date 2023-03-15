import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth, setFilterRedux } from "../../features/auth/authSlice";
import { filterDefaultData} from "../../features/auth/types";
import { Button } from "../Button";

type PropsType = {
  children?: ReactNode;
};

const PostListItem: React.FC<PropsType> = (props) => {
  const { loading, filter } = useAppSelector(selectAuth);
  const { total, limit } = filter;
  const dispatch = useAppDispatch();
  const handleLoadMore = async () => {
    dispatch(
      setFilterRedux({
        ...filter,
        limit: limit + filterDefaultData.limit,
      })
    );
  };
  return (
    <div className="ass1-section__list">
      {props.children}
      <Button
        isLoading={loading}
        type="button"
        onClick={handleLoadMore}
        className="load-more ass1-btn"
        disabled={limit >= total ? true : false}
      >
        Xem thêm
      </Button>
    </div>
  );
};

export default PostListItem;
