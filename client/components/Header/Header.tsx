import axios from "axios";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectAuth,
  setAccessTokenRedux,
  setUserRedux,
} from "../../features/auth/authSlice";
import { userDefaultData } from "../../features/auth/types";
import HeaderMenu from "./HeaderMenu";
import HeaderSearch from "./HeaderSearch";

type Props = {};

export default function Header(props: Props) {
  const router = useRouter();
  const { user, accessToken } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    const res = await axios.post("/api/logout");
    if (res.data.status === 200) {
      dispatch(setAccessTokenRedux(""));
      dispatch(setUserRedux(userDefaultData));
      deleteCookie("accessToken");
      router.push("/login");
    }
  };
  return (
    <header>
      <div className="ass1-header">
        <div className="container">
          <Link href="/">
            <a className="ass1-logo">ZendVn Meme</a>
          </Link>
          <HeaderMenu />
          <HeaderSearch />
          <Link href={"/posts"}>
            <a className="ass1-header__btn-upload ass1-btn">
              <i className="icon-Upvote" /> Upload
            </a>
          </Link>

          {user && accessToken ? (
            <div className="wrapper-user">
              <Link href={`/users/${user.id}`}>
                <a className="user-header">
                  <span className="avatar"></span>
                  <span className="email">{user.email}</span>
                </a>
              </Link>
              <div onClick={handleLogout} className="logout">
                Logout
              </div>
            </div>
          ) : (
            <Link href="/login">
              <a className="ass1-header__btn-upload ass1-btn">Login</a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
