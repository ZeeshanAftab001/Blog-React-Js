import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Import the default reducer

const store = configureStore({
  reducer: {
    auth: authReducer, // Ensure you're using the correct name 'auth' here
  },
});

export default store;
