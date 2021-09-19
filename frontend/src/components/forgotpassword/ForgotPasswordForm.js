import React from 'react'
import { Container,Row,Col,Form,Button,Spinner,Alert } from "react-bootstrap";
import  { Jumbotron }  from "react-bootstrap";
import {Link } from 'react-router-dom';


const ForgotPasswordForm = () => {
    return (
        <div className="entry-page bg-info1">
			<Jumbotron className="form-box">
                <Container>
			<Row>
				<Col>
					<h1 className="text-info text-center">Reset Password</h1>
					<hr />

					<Form autoComplete="off">
						<Form.Group>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type="email"
								name="email"
								/* value={email}
								onChange={handleOnChange} */
								placeholder="Enter Email"
								required
							/>
						</Form.Group>

						<Button type="submit">Reset Password</Button>
					</Form>
					<hr />
				</Col>
			</Row>

			<Row>
				<Col> <Link to="/">Login</Link> </Col>
			</Row>
		</Container>
   
            </Jumbotron>
        </div>
    )
}

export default ForgotPasswordForm
