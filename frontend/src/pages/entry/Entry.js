import React,{useState} from 'react'
import './entry.css'
import  { Jumbotron }  from "react-bootstrap";
import LoginForm from '../../components/login/LoginForm';
//import RegisterForm from '../../components/register/RegisterForm';
import ForgotPasswordForm from '../../components/forgotpassword/ForgotPasswordForm';

const Entry = () => {
    const [formload,setFormload] = useState('login')
    
    return (
        <div className="entry-page bg-info1">
			<Jumbotron className="form-box">
                 { formload === 'login' && <LoginForm/> }
                 { formload === 'reset' && <ForgotPasswordForm/> }
			</Jumbotron>
		</div>
    )
}

export default Entry
