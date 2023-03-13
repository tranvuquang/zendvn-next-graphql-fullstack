import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AuthState, IUser, userDefaultData } from "./types";
import jwt_decode from "jwt-decode";

// const accessToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMThlMGYwLWJjYWQtMTFlZC05ZTFmLTNkNGM2YzdiZmI4MSIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjc4NTkyMDM1fQ.B0X8z24_grE__VcZoGe-503o74m0cbdPmIoNmqkIyUU";

const getUser = () => {
  let user: IUser = userDefaultData;
  // if (accessToken) {
  //   const { id, email } = jwt_decode(accessToken) as IUser;
  //   user = { ...user, id, email };
  // }
  return user;
};

const initialState: AuthState = {
  user: getUser(),
  accessToken: "",
  loading: false,
  categories: [],
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
  },
});

export const {
  setUserRedux,
  setAccessTokenRedux,
  setLoadingRedux,
  setCategoriesRedux,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
