import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false, 
        error: null,
        success: false,
    },
    reducers: {
        getSignupRequest(state) {
            state.loading = true;
        },
        getSignupDetails(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        getLoginRequest(state){
            state.loading = true;
        },
        getLoginDetails(state, action){
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        getError(state, action){
            state.loading = false;
            state.errors= action.payload;
        },
        getCurrentRequest(state){
            state.loading = true;
        },
        getUpdateUserRequest(state){
            state.loading = true;
        },
        getCurrentUser(state, action){
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        getLogutRequest(state){
            state.loading = true;
        },
        getLogut(state,action){
            state.user = action.payload;
            state.isAuthenticated = false;
            state.loading = false;
        },
        getPasswordRequest(state){
            state.loading = true;
        },
        getPasswordSuccess(state, action){
            state.loading = false;
            state.success = action.payload;
        },
        clearErrors(state){
            state.errors = null;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;