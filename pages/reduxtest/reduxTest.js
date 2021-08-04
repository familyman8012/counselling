import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  isModalOpen,
  inputTextWrite,
  sendText,
  selectReduxTest,
} from "../../redux/reduxTest";

function Modal() {
  const count = useSelector(selectReduxTest);
  const dispatch = useDispatch();
  return (
    <>
      <div className="mask"></div>
      <div className="modalPop">
        {count.text}
        <input
          type="text"
          value={count.inputText}
          onChange={(e) => dispatch(inputTextWrite(e.target.value))}
        />
        <button onClick={() => dispatch(sendText())}>확인</button>
        <button onClick={() => dispatch(isModalOpen())}>닫기</button>
      </div>
    </>
  );
}

function reduxTest() {
  const count = useSelector(selectReduxTest);
  const dispatch = useDispatch();
  console.log(count);
  return (
    <>
      {count.isModal ? <Modal /> : null}
      <div>
        <div>
          <button onClick={() => dispatch(isModalOpen("모달창 오픈"))}>
            모달창 열기
          </button>
        </div>
        <div>{count.sendText}</div>
      </div>
    </>
  );
}

export default reduxTest;
