import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./feature/authSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});

export default store;
