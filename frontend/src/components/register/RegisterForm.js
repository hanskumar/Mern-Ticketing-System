import React from 'react'
import  { Jumbotron }  from "react-bootstrap";
import { Container,Row,Col,Form,Button,Spinner,Alert } from "react-bootstrap";
import {Link,useHistory} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Usersingup } from './signupAction'
import { useDispatch , useSelector } from 'react-redux'
import toast from 'react-hot-toast';

const RegisterForm = () => {
    const isLoading = false;

	const { register, handleSubmit,formState: { errors } } = useForm();

	const dispatch = useDispatch();
	const history = useHistory();

	const onSubmit =(data)=> {
		console.log(data);

		dispatch(Usersingup(data));
		toast.success('Successfully created!');
		//history.push("/");
	}

    return (
        <div className="entry-page bg-info1">
			<Jumbotron className="form-box">
        		<Container>
					<Row>
						<Col>
							<h1 className="text-info text-center">Client Registration</h1>
							<hr />
							<Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
								<Form.Group >
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Your Name"
										{...register("name",{ required: true })}
									/>
								<p>{errors.name?.type === 'required' && "Name is required"}</p>

								</Form.Group>

								<Form.Group>
									<Form.Label>Phone</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Your Mobile Number"
										{...register("phone",{ 
											required: true ,
											maxLength: 10,
											minLength: 10,
											pattern: /[0-9]{4}/
										})}
									/>

									<p>{errors.phone?.type === 'required' && "Phone Number is required"}</p>

									{errors?.phone?.type === "pattern" && (
										<p>Numbers  only</p>
									)}  

									{errors?.phone?.type === "maxLength" && (
        								<p>Phone Number cannot exceed 10 characters</p>
      								)}

									{errors?.phone?.type === "minLength" && (
        								<p>Phone Number should be 10 digit</p>
      								)}  

									
								</Form.Group>

								<Form.Group>
									<Form.Label>Email Address</Form.Label>
									<Form.Control
										type="text"
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
									<Form.Label>Address</Form.Label>
									<Form.Control
										type="text"
										placeholder="Full address"
										{...register("address",{
											required: true
										})}
									/>
									{errors.address?.type === 'required' && (<p>address is required</p>)}
								</Form.Group>

								<Form.Group>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="password"
										{...register("password",{
											required: true,
										})}
									/>
									{errors.password?.type === 'required' && (<p>password is required</p>)}
								</Form.Group>

								<Button type="submit" className="text-center">Register</Button>
								{isLoading && <Spinner variant="primary" animation="border" />}

							</Form>
						</Col>
					</Row>
					<hr/>
					<Row className="py-4">
						<Col>
							Already have an account? <Link to="/">Login Now</Link>
						</Col>
					</Row>
        		</Container> 

			</Jumbotron>
		</div>
    )
}

export default RegisterForm
