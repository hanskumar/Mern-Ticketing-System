import { signupPending , signupSuccess, signupFail } from './signupSlice'
import {UserRegistration} from '../../api/userApi'

export const Usersingup = (frmdata) => async (dispatch) =>{

    try {

        dispatch(signupPending());

        // call api funciton 
        const result = await UserRegistration(frmdata);
        console.log("api Response",result);
        result.status === 200 ? dispatch(signupSuccess(result.data)) :  dispatch(signupFail(result.message));

    } catch(err){
        console.log(err);
        dispatch(signupFail(err));

    }

}

