import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  loading: false,
  bookingDetails: {},
  error: null
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingRequest(state) {
      state.loading = true;
    },
    setBookings(state, action) {
      state.bookings = action.payload;
      state.loading = false;
    },
    setBookingDetails(state, action) {
      state.bookingDetails = action.payload;
    },
    addBooking(state, action) {
      state.bookings.push(action.payload);
    }
  }
});

export const {setBookings, addBooking, setBookingDetails} = bookingSlice.actions;
export default bookingSlice;
