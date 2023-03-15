import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth, setFilterRedux } from "../../features/auth/authSlice";
import { filterDefaultData } from "../../features/auth/types";

export default function HeaderSearch() {
  const { filter } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [queryStr, setQueryStr] = useState(filter.searchStr);

  const typingTimeoutRef = useRef(null);

  const handleSearchTermChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setQueryStr(value);
    if (!dispatch) {
      return;
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      dispatch(
        setFilterRedux({
          ...filter,
          limit: filterDefaultData.limit,
          searchStr: evt.target.value.toLowerCase(),
          page: filterDefaultData.page,
          categoryId: filterDefaultData.categoryId,
        })
      );
    }, 600) as any;
  };

  return (
    <div className="ass1-header__search">
      <form>
        <label>
          <input
            value={queryStr}
            onChange={handleSearchTermChange}
            type="search"
            className="form-control"
            placeholder="Nhập từ khóa ..."
          />
          <i className="icon-Search" />
        </label>
      </form>
    </div>
  );
}
