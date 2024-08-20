import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  postRequest,
  updateRequest,
} from "../../utils/services";
import { UserResponse } from "./types";
import {
  CREATE_USER,
  DELETE_USER,
  EDIT_USER,
  GET_USER,
  GET_USER_BY_ID,
} from "../../constants/endpoints";

export const submitUser = createAsyncThunk(
  "user/submitUser",
  async (userData: UserResponse, { dispatch }) => {
    const result = await postRequest(CREATE_USER, userData, dispatch);
    return result;
  }
);

export const fetchUsers = createAsyncThunk<UserResponse[], void>(
  "user/fetchUsers",
  async (_, { dispatch }) => {
    const users = await getRequest<UserResponse[]>(GET_USER, dispatch);
    return users;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId: string, { dispatch }) => {
    await deleteRequest(`${DELETE_USER}/${userId}`, dispatch);
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
      `${EDIT_USER}/${userId}`,
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
      `${GET_USER_BY_ID}/${userId}`,
      dispatch
    );
    return response;
  }
);
