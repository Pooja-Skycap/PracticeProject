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

export const getRequest = async (endpoint: string) => {
  try {
    const response = await Axios.get<UserResponse[]>(getApiPath(endpoint));
    console.log("response", response);
    return response.data;
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      console.error("API request failed:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
