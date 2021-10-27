import EmployeeLogin from "../components/EmployeeLogin";
import { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'
import { Container, Row, Col, Card, Navbar, Button, ListGroup, ListGroupItem, Badge} from 'react-bootstrap'
const baseURL = 'http://127.0.0.1:8000/api'

export default function Preorder() {
   
    const [catalogs,setcatalogs] = useState([])
    const [catalog,setcatalog] = useState(null)
    const [preordercarts,setpreorderCarts] = useState([])
    const btnText = {selected: 'selected',select: 'select'}

    const fetch = () =>{
            axios.get(`${baseURL}/catalog/noquantity`)
            .then(response => {
                setcatalogs(response.data)
            })
    }

    useEffect(()=>{
        fetch()
        const sessCart = sessionStorage.getItem('preordercarts');
        if(sessCart){
            setpreorderCarts(JSON.parse(sessCart))
        }
      },[])
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
        <Button variant="success" size="lg" href='preorderOrder'>Cart <Badge pill bg='danger'>{preordercarts.reduce((sum)=>sum +1 ,0)}</Badge></Button>
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
                <Button variant="primary" onClick={e=>{
                      if(!preordercarts.includes(catalog.productName)){
                        setpreorderCarts([...preordercarts,{  productName:catalog.productName,
                                              productCode:catalog.productCode,
                                              MSRP:catalog.MSRP}])
                      }}
                    }>Add to cart</Button>

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