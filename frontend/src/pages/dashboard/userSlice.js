import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: "",
    data:""
};

const userSlice = createSlice({
    name:"name",
    initialState,
    reducers:{
        getUserPending: (state) => {
            state.isLoading = true;
        },
        getUserSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.data = payload;
        },
        getUserFail: (state, { payload }) => {
            state.isLoading = true;
            state.error = payload;
        },

    }

})

export const { getUserPending,getUserSuccess,getUserFail}  = userSlice.actions;

export default userSlice.reducer;