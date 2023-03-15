import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Form from "react-bootstrap/Form";
import { selectAuth, setFilterRedux } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import { filterDefaultData } from "../../features/auth/types";

type Props = {};

export default function HeaderMenu(props: Props) {
  const { categories, filter } = useAppSelector(selectAuth);
  const { categoryId, searchStr } = filter;
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState(categoryId);
  const handleChange = (e: any) => {
    const value = e.target.value;

    dispatch(
      setFilterRedux({
        ...filter,
        limit: filterDefaultData.limit,
        searchStr: filterDefaultData.searchStr,
        page: filterDefaultData.page,
        categoryId: e.target.value,
      })
    );
    setCategory(value);
  };

  useEffect(() => {
    if (searchStr) {
      setCategory("");
    }
    setCategory(categoryId);
  }, [categoryId, searchStr]);

  return (
    <Form.Select
      aria-label="Default select example"
      style={{ width: 150 }}
      value={category}
      onChange={handleChange}
    >
      <option value="">All</option>
      {categories.map((category: any) => {
        return (
          <option key={category.id} value={category.id}>
            {category.text}
          </option>
        );
      })}
    </Form.Select>
  );
}
