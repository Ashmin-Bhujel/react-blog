import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer, { type AuthSliceType } from "./feature/authSlice";

export interface StoreStateType {
  auth: AuthSliceType;
}

const store = configureStore<StoreStateType>({
  reducer: {
    auth: authSliceReducer,
  },
});

export default store;
