import { act } from "react-dom/test-utils";

const { createSlice } = require("@reduxjs/toolkit");

const initialAuthState = {
  isAuthenticated: false,
  email: null,
  password: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.email = null;
      state.password = null;
    },
  },
});
export default authSlice.reducer;
export const authActions = authSlice.actions;
