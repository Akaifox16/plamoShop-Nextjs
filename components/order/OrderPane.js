import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Table, Button, Offcanvas } from "react-bootstrap";
const orderURL = 'http://127.0.0.1:8000/api/order'

import OrderEditForm from "./OrderEditForm";

import { CustomerContext } from "../CustomersList";
export const OrderContext = createContext()

export default function OrderPane(){
    const {customer} = useContext(CustomerContext)
    const [show, setShow] = useState(false)
    const [orders, setOrders] = useState([])
    const [selected,setSelect] = useState({
        customerNumber: customer.customerNumber,
        orderNumber: 0,
        orderDate: "",
        shippedDate: "",
        status: "",
        comments: ""
    })
    const [method,setMethod] = useState()

    const fetchOrders = ()=>{
        axios.get(`${orderURL}/${customer.customerNumber}`)
            .then(res=>{
                setOrders(res.data.orders)
            })
            .catch(err=>{console.error()})
    }

    useEffect(()=>{
        const data = localStorage.getItem('orders')
        if(data){
            setOrders(JSON.parse(data))
        }else{
            fetchOrders()
        }
    },[])
    useEffect(()=>{
        setSelect({...selected,customerNumber:customer.customerNumber})
        fetchOrders()
    },[customer.customerNumber])
    useEffect(()=>{
        localStorage.setItem('orders',JSON.stringify(orders))
    },[orders])

    return (
        <div>
            <Table striped>
                <thead>
                    <tr>
                    <td><h5>OID</h5></td>
                    <td><h5>Ordered date</h5></td>
                    <td><h5>Shipped date</h5></td>
                    <td><h5>Status</h5></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order=>{
                            return(
                                <tr key={order.orderNumber}>
                                    <td>{order.orderNumber}</td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.shippedDate}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <Button variant="success" onClick={
                                            ()=>{
                                                setSelect({
                                                    ...selected,
                                                    orderNumber: order.orderNumber,
                                                    orderDate: order.orderDate,
                                                    status: order.status,
                                                    comments: order.comments
                                                })
                                                setMethod('Edit')
                                                setShow(true)
                                            }
                                        }>Edit</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <OrderContext.Provider value={{orders, selected, setShow, setSelect, setOrders}}>
                <Offcanvas show={show} onHide={()=>{
                    setShow(false)
                }} placement='bottom' className='h-auto'>
                    <Offcanvas.Header>
                        <Offcanvas.Title>{method} order</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {method ? method == 'Edit' ? <OrderEditForm />:"Can't wait to create new order":"no method selected"}
                    </Offcanvas.Body>
                </Offcanvas>
            </OrderContext.Provider>
        </div>
    )
}