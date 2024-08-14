export interface UserResponse {
  _id?: string;
  name: string;
  age: number;
  address: string;
  status: "active" | "inactive";
}

export interface UserState {
  users: UserResponse[];
  user?: UserResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  alert: {
    message: string;
    type: "success" | "error";
  };
}

export const SHOW_SUCCESS_ALERT = "SHOW_SUCCESS_ALERT";
export const SHOW_ERROR_ALERT = "SHOW_ERROR_ALERT";
export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";

export interface alertParamsInterface {
  message: string;
}

export interface ShowSuccessAlertAction {
  type: typeof SHOW_SUCCESS_ALERT;
  payload: alertParamsInterface;
}

export interface ShowErrorAlertAction {
  type: typeof SHOW_ERROR_ALERT;
  payload: alertParamsInterface;
}

export interface LoaderAction {
  type: typeof SHOW_LOADER | typeof HIDE_LOADER;
}

export type UserActionTypes =
  | ShowSuccessAlertAction
  | ShowErrorAlertAction
  | LoaderAction;
