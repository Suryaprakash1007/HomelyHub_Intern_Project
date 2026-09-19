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
  const payload = typeof email === "string" ? { email } : email;
  try {
    const { data } = await axiosInstance.post("/api/v1/rent/user/forgotPassword", payload);
    return data;
  } catch (error) {
    try {
      const { data } = await axiosInstance.post("/api/v1/rent/user/forgetpassword", payload);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      dispatch(userActions.getError(msg));
      throw new Error(msg);
    }
  }
};
export const forgotPassword = forgetPassword;

export const resetPassword = (repassword, token) => async (dispatch) => {
  try {
    await axiosInstance.patch(`/api/v1/rent/user/resetPassword/${token}`, repassword);
  } catch (error) {
    try {
      await axiosInstance.patch(`/api/v1/rent/user/resetpassword/${token}`, repassword);
    } catch (err) {
      dispatch(userActions.getError(err.response?.data?.message || err.message));
    }
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch(userActions.getPasswordRequest());
    try {
      await axiosInstance.patch("/api/v1/rent/user/updateMyPassword", passwords);
    } catch {
      await axiosInstance.patch("/api/v1/rent/user/updatepassword", passwords);
    }
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
