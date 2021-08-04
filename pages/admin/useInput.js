import React from "react";
import useInputs from "../../hook/useInputs";

export const useInput = () => {
  const [state, onChange] = useInputs({
    name: "",
    pwd: "",
    content: "",
  });
  const { name, pwd, content } = state;
  return (
    <div>
      <div>
        <input
          name="name"
          value={name}
          onChange={onChange}
          placeholder="작성지"
        />
        <input
          name="pwd"
          value={pwd}
          onChange={onChange}
          placeholder="비밀번호"
        />
        <textarea
          name="content"
          value={content}
          onChange={onChange}
          placeholder="사연작성"
        ></textarea>
      </div>
      <div>
        <div>이름:{name}</div>
        <div>닉네임:{pwd}</div>
        <div>
          {content.split("\n").map((line) => {
            return (
              <span>
                {line}
                <br />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default useInput;
