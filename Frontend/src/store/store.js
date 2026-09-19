import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./Property/property-slice";
import propertyDetailsSlice from "./PropertyDetails/propertyDetails-slice";
import userSlice from "./User/user-slice";
import bookingSlice from "./Booking/booking-slice";
import accommodationSlice from "./Accommodation/accommodation-slice";

const store = configureStore({
  reducer: {
    property: propertyReducer,
    propertydetails: propertyDetailsSlice.reducer,
    user: userSlice.reducer,
    booking: bookingSlice.reducer,
    accommodation: accommodationSlice.reducer,
  },
});

export default store;
