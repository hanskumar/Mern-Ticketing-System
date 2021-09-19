import React,{useEffect} from 'react'
import { Link } from "react-router-dom";
import { Container,Row,Col,Form,Button,Spinner,Alert } from "react-bootstrap";
import TicketTable from '../../components/ticket-table/TicketTable';
import {useDispatch,useSelector} from 'react-redux'

const Dashbaord = () => {

    const dispatch = useDispatch();
    const tickets = useSelector(state => state.tickets)


    useEffect(()=>{

        /* if(!tickets.lengt > 0 ){
            dispatch(fetchAllTickets());
        } */

        //fetchAllTickets()
    },[])

    return (
        <Container>
            <Row>
                <Col>
                    
                </Col>
            </Row>
            <Row>
                <Col className="text-center mt-5 mb-2">
                <Link to="/add-ticket">
                    <Button
                    variant="info"
                    style={{ fontSize: "2rem", padding: "10px 30px" }}
                    >
                    Add New Ticket
                    </Button>
                </Link>
                </Col>
            </Row>
            <Row>
                <Col className="text-center  mb-2">
                <div>Total tickets: 0</div>
                <div>Pending tickets: 12</div>
                </Col>
            </Row>
            <Row>
                <Col className="mt-2">Recently Added tickets</Col>
            </Row>
            <hr />

            <Row>
                <Col className="recent-ticket">
                  <TicketTable/>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashbaord
