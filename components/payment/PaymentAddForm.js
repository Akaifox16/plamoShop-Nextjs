import axios from "axios"
import { useContext, useState } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
const baseURL = 'http://127.0.0.1:8000/api'

import { CustomerContext } from "../CustomersList"
import { OffCanvasContext } from "../order/OrderDetails"
import { OrderContext } from "../order/OrderPane"

export default function PaymentAddForm(){
    const {customer, setCustomer} = useContext(CustomerContext)
    const {show, setShow, setMethod} = useContext(OffCanvasContext)
    const {selected, setSelect} = useContext(OrderContext)
    const [data,setData] = useState({
        customerNumber: customer.customerNumber,
        checkNumber: "",
        paymentDate: "",
        amount: 0
    })

    const submitHandler = (e) => {
        e.preventDefault();
        // POST /payment
        axios.post(`${baseURL}/payment`,data)
        .then((res)=>{
            axios.patch(`${baseURL}/order/update-payment`,{orderNumber: selected.orderNumber, checkNumber: data.checkNumber})
            .then(res=>{
                setSelect({...selected, paymentNumber: data.checkNumber})
                setMethod('')
                setShow({...show,
                    addCanvas:false
                })
            })
            .catch(err=>{console.error()})
        })
        .catch(err=>{console.error();})       
        
        let pts = parseInt(Number(data.amount) / 100)
        console.log({customerNumber:customer.customerNumber,points: pts})
        axios.patch(`${baseURL}/points`,{customerNumber:customer.customerNumber,points: pts})
        .then(res=>{
            setCustomer({...customer, points: customer.points + pts})
        })
        .catch(err=>{console.error()})
    }

    return (
        <div>
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPaymentDate">
                    <Form.Label>Payment Date</Form.Label>
                    <Form.Control type='date' onChange={e=>{
                        setData({...data,paymentDate:e.target.value})
                    }}/>
                </Form.Group>

                <Form.Group  as={Col} controlId="formGridCheckNumber">
                    <Form.Label>Check No.</Form.Label>
                    <Form.Control onChange={e=>{
                        setData({...data,checkNumber:e.target.value})
                    }}/>        
                </Form.Group>
            </Row>
            <Form.Group controlId="formGridAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control onChange={e=>{
                setData({...data,amount:e.target.value})
            }}/>
            </Form.Group>

            <Button variant="primary" onClick={submitHandler}>
                Submit
            </Button>
        </Form>
    </div>    
    )
}