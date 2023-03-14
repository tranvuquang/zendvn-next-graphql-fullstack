import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";

type PropsType = {
  post?: any;
};

const PostItem: React.FC<PropsType> = ({ post }) => {
  const { user } = useAppSelector(selectAuth);
  const { postId } = useRouter().query;
  return (
    <div className={"ass1-section__item"}>
      <div className="ass1-section">
        <div className="ass1-section__head">
          <div>
            <Link
              href={`/users/${post.uid}`}
              className="ass1-section__avatar ass1-avatar"
            >
              {post.email}
            </Link>
            <span className="ass1-section__passed">{post.createdAt}</span>
          </div>
        </div>
        <div className="ass1-section__content">
          <div className="ass1-section__image">
            {post.id && <p>{post.post_content}</p>}
          </div>
        </div>
        <div
          className="ass1-section__footer"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          {postId ? (
            <Link href={`/posts/`}>
              <Button>Back</Button>
            </Link>
          ) : (
            <Link href={`/posts/${post.id}`}>
              <Button>View</Button>
            </Link>
          )}
          {user.id === post.uid && (
            <Link href={`/posts/${post.id}/update`}>
              <Button variant="warning" className="mx-4">
                Update
              </Button>
            </Link>
          )}
          {user.id === post.uid && <Button variant="danger">Delete</Button>}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
