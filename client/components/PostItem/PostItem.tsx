import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";
import { mutationClient } from "../../graphql-client/config";
import { deletePostMutation } from "../../graphql-client/mutations";
import { getPostsQuery } from "../../graphql-client/queries";

type PropsType = {
  post?: any;
};

const PostItem: React.FC<PropsType> = ({ post }) => {
  const { user, accessToken } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const {
    query: { postId },
    push,
  } = useRouter();

  const onDeletePost = async () => {
    const { id, comments } = post;
    const idArr = comments.map((comment: any) => {
      return comment.id;
    });
    try {
      const { resData } = (await mutationClient(
        accessToken,
        dispatch,
        deletePostMutation,
        {
          id,
          idArr,
        },
        getPostsQuery,
        { page: 1, limit: 3 }
      )) as any;
      if (resData) {
        push("/posts");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
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
            <span className="ass1-section__passed">
              {" "}
              {moment(post.createdAt, "YYYYMMDD").fromNow()} - {post.createdAt}
            </span>
          </div>
        </div>
        <div className="ass1-section__content">
          <div className="ass1-section__image">
            {post.id && <p>{post.post_content}</p>}
          </div>
        </div>

        <div
          className="ass1-section__footer"
          style={{
            display: "flex",
            justifyContent: postId ? "flex-end" : "space-between",
          }}
        >
          {!postId && <p>{post.comments.length} Bình luận</p>}
          <div>
            {postId ? (
              <Link href={`/posts/`}>
                <Button>Back</Button>
              </Link>
            ) : (
              <Link href={`/posts/${post.id}`}>
                <Button>View</Button>
              </Link>
            )}
            {postId && user.id === post.uid && (
              <Link href={`/posts/${post.id}/update`}>
                <Button variant="warning" className="mx-4">
                  Update
                </Button>
              </Link>
            )}
            {postId && user.id === post.uid && (
              <Button variant="danger" onClick={onDeletePost}>
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
