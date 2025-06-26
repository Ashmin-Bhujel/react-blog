import { createSlice } from "@reduxjs/toolkit";
import type { Models } from "appwrite";

export interface AuthSliceType {
  isLoggedIn: boolean;
  userData: Models.Session | null;
}

const initialState: AuthSliceType = {
  isLoggedIn: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
