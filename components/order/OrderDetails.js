import axios from "axios";
import { useContext, useState, useEffect, createContext } from "react";
import { Button, Col, Offcanvas, Row, Table } from "react-bootstrap";
import PaymentAddForm from "../payment/PaymentAddForm";
import { OrderContext } from "./OrderPane";
const orderURL = 'http://127.0.0.1:8000/api/order'

export const OffCanvasContext = createContext()

export default function OrderDetails(){
    const {selected} = useContext(OrderContext)
    const [orderDetails,setOrderDetails] =useState([])
    const [method,setMethod] = useState('')
    const [show,setShow] = useState({addCanvas:false})

    const fetchDetails = () =>{
        axios.get(`${orderURL}/get-details/${selected.orderNumber}`)
        .then(res => {
            setOrderDetails(res.data.orderDetails)
        })
    }

    useEffect(()=>{
        fetchDetails()
    },[selected])

    const total = (sum,order) => sum + order

    return (<>
        <Table>
            <thead>
                <tr>
                    <td>No.</td>
                    <td>Product Code</td>
                    <td>Qty</td>
                    <td>Price</td>
                </tr>
            </thead>
            <tbody>
                {
                    orderDetails.map(od => {
                        return(
                            <tr key={od.orderLineNumber}>
                                <td>{od.orderLineNumber}</td>
                                <td>{od.productCode}</td>
                                <td>{od.quantityOrdered}</td>
                                <td>{od.priceEach}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            <tfoot>
                <td>Total</td>
                <td></td>
                <td></td>
                <td> 
                {
                    orderDetails.map(od => {return Number(od.quantityOrdered) * Number(od.priceEach)})
                    .reduce(total,0).toFixed(2)
                }
                </td>
            </tfoot>
        </Table>
            <Row>
                <Col sm={10}><h4>Payment No.</h4></Col>
                <Col sm={2}>{selected.paymentNumber ? 
                <p>{selected.paymentNumber}</p> : 
                <Button onClick={e => {
                    setMethod('Add')
                    setShow({...show,addCanvas:true})
                }}>Add</Button>}</Col>
            </Row>
        <OffCanvasContext.Provider value={{show, setShow, setMethod}}>
        <Offcanvas show={show.addCanvas} onHide={()=>{
                setShow({...show,addCanvas:false})
            }} placement='bottom' className='h-50'>
            <Offcanvas.Header>
                <Offcanvas.Title>{method} payment</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {method && method == 'Add' ? <PaymentAddForm />:"Can't wait to create new order"}
            </Offcanvas.Body>
        </Offcanvas>
        </OffCanvasContext.Provider>
        </>
    )
}