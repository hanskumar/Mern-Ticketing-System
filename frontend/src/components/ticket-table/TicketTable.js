import React from 'react'
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const TicketTable = () => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Ticket Id</th>
                <th>Subject</th>
                <th>Description</th>
                <th>data</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default TicketTable
