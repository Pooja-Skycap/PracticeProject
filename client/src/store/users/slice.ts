import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { alertParamsInterface, UserResponse } from "./types";
import { UserState } from "./types";
import { fetchUsers } from "./thunk";

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
    clearAlert: (state) => {
      state.alert = {
        message: "",
        type: "success",
      };
    },
    showLoader: (state) => {
      state.status = "loading";
    },
    hideLoader: (state) => {
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  addUser,
  setStatus,
  showSuccessAlert,
  showErrorAlert,
  clearAlert,
  showLoader,
  hideLoader,
} = userSlice.actions;

export default userSlice.reducer;
