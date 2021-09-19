import {loginPending,loginSuccess,loginFail } from './loginSlice'
import {userLogin} from '../../api/userApi'



export const userLoginAction = (frmdata) => async (dispatch) =>{
    try {

        dispatch(loginPending());

        // call api funciton 
        const result = await userLogin(frmdata);
        console.log("Login api Response",result.data);
        result.status === 200 ? dispatch(loginSuccess(result.data)) : dispatch(loginFail(result.message));

    } catch(err){
        console.log(err);
        dispatch(loginFail(err));

    }

}

