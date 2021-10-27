import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Navbar, Button, Form, Table} from 'react-bootstrap'
import EmployeeLogin from '../components/EmployeeLogin'

const baseUrl = "http://127.0.0.1:8000/api"

export default function Order(){
const [carts,setCarts] = useState([])
const [data,setData] = useState({customerNumber:0,order:[]})
const [orderNumber,setOrderNo] = useState(0)

useEffect(()=>{
    const c = JSON.parse(sessionStorage.getItem('carts'))
    setCarts(c)
    axios.get(`${baseUrl}/get-last-order`)
    .then(res=>{
        setOrderNo(res.data)
    })
},[])

return ( <>
    <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">
                <h1>7-lnw-JoanSalad</h1>
            </Navbar.Brand>
            <Col sm={2}><EmployeeLogin/></Col>
            </Container>
    </Navbar>
    <div className="m-4">
    <Form>
        <Table>
            <thead>
                <tr>
                <td>Product Name</td>
                <td>Qty.</td>
                </tr>
            </thead>
            <tbody>
                {carts.map(cart=>{
                    return (
                        <tr key={cart.productName}>
                            <td><h3>{cart.productName}</h3></td>
                            <td>
                            <Form.Group key={cart.productName} controlId="formGridQty">
                                <Form.Control onChange={e=>{
                                    const dat = data.order.filter(d=>{return d.productCode !== cart.productCode})
                                    setData({...data, order: [...dat,{productCode:cart.productCode, quantityOrdered:e.target.value, MSRP:cart.MSRP}]})
                                }}/>        
                            </Form.Group>
                            </td>
                            <td><Button className="mt-1" variant="danger" onClick={e=>{
                                const remain =carts.filter(c=>{return cart.productCode !== c.productCode})
                                setCarts(remain)
                                sessionStorage.setItem('carts',JSON.stringify(remain))
                            }}> Delete </Button></td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>

        <Form.Group controlId="formGridCustomerNumber">
            <Form.Label>Customer No.</Form.Label>
            <Form.Control onChange={e=>{
                setData({...data,customerNumber: e.target.value})
            }}/>        
        </Form.Group>
        <Row className="align-items-end">
            <Col md={10}></Col>
            <Col md={2}><Button className="mt-3" variant="success" size="lg" onClick={e=>{
                e.preventDefault()
                axios.post(`${baseUrl}/order/create/${data.customerNumber}`,{orderNumber: orderNumber})
                .then(res=>{
                    console.log({order:data.order, orderNumber: orderNumber})
                    axios.post(`${baseUrl}/order/create-details`,{order:data.order, orderNumber: orderNumber})
                    .then(res=>{
                        sessionStorage.removeItem('carts')
                        setCarts([])
                        setData({customerNumber:0,order:[]})
                    })
                    .catch(e=>{console.error()})
                })
                .catch(err=>{console.error()})
            }
            }>Create Order</Button></Col>
        </Row>
    </Form>
    </div>
</>)
}