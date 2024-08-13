import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../../utils/services";
import { UserResponse } from "./types";

export const submitUser = createAsyncThunk(
  "user/submitUser",
  async (userData: UserResponse, { dispatch }) => {
    const result = await postRequest("/users/create", userData, dispatch);
    return result;
  }
);
