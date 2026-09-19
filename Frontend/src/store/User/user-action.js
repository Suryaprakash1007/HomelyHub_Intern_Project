import { userActions } from "./user-slice";
import { axiosInstance } from "../../utils/axios";

export const getSignup = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getSignupRequest());
    const { data } = await axiosInstance.post("/api/v1/rent/user/signup", user);
    dispatch(userActions.getSignupDetails(data.user));
  } catch (error) {
    dispatch(userActions.getError(error.response?.data?.message || error.message));
  }
};

export const getLogin = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getLoginRequest());
    const { data } = await axiosInstance.post("/api/v1/rent/user/login", user);
    dispatch(userActions.getLoginDetails(data.user));
  } catch (error) {
    dispatch(userActions.getError(error.response?.data?.message || error.message));
  }
};

export const CurrentUser = () => async (dispatch) => {
  try {
    dispatch(userActions.getCurrentRequest());
    const { data } = await axiosInstance.get("/api/v1/rent/user/me");
    dispatch(userActions.getCurrentUser(data.user));
  } catch (error) {
    dispatch(userActions.getLogut(null));
  }
};
export const currentUser = CurrentUser;

export const UpdateUser = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getUpdateUserRequest());
    const response = await axiosInstance.patch("/api/v1/rent/user/updateMe", user);
    if (response.data?.data?.user) {
      dispatch(userActions.getCurrentUser(response.data.data.user));
    } else {
      const { data } = await axiosInstance.get("/api/v1/rent/user/me");
      dispatch(userActions.getCurrentUser(data.user));
    }
  } catch (error) {
    dispatch(userActions.getError(error.response?.data?.message || error.message));
    throw error;
  }
};
export const updateUser = UpdateUser;

export const forgetPassword = (email) => async (dispatch) => {
  try {
    await axiosInstance.post("/api/v1/rent/user/forgetpassword", email);
  } catch (error) {
    dispatch(userActions.getError(error.response?.data?.message || error.message));
  }
};
export const forgotPassword = forgetPassword;

export const resetPassword = (repassword, token) => async (dispatch) => {
  try {
    await axiosInstance.patch(`/api/v1/rent/user/resetpassword/${token}`, repassword);
  } catch (error) {
    dispatch(userActions.getError(error.response?.data?.message || error.message));
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch(userActions.getPasswordRequest());
    await axiosInstance.patch("/api/v1/rent/user/updatepassword", passwords);
    dispatch(userActions.getPasswordSuccess(true));
  } catch (error) {
    dispatch(userActions.getError(error.response?.data?.message || error.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.get("/api/v1/rent/user/logout");
    dispatch(userActions.getLogut(null));
  } catch (error) {
    dispatch(userActions.getError(error.response?.data?.message || error.message));
  }
};
