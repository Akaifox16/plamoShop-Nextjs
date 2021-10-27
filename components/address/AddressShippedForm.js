import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
const orderURL = 'http://127.0.0.1:8000/api/order'
const baseURL = 'http://127.0.0.1:8000/api'

import { OrderContext } from "../order/OrderPane";

export default function AddressShippedForm(){
    const { selected, setShow, show } = useContext(OrderContext)
    const [addresses, setAddress] = useState([])
    const [data, setData ] = useState({
        addressLine1:"",
        addressLine2:"",
        city:"",
        state:"",
        postalCode:"",
        country:"",

    })

    useEffect(()=>{
        setAddress(JSON.parse(localStorage.getItem('addresses')))
    },[])

    return(<div>
        <Form>
        <Row>
            <Form.Group  as={Col} controlId="formGridAddress">
                <Form.Label>Address</Form.Label>
                <Form.Select onChange={e=>{
                    setData(JSON.parse(e.target.value))
                    console.log(JSON.parse(e.target.value))
                }}>
                {
                    addresses.map(address=>{
                        return (
                            <option value={JSON.stringify(address)}>{`${address.AddressLine1} ${address.AddressLine2} ${address.City} ${address.State} ${address.PostalCode} ${address.Country}`}</option>
                        )
                    })
                }
                </Form.Select>
            </Form.Group>
        </Row>

        <Button variant='success' onClick={e=>{
            const currentDate = new Date()
            axios.patch(`${orderURL}/update/${selected.orderNumber}`, {status: 'Shipped', shippedDate: `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`})
            .then(res=>{
                axios.post(`${baseURL}/order-address/${selected.orderNumber}`,data)
                .then(()=>{
                    setShow({...show,addrCanvas: false})
                })
                .catch(err=>{console.error()})
            })
            .catch(err=>{console.error()})
        }}> Confirm </Button>
        </Form>
    </div>)
}