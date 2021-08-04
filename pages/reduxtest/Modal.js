import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  isModal,
  inpWriteText,
  selectRadio,
  sendText,
} from "../../redux/modalSlice";

function Modal() {
  const { inpText, selRadio } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const selRadioFunc = useCallback(
    (e) => dispatch(selectRadio(e.target.value)),
    []
  );
  return (
    <div className="modalPop">
      <input
        type="text"
        value={inpText}
        onChange={(e) => dispatch(inpWriteText(e.target.value))}
      />
      <input type="radio" name="trip" value="제주" onChange={selRadioFunc} />
      제주
      <input type="radio" name="trip" value="전라도" onChange={selRadioFunc} />
      전라도
      <input type="radio" name="trip" value="경상도" onChange={selRadioFunc} />
      경상도
      <input type="radio" name="trip" value="해외" onChange={selRadioFunc} />
      해외
      <div>
        입력텍스트 : {inpText}
        {selRadio}
      </div>
      <div>
        <button onClick={() => dispatch(sendText())}>확인</button>
        <button onClick={() => dispatch(isModal())}>닫기</button>
      </div>
    </div>
  );
}

export default Modal;
