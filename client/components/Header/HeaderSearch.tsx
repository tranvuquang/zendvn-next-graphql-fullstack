import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth, setFilterRedux } from "../../features/auth/authSlice";
import { filterDefaultData } from "../../features/auth/types";

export default function HeaderSearch() {
  const { filter } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [queryStr, setQueryStr] = useState(filter.searchStr);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQueryStr(e.target.value);
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(
      setFilterRedux({
        ...filter,
        limit: filterDefaultData.limit,
        searchStr: queryStr.toLowerCase(),
        page: filterDefaultData.page,
        categoryId: filterDefaultData.categoryId,
      })
    );
    setQueryStr("");
  }



  return (
    <div className="ass1-header__search">
      <form action="#" onSubmit={handleSubmit}>
        <label>
          <input
            value={queryStr}
            onChange={onChange}
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
