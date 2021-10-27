import axios from "axios";
import { useContext, useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
const baseURL = 'http://127.0.0.1:8000/api'

import { UserContext } from "../pages/user/[id]";
import { CustomerContext } from "./CustomersList";

export default function AddCustomerForm(){
    const user = useContext(UserContext)
    const {show, customers, setCustomers, setShow} = useContext(CustomerContext)
    const [customer,setCustomer] = useState({
        customerName:"",
        contactLastName:"",
        contactFirstName:"",
        phone:""
    })

    return(<div>
        <Form>
            <Form.Group controlId="formGridCustomerName">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control placeholder="7-lnw-Joan-Salad Corp." onChange={e => {
                    setCustomer({...customer,customerName: e.target.value})
                }} />
            </Form.Group>

            <Row>
                <Col >
                <Form.Group controlId="formGridLastName">
                    <Form.Label>Contact Last name</Form.Label>
                    <Form.Control placeholder="Natwichai" onChange={e=>{
                        setCustomer({...customer,contactLastName:e.target.value})
                    }} />
                </Form.Group>
                </Col>
                <Col >
                <Form.Group controlId="formGridFirstName">
                    <Form.Label>Contact First name</Form.Label>
                    <Form.Control placeholder="Juggapong" onChange={e=>{
                        setCustomer({...customer,contactFirstName:e.target.value})
                    }} />
                </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId="formGridPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control placeholder="0123456789" onChange={e=>{
                    setCustomer({...customer,phone:e.target.value})
                }} />
            </Form.Group>

            <Button className="mt-1" variant="success" onClick={e=>{
                e.preventDefault()
                axios.post(`${baseURL}/customer/create/${user.employeeNumber}`,customer)
                .then(res=>{
                    console.log(res.data[0])
                    setCustomers([...customers,res.data[0]])
                    setShow(false)
                })
                .catch(err=>{console.error()})
            }}>Create</Button>
        </Form>
    </div>)
}