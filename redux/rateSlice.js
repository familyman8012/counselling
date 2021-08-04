import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 5,
  desc: ["terrible", "bad", "normal", "good", "wonderful"],
};

export const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    chgRate: (state, action) => {
      console.log("action.payload", action.payload);
      if (action.payload === null) {
        state.value = state.value;
        console.log("변화없음");
      } else {
        state.value = action.payload;
        console.log(action.payload);
      }
    },
  },
});

export const { chgRate } = rateSlice.actions;
export default rateSlice.reducer;
