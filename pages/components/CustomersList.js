import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {Card, Col, Row, ListGroup, ListGroupItem, Button} from 'react-bootstrap'
import CustomerTab from './CustomerTab'
const baseURL = 'http://127.0.0.1:8000/api'

export default function CustomersList(props){
    const [customers,setCustomers] = useState([])
    const [customer,setCustomer] = useState()
    const {id} = props
    const fetch = async () =>{
        const dat = localStorage.getItem('customers')
        if(dat){
            setCustomers(JSON.parse(dat))
        }else{
            const response = await axios.get(`${baseURL}/customers/${id}`)
            setCustomers(response.data)
        }
        const dat1 = localStorage.getItem('customer')
        if(dat1){
            setCustomer(JSON.parse(dat1))
        }
    }

    useEffect(fetch,[])
    useEffect(()=>{
        localStorage.setItem('customers',JSON.stringify(customers))
    },[customers])
    useEffect(()=>{
        localStorage.setItem('customer',JSON.stringify(customer))
    },[customer])

    return (<div>
        <h4> This is yours customers</h4>
        <hr class="style1"/>
        <Row xs="auto" md={4} className="g-4">
        {customers.map((c) => (
            <Col>
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
                    e => {setCustomer(c)}
                }>select</Button>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
        <hr class="style1"/>
        {
            customer && <CustomerTab customerNumber={customer.customerNumber}/>
        }
    </div>)
}