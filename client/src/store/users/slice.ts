import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { alertParamsInterface, UserResponse } from "./types";
import { UserState } from "./types";

const initialState: UserState = {
  users: [],
  status: "idle",
  alert: {
    message: "",
    type: "success",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserResponse>) => {
      state.users.push(action.payload);
    },
    setStatus: (state, action: PayloadAction<UserState["status"]>) => {
      state.status = action.payload;
    },
    showSuccessAlert: (state, action: PayloadAction<alertParamsInterface>) => {
      state.alert = {
        message: action.payload.message,
        type: "success",
      };
    },
    showErrorAlert: (state, action: PayloadAction<alertParamsInterface>) => {
      state.alert = {
        message: action.payload.message,
        type: "error",
      };
    },
    showLoader: (state) => {
      state.status = "loading";
    },
    hideLoader: (state) => {
      state.status = "idle";
    },
  },
});

export const {
  addUser,
  setStatus,
  showSuccessAlert,
  showErrorAlert,
  showLoader,
  hideLoader,
} = userSlice.actions;

export default userSlice.reducer;
