import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AuthState, filterDefaultData, userDefaultData } from "./types";

const initialState: AuthState = {
  user: userDefaultData,
  accessToken: "",
  loading: false,
  categories: [],
  filter: filterDefaultData,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserRedux: (state, action) => {
      state.user = action.payload;
    },
    setAccessTokenRedux: (state, action) => {
      state.accessToken = action.payload;
    },
    setLoadingRedux: (state, action) => {
      state.loading = action.payload;
    },
    setCategoriesRedux: (state, action) => {
      state.categories = action.payload;
    },
    setFilterRedux: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setUserRedux,
  setAccessTokenRedux,
  setLoadingRedux,
  setCategoriesRedux,
  setFilterRedux,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
