import Axios from "axios";

import { AxiosResponse, Dispatch } from "./commonImports";
import {
  showLoader,
  hideLoader,
  addUser,
  showSuccessAlert,
  showErrorAlert,
} from "../store/users/slice";
import { UserResponse } from "../store/users";

const BASE_PATH = import.meta.env.VITE_BACKEND_BASE_URL;
const getApiPath = (endpoint: string) => BASE_PATH + endpoint;

const getConfigSetting = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  return {
    headers: headers,
  };
};

export const postRequest = async (
  endpoint: string,
  body: UserResponse,
  dispatch: Dispatch
): Promise<UserResponse> => {
  dispatch(showLoader());
  try {
    const response: AxiosResponse<UserResponse> = await Axios.post(
      getApiPath(endpoint),
      body,
      getConfigSetting()
    );
    dispatch(addUser(response.data));
    dispatch(showSuccessAlert({ message: "User added successfully!" }));
    return response.data;
  } catch (error) {
    dispatch(showErrorAlert({ message: "Failed to add user." }));
    throw error;
  } finally {
    dispatch(hideLoader()); // Hide loader after the request completes
  }
};

export const getRequest = async <T>(
  endpoint: string,
  dispatch: Dispatch
): Promise<T> => {
  try {
    const response = await Axios.get<T>(getApiPath(endpoint));
    dispatch(showSuccessAlert({ message: "Data fetched successfully!" }));

    return response.data;
  } catch (error) {
    dispatch(showErrorAlert({ message: "Failed to fetch data." }));
    throw error;
  } finally {
    dispatch(hideLoader());
  }
};

export const deleteRequest = async (endpoint: string, dispatch: Dispatch) => {
  try {
    const response = await Axios.delete<UserResponse[]>(getApiPath(endpoint));
    dispatch(showSuccessAlert({ message: "Data Deleted Succesfully" }));
    return response.data;
  } catch (error) {
    dispatch(showErrorAlert({ message: "Failed to delete data." }));
    throw error;
  } finally {
    dispatch(hideLoader());
  }
};

export const updateRequest = async (
  endpoint: string,
  updateData: UserResponse,
  dispatch: Dispatch
): Promise<UserResponse> => {
  dispatch(showLoader());
  try {
    const response = await Axios.patch<UserResponse>(
      getApiPath(endpoint),
      updateData
    );
    dispatch(showSuccessAlert({ message: "User updated successfully!" }));
    return response.data;
  } catch (error) {
    dispatch(showErrorAlert({ message: "Failed to update user." }));
    throw error;
  } finally {
    dispatch(hideLoader());
  }
};
