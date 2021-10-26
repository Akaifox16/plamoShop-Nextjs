import { useState, useContext} from "react";
import axios from "axios";
import { Form, Row, Button, Col } from "react-bootstrap";
import { OrderContext } from "./OrderPane";
const orderURL = "http://127.0.0.1:8000/api/order";

export default function OrderEditForm() {
    const {orders, selected, show, setShow, setSelect, setOrders} = useContext(OrderContext)
    const actions = ["In Process", "On Hold",
                    "Resolved", "Shipped",
                    "Canceled","Disputed"]
    
    const submitHandler = (e) => {
        e.preventDefault();
        // PATCH /update/{oid}
        axios.patch(`${orderURL}/update/${selected.orderNumber}`,selected)
        .then(()=>{
            let order = []
            orders.forEach(o => {
                if(o.orderNumber == selected.orderNumber){
                    order = [...order, selected]
                }else{
                    order = [...order,o]
                }
            })
            setOrders(order)
            setShow({...show,
                editCanvas:true
            })
        })
        .catch(err=>{console.error();})       
    }

    return (
    <div>
        <Form>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridShippedDate">
                    <Form.Label>Shipped Date</Form.Label>
                    <Form.Control type='date' value={selected.shippedDate} onChange={e=>{
                        setSelect({...selected,shippedDate:e.target.value})
                    }}/>
                </Form.Group>

                <Form.Group  as={Col} controlId="formGridStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Select onChange={e=>{
                        setSelect({...selected,status:e.target.value})
                    }}>
                    {
                        actions.map(action=>{
                            return (
                                <option selected={selected.status == action} value={action}>{action}</option>
                            )
                        })
                    }
                    </Form.Select>
                </Form.Group>
            </Row>
            <Form.Group controlId="formGridComments">
            <Form.Label>Comments</Form.Label>
            <Form.Control as='textarea' value={selected.comments} onChange={e=>{
                setSelect({...selected,comments:e.target.value})
            }}/>
            </Form.Group>

            <Button variant="primary" onClick={submitHandler}>
                Submit
            </Button>
        </Form>
    </div>    
    );
}
