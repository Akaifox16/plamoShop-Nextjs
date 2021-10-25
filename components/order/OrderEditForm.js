import { useState, useContext} from "react";
import axios from "axios";
import { Form, Row, Button, Col } from "react-bootstrap";
import { OrderContext } from "./OrderPane";
const orderURL = "http://127.0.0.1:8000/api/order";

export default function OrderEditForm() {
    const {orders, selected, setShow, setSelect, setOrders} = useContext(OrderContext)
    
    const submitHandler = (e) => {
        e.preventDefault();
        // PATCH /update/{oid}
        // axios.patch(`${orderURL}/update/${selected.orderNumber}`,selected)
        // .then(()=>{
        //     let order = []
        //     orders.forEach(o => {
        //         if(o.id == selected.id){
        //             order = [...order, selected]
        //         }else{
        //             order = [...order,o]
        //         }
        //     })
        //     setAddresses(order)
        //     setShow(false)
        // })
        // .catch(err=>{console.error();})       
        
        console.log('submit clicked!')
    }

    return (
    <div>
        <Form>
            <Form.Group className="mb-3" controlId="formGridShippedDate">
                <Form.Label>Shipped Date</Form.Label>
                <Form.Control value={selected.shippedDate} placeholder="YYYY-MM-DD" onChange={e=>{
                    setSelect({...selected,shippedDate:e.target.value})
                }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control value={selected.status} placeholder="in process, resolved, canceled etc." onChange={e=>{
                    setSelect({...selected,status:e.target.value})
                }}/>
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridComments">
                <Form.Label>Comments</Form.Label>
                <Form.Control value={selected.comments} onChange={e=>{
                    setSelect({...selected,comments:e.target.value})
                }}/>
                </Form.Group>
            </Row>

            <Button variant="primary" onClick={submitHandler}>
                Submit
            </Button>
        </Form>
    </div>    
    );
}
