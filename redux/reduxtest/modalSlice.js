import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  inpText: "",
  selRadio: "",
  sendText: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    isModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    inpWriteText: (state, action) => {
      state.inpText = action.payload;
    },
    selectRadio: (state, action) => {
      if (action.payload === "해외") {
        state.selRadio = "해외는 코로나라 아직 안됩니다.";
        return;
      }
      state.selRadio = action.payload;
    },
    sendText: (state) => {
      state.sendText = state.inpText;
    },
  },
});

export const { isModal, inpWriteText, selectRadio, sendText } =
  modalSlice.actions;
export default modalSlice.reducer;
