import Link from "next/link";
import { Button } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";

type PropsType = {
  listComments: any[];
  postId?: string;
  handleDeleteComment?: (id: string) => void;
  hanldeDeleteAllComments?: () => void;
};

const PostCommentList: React.FC<PropsType> = ({
  listComments,
  postId = "",
  handleDeleteComment = (id: string) => {},
  hanldeDeleteAllComments = () => {},
}) => {
  const { user, loading } = useAppSelector(selectAuth);

  const onDeleteComment = (id: string) => {
    handleDeleteComment(id);
  };
  return (
    <div className="ass1-comments">
      <div className="ass1-comments__head">
        <div className="ass1-comments__title">
          {listComments?.length || 0} Bình luận
        </div>
        {user.id === postId && listComments.length > 0 && (
          <Button
            className="ass1-comments__options"
            variant="danger"
            onClick={hanldeDeleteAllComments}
          >
            Delete All Comments
          </Button>
        )}
      </div>
      {/*comment*/}

      {listComments.map((comment) => {
        return (
          <div key={comment.id} className="ass1-comments__section mt-0">
            <div className="ass1-comments__content">
              <Link href="/users/[userId]" as={`/users/${comment.uid}`}>
                <p className="ass1-comments__name">{comment.email}</p>
              </Link>

              <span className="ass1-comments__passed">{comment.createdAt}</span>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>{comment.comment_content}</p>{" "}
                {(user.id === postId || user.id === comment.uid) && (
                  <Button
                    disabled={loading}
                    variant="warning"
                    onClick={() => {
                      onDeleteComment(comment.id);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </div>

              <hr />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostCommentList;
