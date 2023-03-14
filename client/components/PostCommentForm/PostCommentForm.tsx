import { useState } from "react";
import { Button } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";

type PropsType = {
  handleSubmitForm: (v: string, callback: () => void) => void;
};

const PostCommentForm: React.FC<PropsType> = ({ handleSubmitForm }) => {
  const { loading } = useAppSelector(selectAuth);
  const [commentValue, setCommentValue] = useState("");

  const handleChangeComment = (e: any) => {
    if (e.target.value.length <= 180) {
      setCommentValue(e.target.value);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleSubmitForm(commentValue, () => {
      setCommentValue("");
    });
  };
  return (
    <div className="ass1-add-comment">
      <form onSubmit={handleSubmit}>
        <input
          value={commentValue}
          onChange={handleChangeComment}
          type="text"
          className="form-control ttg-border-none"
          placeholder="Thêm một bình luận"
        />

        <div className="ass1-add-comment__content">
          <p className="ass1-add-comment__btn-save ass1-btn-icon">
            <span>{180 - commentValue.length}</span>
            <Button
              type="submit"
              disabled={
                commentValue.trim().length === 0 ||
                commentValue.trim().length >= 180 ||
                loading
              }
            >
              Send
            </Button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default PostCommentForm;
