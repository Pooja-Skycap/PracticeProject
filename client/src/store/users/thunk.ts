import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../utils/services";
import { UserResponse } from "./types";

export const submitUser = createAsyncThunk(
  "user/submitUser",
  async (userData: UserResponse, { dispatch }) => {
    const result = await postRequest("/users/create", userData, dispatch);
    return result;
  }
);

export const fetchUsers = createAsyncThunk<UserResponse[], void>(
  "user/fetchUsers",
  async () => {
    const users = await getRequest("/users/get");
    return users;
  }
);
