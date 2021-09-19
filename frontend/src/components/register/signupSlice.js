import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading:false,
    status:'',
    error:'',
    user:''
}

const signupSlice = createSlice({

    name:"register",
    initialState,
    reducers:{
        signupPending: (state,action) => {
        state.isLoading = true;
        },
        signupSuccess: (state,action)=>{
            state.isLoading = false;
            state.status = true;
            state.user = action.payload.data;
        },
        signupFail: (state,action)=>{
            state.isLoading = false;
            state.error = action.payload
        }
    }
})

export const { signupPending , signupSuccess, signupFail } = signupSlice.actions

export default signupSlice.reducer;