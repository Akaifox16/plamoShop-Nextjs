import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Table, Button, Offcanvas, Form } from "react-bootstrap";
const orderURL = 'http://127.0.0.1:8000/api/order'

import OrderEditForm from "./OrderEditForm";

import { CustomerContext } from "../CustomersList";
import OrderDetails from "./OrderDetails";
export const OrderContext = createContext()

function OrderTableRow(props) {
    const {order ,isNotDoneOrder} = props
    const {selected, show, setShow, setSelect, setMethod} = useContext(OrderContext)
    
    const showCanvas = ()=>{
        setShow({...show,
            editCanvas:true
        })
    }
    const toggleDetails = ()=>{
        setShow({...show,
            details: true
        })
    }

    return (
        <tr key={order.orderNumber}>
            <td>{order.orderNumber}</td>
            <td>{order.orderDate}</td>
            <td>{order.shippedDate}</td>
            <td>{order.status}</td>
            <td>{order.comments}</td>
            <td>
                {isNotDoneOrder && isNotDoneOrder(order.status) ? 
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
                        showCanvas()
                    }
                }>Edit</Button>:
                <Button variant="success" disabled >Edit</Button>
                }
                {' '}
                <Button variant='info' onClick={()=>{
                    setSelect(order)
                    toggleDetails()
                }}>Details</Button>
            </td>
        </tr>
    )
}

export default function OrderPane(){
    const {customer} = useContext(CustomerContext)
    const [show, setShow] = useState({editCanvas:false,showAll:false,details:false})
    const [orders, setOrders] = useState([])
    const [selected,setSelect] = useState({
        customerNumber: customer.customerNumber,
        orderNumber: 0,
        orderDate: "",
        shippedDate: "",
        status: "",
        comments: "",
        paymentNumber: ""
    })
    const [method,setMethod] = useState()
    const unDoneStatus = ['In Process','On Hold']

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
        setShow({...show,details:false})
    },[customer.customerNumber])
    useEffect(()=>{
        localStorage.setItem('orders',JSON.stringify(orders))
    },[orders])

    const isNotDoneOrder = (status)=>{
        return unDoneStatus.includes(status)
    }
    

    return (
        <div>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="See All" onClick={()=>{setShow({...show,showAll: !show.showAll,details:false})}}/>
            </Form.Group>
            </Form>
            <OrderContext.Provider value={{orders, selected, show, setShow, setSelect, setOrders, setMethod}}>
            <div>
                <div>
                <Table striped>
                    <thead>
                        <tr>
                        <td><h5>OID</h5></td>
                        <td><h5>Ordered date</h5></td>
                        <td><h5>Shipped date</h5></td>
                        <td><h5>Status</h5></td>
                        <td className='w-25'><h5>Comments</h5></td>
                        </tr>
                    </thead>
                    <tbody>
                        {show.showAll ?
                            orders.map(order => {
                                return(
                                    <OrderTableRow order={order} isNotDoneOrder={isNotDoneOrder}/>
                                )
                            }) :
                            orders.filter(order => {return isNotDoneOrder(order.status)})
                            .map(order => {
                                return (
                                    <OrderTableRow order={order} isNotDoneOrder={isNotDoneOrder}/>
                            )})
                        }
                    </tbody>
                </Table>
                </div>
                <div>
                {show.details && <OrderDetails/>}
                </div>
            </div>
            <Offcanvas show={show.editCanvas} onHide={()=>{
                setShow({...show,editCanvas:false})
            }} placement='bottom' className='h-auto'>
                <Offcanvas.Header>
                    <Offcanvas.Title>{method} order</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {method && method == 'Edit' ? <OrderEditForm />:"Can't wait to create new order"}
                </Offcanvas.Body>
            </Offcanvas>
            </OrderContext.Provider>
        </div>
    )
}