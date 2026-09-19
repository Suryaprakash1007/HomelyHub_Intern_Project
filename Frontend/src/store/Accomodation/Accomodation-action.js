import { accomodationActions } from "./Accomodation-slice";
import { axiosInstance } from "../../utils/axios";

export const createAccomodation = (accomodationData) => async (dispatch) => {
  try {
    dispatch(accomodationActions.getAccomodationRequest());

    const response = await axiosInstance.post(
      "/api/v1/rent/user/newAccommodation",
      accomodationData
    );

    if (!response) {
      throw new Error("Could not create accommodation");
    }

    return response.data;
  } catch (error) {
    dispatch(
      accomodationActions.getErrors(
        error.response?.data?.message || error.message
      )
    );

    throw error;
  }
};

export const getAllAccomodation = () => async (dispatch) => {
  try {
    dispatch(accomodationActions.getAccomodationRequest());

    const response = await axiosInstance.get(
      "/api/v1/rent/user/myAccommodation"
    );

    const accom = response.data?.data?.accomodations || response.data?.data || [];

    dispatch(accomodationActions.getAccomodation(Array.isArray(accom) ? accom : []));

    return accom;
  } catch (error) {
    dispatch(
      accomodationActions.getErrors(
        error.response?.data?.message || error.message
      )
    );

    throw error;
  }
};