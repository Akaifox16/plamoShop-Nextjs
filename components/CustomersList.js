import { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'
import {Card, Col, Row, ListGroup, ListGroupItem, Button, Offcanvas} from 'react-bootstrap'
import CustomerTab from './CustomerTab'
const baseURL = 'http://127.0.0.1:8000/api'

import { UserContext } from '../pages/user/[id]'
import AddCustomerForm from './AddCustomerForm'
export const CustomerContext = createContext()

export default function CustomersList(){
    const [customers,setCustomers] = useState([])
    const [customer,setCustomer] = useState(null)
    const [show,setShow] = useState(false)
    const btnText = {selected: 'selected',select: 'select'}
    const user = useContext(UserContext)

    useEffect(()=>{
        axios.get(`${baseURL}/customers/${user.employeeNumber}`)
        .then(response => setCustomers(response.data))
    },[user.employeeNumber])
    useEffect(()=>{
        localStorage.setItem('customers',JSON.stringify(customers))
    },[customers])
    useEffect(()=>{
        localStorage.setItem('customer',JSON.stringify(customer))
    },[customer])

    return (<div className='m-4'>
        <Row>
        <Col sm={8}><h3> This is yours customers</h3></Col>
        <Col sm={4}><Button variant="success" size='lg' onClick={()=>{setShow(true)}}>New Customer</Button></Col>
        </Row>
        <hr />
        <Row xs="auto" md={4} className="g-4">
        {customers.map((c) => (
            <Col key={c.customerNumber}>
            <Card border="info" style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>{c.customerName}</Card.Title>
                <Card.Text>
                    Contact : {c.contactFirstName} {c.contactLastName}
                </Card.Text>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Phone : {c.phone}</ListGroupItem>
                    <ListGroupItem>Pts : {c.points}</ListGroupItem>
                </ListGroup>
                <Button variant={customer ? 
                c.customerNumber == customer.customerNumber ? 
                "primary" : "outline-primary"
                : "outline-primary"} onClick={
                    () => {
                        setCustomer(c) 
                    }}>
                        {customer ? c.customerNumber == customer.customerNumber ? btnText.selected:btnText.select:btnText.select}
                </Button>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
        <hr/>
        <CustomerContext.Provider value={{customer, customers, show, setCustomer, setCustomers, setShow}}>
        {
            customer && <CustomerTab />
        }
        <Offcanvas show={show} onHide={()=>{
                setShow(false)
            }} placement='start' className='w-25'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Add Customer</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <AddCustomerForm/>
                </Offcanvas.Body>
        </Offcanvas>
        </CustomerContext.Provider>
    </div>)
}