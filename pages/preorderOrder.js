import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Navbar, Button, Form, Table} from 'react-bootstrap'
import EmployeeLogin from '../components/EmployeeLogin'

const baseUrl = "http://127.0.0.1:8000/api"

export default function preorderOrder(){
    const [preordercarts,setpreorderCarts] = useState([])
    const [preorderdata,setpreorderData] = useState({customerNumber:0,preorder:[]})
    const [preorderNumber,setpreOrderNo] = useState(0)

    useEffect(()=>{
        const c = JSON.parse(sessionStorage.getItem('preordercarts'))
        setpreorderCarts(c)
        axios.get(`${baseUrl}/get-last-preorder`)
        .then(res=>{
            setpreOrderNo(res.data)
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
                {preordercarts.map(preordercart=>{
                    return (
                        <tr key={preordercart.productName}>
                            <td><h3>{preordercart.productName}</h3></td>
                            <td>
                            <Form.Group key={preordercart.productName} controlId="formGridQty">
                                <Form.Control onChange={e=>{
                                    const dat = preorderdata.preorder.filter(d=>{return d.productCode !== preordercart.productCode})
                                    setpreorderData({...preorderdata, preorder: [...dat,{productCode:preordercart.productCode,preorderQuantity:e.target.value}]})
                                }}/>        
                            </Form.Group>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>

        <Form.Group controlId="formGridCustomerNumber">
            <Form.Label>Customer No.</Form.Label>
            <Form.Control onChange={e=>{
                setpreorderData({...preorderdata,customerNumber: e.target.value})
            }}/>        
        </Form.Group>

        <Row className="align-items-end">
            <Col md={10}></Col>
            <Col md={2}><Button className="mt-3" variant="success" size="lg" onClick={e=>{
                e.preventDefault()
                axios.post(`${baseUrl}/preorder/create/${preorderdata.customerNumber}`,{preorder:preorderdata.preorder, })
                .then(res=>{
                    console.log(preorderdata)
                    console.log(preorderNumber)
                })
            }
            }>Create Preorder</Button></Col>
        </Row>


        </Form>
        </div>
    </>)
}