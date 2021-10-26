import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Offcanvas, Table } from "react-bootstrap";
import { OrderContext } from "./OrderPane";
const orderURL = 'http://127.0.0.1:8000/api/order'

export default function OrderDetails(){
    const {orders, show, selected, setShow, setSelect, setOrders} = useContext(OrderContext)
    const [orderDetails,setOrderDetails] =useState([])

    useEffect(()=>{
        axios.get(`${orderURL}/get-details/${selected.orderNumber}`)
        .then(res => {
            setOrderDetails(res.data.orderDetails)
        })
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
        <div>
            <div><h4>Payment No.</h4></div>
            <div>{orders.paymentNumber}</div>
        </div>
        <Offcanvas show={show.editCanvas} onHide={()=>{
                setShow({...show,editCanvas:false})
            }} placement='bottom' className='h-auto'>
                
        </Offcanvas>
        </>
    )
}