import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Table, Button, Offcanvas } from "react-bootstrap";
const baseURL = 'http://127.0.0.1:8000/api/order'

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
        status: ""
    })
    const [method,setMethod] = useState()

    const fetchOrders = ()=>{
        axios.get(`${baseURL}/${customer.customerNumber}`)
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
                    <td><h5>OID</h5></td>
                    <td><h5>Ordered date</h5></td>
                    <td><h5>Shipped date</h5></td>
                    <td><h5>Status</h5></td>
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
                }} placement='end'>
                    <Offcanvas.Header>
                        <Offcanvas.Title>{method} order</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {method ? method == 'Edit' ? "Ready to Edit this Order":"Can't wait to create new order":"no method selected"}
                    </Offcanvas.Body>
                </Offcanvas>
            </OrderContext.Provider>
        </div>
    )
}