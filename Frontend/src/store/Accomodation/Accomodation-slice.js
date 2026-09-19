import { createSlice } from "@reduxjs/toolkit";

const accomodationSlice = createSlice({
  name: "accomodation",
  initialState: {
    accomodation: [],
    loading: false,
    errors: null,
  },
  reducers: {
    getAccomodationRequest(state) {
      state.loading = true;
    },
    getAccomodation(state, action) {
      state.accomodation = Array.isArray(action.payload) ? action.payload : [];
      state.loading = false;
    },
    getErrors(state, action) {
      state.errors = action.payload;
      state.accomodation = Array.isArray(state.accomodation) ? state.accomodation : [];
      state.loading = false;
    },
  },
});

export const accomodationActions = accomodationSlice.actions;

export default accomodationSlice;
