import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testModal: {
    isModal: false,
    text: "",
    inputText: "",
    sendText: "",
  },
};

export const reduxTestSlice = createSlice({
  name: "reduxTest",
  initialState,
  reducers: {
    isModalOpen: (state, action) => {
      state.testModal.text = action.payload;
      state.testModal.isModal = !state.testModal.isModal;
    },
    inputTextWrite: (state, action) => {
      state.testModal.inputText = action.payload;
    },
    sendText: (state) => {
      state.testModal.isModal = !state.testModal.isModal;
      state.testModal.sendText = state.testModal.inputText;
    },
  },
});

//리덕스에서 자주 쓰이는 배열함수. filter, concat, map, find
// switch (action.type) {
//   case MODE_REMOVE:
//     return {
//       ...state,
//       boards: state.boards.filter((row) => row.boardId !== action.boardId),
//     };
//   case MODE_SAVE:
//     if (action.saveData.boardId === "") {
//       return {
//         lastId: state.lastId + 1,
//         boards: state.boards.concat({
//           ...action.saveData,
//           boardId: state.lastId + 1,
//         }),
//         selectRowData: {},
//       };
//     } else {
//       return {
//         ...state,
//         boards: state.boards.map((data) =>
//           data.boardId === action.saveData.boardId
//             ? { ...action.saveData }
//             : data
//         ),
//         selectRowData: {},
//       };
//     }
//   case MODE_SELECT_ROW:
//     return {
//       ...state,
//       selectRowData: state.boards.find((row) => row.boardId === action.boardId),
//     };
//   default:
//     return state;
// }

export const { isModalOpen, inputTextWrite, sendText } = reduxTestSlice.actions;
export const selectReduxTest = (state) => state.reduxTest.testModal;
export default reduxTestSlice.reducer;
