import {
  SHOW_SUCCESS_ALERT,
  SHOW_ERROR_ALERT,
  SHOW_LOADER,
  HIDE_LOADER,
  alertParamsInterface,
  ShowSuccessAlertAction,
  ShowErrorAlertAction,
  LoaderAction,
} from "./types";

// Action creator for showing success alert
export const showSuccessAlert = (
  payload: alertParamsInterface
): ShowSuccessAlertAction => ({
  type: SHOW_SUCCESS_ALERT,
  payload,
});

// Action creator for showing error alert
export const showErrorAlert = (
  payload: alertParamsInterface
): ShowErrorAlertAction => ({
  type: SHOW_ERROR_ALERT,
  payload,
});

// Action creator for showing the loader
export const showLoader = (): LoaderAction => ({
  type: SHOW_LOADER,
});

// Action creator for hiding the loader
export const hideLoader = (): LoaderAction => ({
  type: HIDE_LOADER,
});
