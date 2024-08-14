import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { alertParamsInterface, UserResponse } from "./types";
import { UserState } from "./types";
import { deleteUser, fetchUserById, fetchUsers, updateUser } from "./thunk";

const initialState: UserState = {
  users: [],
  user: undefined,
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
      state.user = null;
      state.alert.message = "";
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
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.user = action.payload; // Ensure this is a single UserResponse
          state.status = "succeeded";
        }
      )
      .addCase(fetchUserById.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.users = state.users.map((user) =>
            user._id === action.payload._id ? action.payload : user
          );
          state.status = "succeeded";
        }
      );
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
