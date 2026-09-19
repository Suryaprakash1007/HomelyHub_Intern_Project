import {createSlice} from '@reduxjs/toolkit';

const propertyDetailsSlice = createSlice({
  name: 'propertyDetails',
  initialState: {
    propertydetails: null,
    loading: false,
    error: null,    
    },
    reducers: {
        getListRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getPropertyDetails(state, action) {
            state.loading = false;
            state.propertydetails = action.payload;
        },
        getError(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const propertyDetailsActions = propertyDetailsSlice.actions;
export default propertyDetailsSlice;