import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: "",
    successMsg: "",
    data:""
};

const NewTicketSlice = createSlice({
    name:"newTicket",
    initialState,
    reducers:{
        NewTicketPending: (state) => {
            state.isLoading = true;
        },
        NewTicketSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.successMsg = payload.message;
            state.data = payload;
        },
        NewTicketFail: (state, { payload }) => {
            state.isLoading = true;
            state.error = payload;
        },

    }

})

export const { NewTicketPending,NewTicketSuccess,NewTicketFail}  = NewTicketSlice.actions;

export default NewTicketSlice.reducer;