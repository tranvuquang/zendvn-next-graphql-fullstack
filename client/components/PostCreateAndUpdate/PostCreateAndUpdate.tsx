import { useRouter } from "next/router";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";
import { mutationClient } from "../../graphql-client/config";
import { updatePostMutation } from "../../graphql-client/mutations";
import { getPostsQuery } from "../../graphql-client/queries";
import { PostDetailForm } from "../PostDetailForm";
import { PostDetailSidebar } from "../PostDetailSidebar";

type PropsType = {
  post?: any;
};

const postDataDefaultValue = {
  id: "",
  uid: "",
  email: "",
  post_content: "",
  category: [],
};

const PostCreateAndUpdate: React.FC<PropsType> = ({
  post = postDataDefaultValue,
}) => {
  const { push } = useRouter();
  const { accessToken, user } = useAppSelector(selectAuth);
  const dispath = useAppDispatch();
  const [postData, setPostData] = useState({
    id: post.id,
    uid: post.uid,
    email: post.email,
    post_content: post.post_content,
    category: post.category,
  });
  const { id, uid, post_content, category } = postData;
  const onChangeDetailForm = (key: string, value: any) => {
    setPostData({
      ...postData,
      [key]: value,
    });
  };
  const handleSubmitPost = async () => {
    if (id && uid) {
      const { resData, reFetchData } = (await mutationClient(
        accessToken,
        dispath,
        updatePostMutation,
        postData,
        getPostsQuery
      )) as any;
      if (resData && reFetchData) {
        push("/posts");
      }
    } else {
      console.log("create");
      const data = {
        uid: user.id,
        email: user.email,
        post_content,
        category,
      };
      console.log(data);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostDetailForm
            post_content={postData.post_content}
            onChangeDetailForm={onChangeDetailForm}
          />
        </div>
        <div className="col-lg-4">
          <PostDetailSidebar
            category={postData.category}
            handleSubmitPost={handleSubmitPost}
            onChangeDetailForm={onChangeDetailForm}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCreateAndUpdate;
