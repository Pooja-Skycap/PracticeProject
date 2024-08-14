import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  updateRequest,
} from "../../utils/services";
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
  async (_, { dispatch }) => {
    const users = await getRequest<UserResponse[]>("/users/get", dispatch);
    return users;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId: string, { dispatch }) => {
    await deleteRequest(`/users/delete/${userId}`, dispatch);
    return userId;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (
    { userId, userData }: { userId: string; userData: UserResponse },
    { dispatch }
  ) => {
    const result = await updateRequest(
      `/users/edit/${userId}`,
      userData,
      dispatch
    );
    return result;
  }
);

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId: string, { dispatch }) => {
    const response = await getRequest<UserResponse>(
      `/users/getbyid/${userId}`,
      dispatch
    );
    return response;
  }
);
