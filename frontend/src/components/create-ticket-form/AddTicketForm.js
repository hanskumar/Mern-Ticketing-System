import React,{useState} from 'react'
import { Container,Row,Col,Form,Button,Spinner,Alert,Jumbotron } from "react-bootstrap";
import "./add-ticket-form.style.css";
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { NewTicketPending,NewTicketSuccess, NewTicketFail } from './addTicketSlice'
import { addTicket } from '../../api/ticketApi'
import toast from 'react-hot-toast';


const AddTicketForm = () => {

    const dispatch = useDispatch();
    const[isLoading,setIsLoading] = useState(false);

    const { register, handleSubmit,formState: { errors } } = useForm();

    console.log(errors);

    const onSubmit =async(data)=> {
		console.log(data);

        dispatch(NewTicketPending());

        try {
            //call API 
            const response = await addTicket(data);
            const res  = response.data;
            console.log("API RES",res);

            if(res.code === 200){
				dispatch(NewTicketSuccess(res.data));
				setIsLoading(false);
				toast.success(res.message);
				//history.push("/dashboard");
			} else {
				dispatch(NewTicketFail(res.message));
				toast.error(res.message);
				setIsLoading(false);
			}

        } catch(err){
            dispatch(NewTicketFail(err));
            toast.error(err);
            setIsLoading(false);
        }
	}


    return (
        <Jumbotron className="mt-3 add-new-ticket bg-light">
            <h1 className="text-info text-center">Add New Ticket</h1>
            <hr />
                
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label> Subject </Form.Label>
                        <Form.Control
                            placeholder="Subject"
                            {...register("subject",{ 
                                required: true,
                                //minLength: 5, 
                            })}
                        />
                        <p>{errors.subject?.type === 'required' && "Subject is required"}</p>
                    </Form.Group>
                   
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="5"
                            {...register("description",{ 
                                required: true ,
                                minLength: 10                            
                            })}
                        />
                        <p>{errors.description?.type === 'required' && "Description is required"}</p>
                        {errors?.description?.type === "minLength" && (
        					<p>Description should be min 5 chachters</p>
      					)}  

                    </Form.Group>

                    <Button type="submit" variant="info" block>
                       Open Ticket
                    </Button>
                </Form>    
	    </Jumbotron>
    )
}

export default AddTicketForm
