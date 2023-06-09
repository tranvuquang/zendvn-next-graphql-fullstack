import Link from "next/link";
import { PostItem } from "../PostItem";
import { useState } from "react";
import { PostCommentList } from "../PostCommentList";
import { PostCommentForm } from "../PostCommentForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth, setFilterRedux } from "../../features/auth/authSlice";
import { mutationClient } from "../../graphql-client/config";
import {
  createCommentMutation,
  deleteAllCommentsMutation,
  deleteCommentMutation,
} from "../../graphql-client/mutations";
import { getPostQuery } from "../../graphql-client/queries";
import { filterDefaultData } from "../../features/auth/types";

type PropsType = {
  postDetailData: any;
};

const PostDetailContent: React.FC<PropsType> = ({ postDetailData }) => {
  const { user, accessToken, categories, filter } = useAppSelector(selectAuth);
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

  const handleDeleteComment = async (id: string) => {
    try {
      const { resData, reFetchData } = (await mutationClient(
        accessToken,
        dispatch,
        deleteCommentMutation,
        {
          id,
        },
        getPostQuery,
        { id: postDetailData.id }
      )) as any;
      if (resData && reFetchData) {
        setListComments(reFetchData.data.getPost.comments);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const hanldeDeleteAllComments = async () => {
    try {
      const { uid, id, comments } = postDetailData;
      if (user.id === uid) {
        const idArr = comments.map((comment: any) => {
          return comment.id;
        });
        const { resData, reFetchData } = (await mutationClient(
          accessToken,
          dispatch,
          deleteAllCommentsMutation,
          { idArr },
          getPostQuery,
          { id }
        )) as any;
        if (resData && reFetchData) {
          setListComments(reFetchData.data.getPost.comments);
        }
      } else {
        console.log("Access deniced");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onSetCategory = (id: string) => {
    dispatch(
      setFilterRedux({
        ...filter,
        limit: filterDefaultData.limit,
        searchStr: filterDefaultData.searchStr,
        page: filterDefaultData.page,
        categoryId: id,
      })
    );
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
              const cateFounder = categories.find((cate) => {
                return cate.id === obj;
              });
              return (
                <li key={obj}>
                  <Link
                    href="/posts"
                    style={{ fontSize: 18 }}
                    onClick={() => {
                      onSetCategory(obj);
                    }}
                  >
                    {cateFounder?.text}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>

      <PostCommentForm handleSubmitForm={handleSubmitForm} />

      <PostCommentList
        listComments={listComments}
        postId={postDetailData.uid}
        handleDeleteComment={handleDeleteComment}
        hanldeDeleteAllComments={hanldeDeleteAllComments}
      />
    </div>
  );
};

export default PostDetailContent;
