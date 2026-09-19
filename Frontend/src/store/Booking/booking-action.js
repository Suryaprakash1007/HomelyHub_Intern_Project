import {axiosInstance} from "../../utils/axios";
import { setBookingDetails,setBookings } from "./booking-slice";

export const fetchBookingDetails= (bookingId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/api/v1/rent/booking/${bookingId}`);
    const bookingDetails = response.data.data;
    dispatch(setBookingDetails(bookingDetails));
  } catch (error) {
    console.error("Error fetching booking details:", error);
  } 
}    


export const fetchUserBookings = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("/api/v1/rent/booking/user");
        const bookings = response.data.data?.bookings || response.data.data || [];
        dispatch(setBookings(bookings));
    }
    catch (error) {
        console.error("Error fetching user bookings:", error);
    }
}