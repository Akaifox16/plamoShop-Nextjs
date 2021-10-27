import EmployeeLogin from "../components/EmployeeLogin";
import { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'
import {Card, Col, Row, ListGroup, ListGroupItem, Button, Navbar, Container} from 'react-bootstrap'
const baseURL = 'http://127.0.0.1:8000/api'

export default function Preorder() {
   
    const [catalogs,setcatalogs] = useState([])
    const [catalog,setcatalog] = useState(null)
    const btnText = {selected: 'selected',select: 'select'}
    const fetch = () =>{
            axios.get(`${baseURL}/catalog/noquantity`)
            .then(response => {
                setcatalogs(response.data)
            })
    }
    useEffect(fetch,[])
    useEffect(()=>{
        localStorage.setItem('catalogs',JSON.stringify(catalogs))
    },[catalogs])
    useEffect(()=>{
        localStorage.setItem('catalog',JSON.stringify(catalog))
    },[catalog])
    



    return (<>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">
                <h1>7-lnw-JoanSalad</h1>
            </Navbar.Brand>
            <Col sm={2}><EmployeeLogin/></Col>
            </Container>
        </Navbar>
        <h3> This is your Pre-Oder Product</h3>
        <hr />
        <Row xs="auto" md={4} className="g-4">
        {catalogs.map((c) => (
            <Col key={c.productCode}>
            <Card border="info" style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>{c.productName}</Card.Title>
                <Card.Text>
                    Scale : {c.productScale} <br/>
                    Price : {c.MSRP}

                </Card.Text>
                <Button variant={catalog ? 
                c.productCode == catalogs.productCode ? 
                "primary" : "outline-primary"
                : "outline-primary"} onClick={
                    () => {
                        setcatalog(c) 
                    }}>
                        {catalog ? c.productCode == catalog.productCode ? btnText.selected:btnText.select:btnText.select}
                </Button>

                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
        <hr/>
        
    </>)
}   
//คอนเซป: 
//สินค้าใดที่รับเปิด pre-oderอยู๋ 
//จำนวนเท่าใด