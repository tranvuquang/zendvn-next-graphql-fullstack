import Link from "next/link";
import { PostItem } from "../PostItem";
import { useState } from "react";
import { PostCommentList } from "../PostCommentList";
import { PostCommentForm } from "../PostCommentForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";
import { mutationClient } from "../../graphql-client/config";
import { createCommentMutation } from "../../graphql-client/mutations";
import { getPostQuery } from "../../graphql-client/queries";

type PropsType = {
  postDetailData: any;
};

const PostDetailContent: React.FC<PropsType> = ({ postDetailData }) => {
  const { user, accessToken } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [listComments, setListComments] = useState(postDetailData.comments);

  const handleSubmitForm = async (
    commentValue: string,
    callback: () => void
  ) => {
    try {
      if (commentValue) {
        const comment = {
          pid: postDetailData.id,
          uid: user.id,
          email: user.email,
          comment_content: commentValue,
        };
        const { resData, reFetchData } = (await mutationClient(
          accessToken,
          dispatch,
          createCommentMutation,
          comment,
          getPostQuery,
          { id: postDetailData.id }
        )) as any;
        if (resData && reFetchData) {
          setListComments(reFetchData.data.getPost.comments);
          callback();
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="ass1-section__list">
      <PostItem post={postDetailData} />

      <div className="list-categories">
        <h5>
          <strong>Danh mục: </strong>
        </h5>
        <ul>
          {postDetailData.category &&
            postDetailData.category.map((obj: string) => {
              return (
                <li key={obj}>
                  <Link href="/categories/[cateId]" as={`/categories/${obj}`}>
                    {obj}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>

      <PostCommentForm handleSubmitForm={handleSubmitForm} />

      <PostCommentList listComments={listComments} postId={postDetailData.uid}/>
    </div>
  );
};

export default PostDetailContent;
