import React from 'react'
import { Navbar, Nav } from "react-bootstrap";
import logo from "../../assets/img/logo.png";
//import { LinkContainer } from "react-router-bootstrap";
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <Navbar collapseOnSelect bg="info" variant="dark" expand="md">
            <Navbar.Brand>
            <Link to="/dashboard">
                <img src={logo} alt="logo" width="50px" />
            </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/tickets">Tickets</Nav.Link>
                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
