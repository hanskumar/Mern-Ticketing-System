import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import TicketTable from '../../components/ticket-table/TicketTable'
import { Link } from "react-router-dom";

const TicketListing = () => {
    return (
        <Container>
            
            <Row className="mt-4">
                <Col>
                <Link to="/add-ticket">
                    <Button variant="info">Add New Ticket</Button>
                </Link>
                </Col>
                <Col className="text-right">
                   {/* <SearchForm /> */}
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                <TicketTable />
                </Col>
            </Row>
        </Container>
    )
}

export default TicketListing
