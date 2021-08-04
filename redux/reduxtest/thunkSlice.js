import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  return axios
    .get("/api/product/product")
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => error);
});

const initialState = {
  users: [],
  loading: false,
  error: "",
  isShow: false,
};

export const thunkSlice = createSlice({
  name: "thunkRedux",
  initialState,
  reducers: {
    isShowFunc: (state) => {
      state.isShow = !state.isShow;
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.loading = true;
      state.users = [];
      state.error = "";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = "";
    },
    [fetchUser.rejected]: (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
    },
  },
});
export const { isShowFunc } = thunkSlice.actions;
export default thunkSlice.reducer;
