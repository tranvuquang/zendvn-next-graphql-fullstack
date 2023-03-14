import Link from "next/link";
// import dayjs from "dayjs";
// import viLocal from "dayjs/locale/vi";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { TypeComment } from "../../pages/posts/[postId]";

// dayjs.extend(relativeTime)

type PropsType = {
  listComments: any[];
};

const PostCommentList: React.FC<PropsType> = ({ listComments }) => {
  return (
    <div className="ass1-comments">
      <div className="ass1-comments__head">
        <div className="ass1-comments__title">
          {listComments?.length || 0} Bình luận
        </div>
        <div className="ass1-comments__options">
          <span>Sắp xếp theo:</span>
          <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon">
            <i className="icon-Upvote" />
          </a>
          <a href="#" className="ass1-comments__btn-down ass1-btn-icon">
            <i className="icon-Downvote" />
          </a>
          <a href="#" className="ass1-comments__btn-expand ass1-btn-icon">
            <i className="icon-Expand_all" />
          </a>
        </div>
      </div>
      {/*comment*/}

      {listComments.map((comment) => {
        return (
          <div key={comment.id} className="ass1-comments__section mt-0" >
            <div className="ass1-comments__content">
              <Link href="/users/[userId]" as={`/users/${comment.USERID}`}>
                <p className="ass1-comments__name">{comment.email}</p>
              </Link>
              <span className="ass1-comments__passed">{comment.createdAt}</span>
              <p>{comment.comment_content}</p>
              <hr />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostCommentList;
