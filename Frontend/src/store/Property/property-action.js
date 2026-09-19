import { axiosInstance } from "../../utils/axios";
import { propertyActions } from "./property-slice";

export const getAllProperties = () => async (dispatch, getState) => {
  try {
    console.log("getAllProperties called");
    dispatch(propertyActions.getRequest());

    const { searchParams } = getState().property;

    const { data } = await axiosInstance.get("/api/v1/rent/listing", {
      params: searchParams,
    });

    dispatch(
      propertyActions.getProperties({
        data: data.data || [],                  // backend returns { data: [...] }
        all_totalProperties: data.results || 0, // backend returns { results: N }
      })
    );
  } catch (error) {
    dispatch(propertyActions.getErrors(error.message));
  }
};
