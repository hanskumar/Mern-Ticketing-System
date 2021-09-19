import React,{useState,useEffect} from 'react'
import  { Jumbotron }  from "react-bootstrap";
import {Link,useHistory} from 'react-router-dom'
import { Container,Row,Col,Form,Button,Spinner,Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { loginPending, loginSuccess, loginFail } from "./loginSlice";
import {userLogin} from '../../api/userApi'


const LoginForm = () => {

    const history = useHistory();
	const[isLoading,setIsLoading] = useState(false);

	const dispatch = useDispatch();

	const { register, handleSubmit,formState: { errors } } = useForm();


	const submit = async(data)=> {
		console.log(data);
        setIsLoading(true);   

		dispatch(loginPending());
		try{
			const response = await userLogin(data);

			const res  = response.data;

			if(res.code === 200){
				dispatch(loginSuccess(res.data));
				setIsLoading(false);
				toast.success(res.message);
				history.push("/dashboard");
			} else {
				dispatch(loginFail(res.message));
				toast.success(res.message);
				setIsLoading(false);
			}
			//dispatch(getUserProfile());
			
			
		} catch(err){
			console.log("error MSG Cacth Blcok",err)
			dispatch(loginFail(err.message));
			setIsLoading(false);
			toast.error("Something Went Wrong,Please try again.");
		} 
	}
 
	//const isLoading = false;
    return (

		<div className="entry-page bg-info1">
			<Jumbotron className="form-box">
        		<Container>
					<Row>
                		<Col>
					<h1 className="text-info text-center">Client Login</h1>
					<hr />
					{/* {error && <Alert variant="danger">{error}</Alert>} */}
                    <Form autoComplete="off" onSubmit={handleSubmit(submit)}>
                        <Form.Group>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type="email"
								name="email"
								placeholder="Enter Email"
								{...register("email",{ 
									required: true ,
									pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
								})}
							/>
							
							{errors.email?.type === 'required' && (<p>Email is required</p>)}

							{errors?.email?.type === "pattern" && (
									<p>Invalid email address </p>
							)} 
						</Form.Group>
                        <Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								name="password"
								placeholder="password"
								{...register("password",{
									required: true,
								})}
							/>
							{errors.password?.type === 'required' && (<p>password is required</p>)}
						</Form.Group>

						{ isLoading === true ? <Spinner variant="primary" animation="border" /> 
							:<Button type="submit" className="text-center">Login</Button>
						}
						{/* {isLoading && <Spinner variant="primary" animation="border" />} */}

                    </Form>
                </Col>
            		</Row>

					<Row>
						<Col>
							<Link to="/reset-password">Forget Password?</Link>
						</Col>
					</Row>
					
					<Row className="py-4">
						<Col>
							Are you new here? <Link to="/register">Register Now</Link>
						</Col>
					</Row>


        		</Container> 
			</Jumbotron>		 
		</div>		 
			  
    )
}

export default LoginForm
