import { useRef } from "react";

type PropsType = {
  post_content: string;
  onChangeDetailForm: (key: string, value: any) => void;
};

const PostDetailForm: React.FC<PropsType> = ({
  post_content,
  onChangeDetailForm,
}) => {
  const handleOnChange = (key: string) => (e: any) => {
    const value = e.target.value;
    onChangeDetailForm(key, value);
  };

  return (
    <div className="ass1-section ass1-section__edit-post">
      <div className="ass1-section__content">
        <form action="#">
          <div className="form-group">
            <textarea
              value={post_content}
              onChange={handleOnChange("post_content")}
              placeholder="Mô tả ..."
              className="form-control ttg-border-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostDetailForm;
