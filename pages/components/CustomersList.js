import { useState, useEffect } from 'react'
import axios from 'axios'
import {Table} from 'react-bootstrap'
import Btn from './Btn'
const baseURL = 'http://127.0.0.1:8000/api'

export default function CustomersList(props){
    const [customers,setCustomers] = useState([])
    const fetch = async () =>{
        const response = await axios.get(`${baseURL}/customers/${props.id}`)
        setCustomers(response.data)
    }
    useEffect(fetch,[])

    return (<div>
        <Table striped bordered>
                <thead>
                <tr>
                    <td><h5>CID</h5></td>
                    <td><h5>Customer name</h5></td>
                    <td><h5>Contact name</h5></td>
                    <td><h5>Phone</h5></td>
                    <td><h5>Points</h5></td>
                </tr>
                </thead>

                <tbody>
                {customers.map(customer => {
                    return (
                    <tr key={customer.customerNumber}>
                        <td>{customer.customerNumber}</td>
                        <td>{customer.customerName}</td>
                        <td>{customer.contactLastName} {customer.contactFirstName}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.points}</td>
                        <Btn variant="primary" text="manage address"/>
                    </tr>)
                })}
                </tbody>
            </Table>
    </div>)
}