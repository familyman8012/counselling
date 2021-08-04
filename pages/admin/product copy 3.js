import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import useSwrFetch from "../../hook/useSwrFetch";
import useInputs from "../../hook/useInputs";
import useSwrCrud from "../../hook/useSwrCrud";
import { signIn, signOut, useSession } from "next-auth/client";

export const useInput = () => {
  // input 여러개
  const [state, onChange] = useInputs({
    name: "",
    content: "",
  });
  const { name, content } = state;
  const inputChg = useCallback((e) => onChange(e.target), []);

  // session
  const [session, loading] = useSession();
  //const userid = session.user.uid;

  const userid = session?.user.uid;

  // crud
  const { comment, mutate } = useSwrFetch("/api/product/comment/");
  const [id, setId] = useState("");
  const commentUrl = "/api/product/comment";

  const createItem = (e) => {
    if (name.trim() === "" || content.trim() === "") {
      alert("작성자란과 사연란을 모두 입력하셔야합니다.");
      return;
    }
    useSwrCrud("post", commentUrl, { userid, name, content }, comment, mutate);
  };
  const modifyItem = (id) => {
    useSwrCrud("put", commentUrl, { id, name, content }, comment, mutate);
  };
  const deleteItem = (id) => {
    useSwrCrud("delete", `/api/product/comment?id=${id}`, {}, comment, mutate);
  };

  // 수정 init
  const modifyInit = (name, content, id) => {
    const data = [
      ["name", name],
      ["content", content],
    ];
    data.forEach((current) =>
      onChange({ name: current[0], value: current[1] })
    );
    setId(id);
  };

  return (
    <div>
      <div>
        <input
          name="name"
          value={name}
          onChange={inputChg}
          placeholder="작성지"
        />
        <textarea
          name="content"
          value={content}
          onChange={inputChg}
          placeholder="사연작성"
        ></textarea>
      </div>
      <div>
        <div>이름:{name}</div>
      </div>
      <div>
        <button onClick={createItem}>저장</button>
        <button onClick={() => modifyItem(id)}>수정</button>
      </div>
      <hr />
      <ul>
        {comment?.map((x, i) => {
          console.log("x는", x);
          return (
            <li key={x._id} style={{ borderBottom: "1px solid" }}>
              이름 : {x.name}
              <br /> 컨텐츠 :
              {x.content?.split("\n").map((line) => {
                return (
                  <span>
                    {line}
                    <br />
                  </span>
                );
              })}
              {userid == x.userid && (
                <>
                  <span onClick={() => modifyInit(x.name, x.content, x._id)}>
                    수정
                  </span>
                  <span onClick={() => deleteItem(x._id)}>삭제</span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default useInput;
