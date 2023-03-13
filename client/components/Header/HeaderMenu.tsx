import Link from "next/link";
import { useAppSelector } from "../../app/hooks";
import Dropdown from "react-bootstrap/Dropdown";
import { selectAuth } from "../../features/auth/authSlice";
type Props = {};

export default function HeaderMenu(props: Props) {
  const { categories } = useAppSelector(selectAuth);

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="warning"
        id="dropdown-basic"
        style={{
          color: "unset",
          border: "none",
          backgroundColor: "transparent",
        }}
      >
        Danh muc
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {categories.map((cate) => {
          return (
            <Dropdown.Item key={cate.id}>
              <Link href={`/posts/categories/${cate.id}`}>
                <a>{cate.text}</a>
              </Link>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
