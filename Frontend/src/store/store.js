import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./Property/property-slice";
import propertyDetailsSlice from "./PropertyDetails/propertyDetails-slice";
import userSlice from "./User/user-slice";
import bookingSlice from "./Booking/booking-slice";
import accomodationSlice from "./Accomodation/accomodation-slice";

const store = configureStore({
  reducer: {
    property: propertyReducer,
    propertydetails: propertyDetailsSlice.reducer,
    user: userSlice.reducer,
    booking: bookingSlice.reducer,
    accomodation: accomodationSlice.reducer,
  },
});

export default store;
