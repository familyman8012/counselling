import React from "react";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { isModal } from "../../redux/modalSlice";

function ModalCont() {
  const { isModalOpen, sendText, selRadio } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();
  return (
    <>
      <div>
        {isModalOpen && <Modal />}
        {sendText} {selRadio}
        <button onClick={() => dispatch(isModal())}>팝업열기</button>
      </div>
    </>
  );
}

export default ModalCont;
