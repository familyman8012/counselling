import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import useSwrFetch from "../../hook/useSwrFetch";
import useInputs from "../../hook/useInputs";
import useSwrCrud from "../../hook/useSwrCrud";
import { signIn, signOut, useSession } from "next-auth/client";
import { Rate } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { chgRate } from "../../redux/rateSlice";

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
  const userid = session?.user.uid;

  //redux
  const { value, desc } = useSelector((state) => state.rate);
  console.log("value", value);
  const dispatch = useDispatch();

  // crud
  const { swrdata, mutate } = useSwrFetch("/api/product/comment/");
  const [id, setId] = useState("");
  const commentUrl = "/api/product/comment";

  const createItem = (e) => {
    if (name.trim() === "" || content.trim() === "") {
      alert("작성자란과 사연란을 모두 입력하셔야합니다.");
      return;
    }
    useSwrCrud(
      "post",
      commentUrl,
      { userid, name, content, value },
      swrdata,
      mutate
    );
  };
  const modifyItem = (id) => {
    useSwrCrud(
      "put",
      commentUrl,
      { id, name, content, value },
      swrdata,
      mutate
    );
  };
  const deleteItem = (id) => {
    useSwrCrud("delete", `/api/product/comment?id=${id}`, {}, swrdata, mutate);
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
        <span>
          <Rate
            onChange={(value) => dispatch(chgRate(value))}
            tooltips={desc}
            value={value}
          />
          <span className="ant-rate-text">{desc[value - 1]}</span>
        </span>
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
        <div>
          내용 :
          {content?.split("\n").map((line) => {
            return (
              <span>
                {line}
                <br />
              </span>
            );
          })}
        </div>
      </div>
      <div>
        <button onClick={createItem}>저장</button>
        <button onClick={() => modifyItem(id)}>수정</button>
      </div>
      <hr />
      <ul>
        {swrdata?.map((x, i) => {
          console.log("x는", x);
          return (
            <li key={x._id} style={{ borderBottom: "1px solid" }}>
              <div>
                <Rate disabled={true} tooltips={x.desc} value={x.value} />; 이름
                : {x.name}
                <br />
                {x.content?.split("\n").map((line) => {
                  return (
                    <>
                      {line}
                      <br />
                    </>
                  );
                })}
                {userid == x.userid && (
                  <div>
                    <span onClick={() => modifyInit(x.name, x.content, x._id)}>
                      수정
                    </span>
                    <span onClick={() => deleteItem(x._id)}>삭제</span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default useInput;
