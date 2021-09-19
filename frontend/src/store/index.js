import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../components/login/loginSlice'
import signupSlice from '../components/register/signupSlice'
import NewTicketSlice from '../components/create-ticket-form/addTicketSlice'
import userReducer from '../pages/dashboard/userSlice';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        signup:signupSlice,
        newTicket:NewTicketSlice,
        user:userReducer
    },
});
