import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {Card, Col, Row, ListGroup, ListGroupItem, Button} from 'react-bootstrap'
import CustomerTab from './CustomerTab'
const baseURL = 'http://127.0.0.1:8000/api'

import { UserContext } from '../user/[id]'

export default function CustomersList(){
    const [customers,setCustomers] = useState([])
    const [customer,setCustomer] = useState(null)
    const id = useContext(UserContext)

    useEffect(()=>{
        axios.get(`${baseURL}/customers/${id}`)
        .then(response => setCustomers(response.data))
    },[id])
    useEffect(()=>{
        localStorage.setItem('customers',JSON.stringify(customers))
    },[customers])
    useEffect(()=>{
        localStorage.setItem('customer',JSON.stringify(customer))
    },[customer])

    return (<div>
        <h4> This is yours customers</h4>
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
                <Button variant="outline-primary" onClick={
                    () => {setCustomer(c)}
                }>select</Button>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
        <hr/>
        {
            customer && <CustomerTab customerNumber={customer.customerNumber}/>
        }
    </div>)
}