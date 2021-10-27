import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Navbar, Button, ListGroup, ListGroupItem, Badge} from 'react-bootstrap'
import EmployeeLogin from '../components/EmployeeLogin'

const BaseUrl = "http://127.0.0.1:8000/api"

export default function App(){
  const [catalogs,setCatalogs] = useState([])
  const [carts,setCarts] = useState([])

  const fetch = async () =>{
    axios.get(`${BaseUrl}/catalog`).then(res=>{setCatalogs(res.data)})
  }
  useEffect(()=>{
    fetch()
    const sessCart = sessionStorage.getItem('carts');
    if(sessCart){
      setCarts(JSON.parse(sessCart))
    }
  },[])
  useEffect(()=>{
    sessionStorage.setItem('carts',JSON.stringify(carts))
  },[carts])

  return ( <>
    <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">
                <h1>7-lnw-JoanSalad</h1>
            </Navbar.Brand>
            <Col sm={2}><EmployeeLogin/></Col>
            </Container>
    </Navbar>
    <div className="m-1">
    <Button variant="success" size="lg" href='order'>Cart <Badge pill bg='danger'>{carts.reduce((sum)=>sum +1 ,0)}</Badge></Button>
    {' '}
    <Button variant="primary" size="lg" href='preorder'>Pre Order <Badge pill bg='secondary'>new</Badge></Button>
    </div>
    <table>
        <tbody>
        <div classname = "g=4">
        <Row xs="auto" md={6} className="g-4">
          {catalogs.map(catalog => {
            return ( 
              <Col key={catalog.productNumber}>
              <Card key={catalog.productName} className="h-100">
                <Card.Body>
                  <Card.Title>{catalog.productName}</Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem> Scale {catalog.productScale}</ListGroupItem>
                    <ListGroupItem> Price {catalog.buyPrice}</ListGroupItem>
                    <ListGroupItem> Quantity {catalog.quantityInStock}</ListGroupItem>
                  </ListGroup>
                    <Button variant="primary" onClick={e=>{
                      if(!carts.includes(catalog.productName)){
                        setCarts([...carts,{  productName:catalog.productName,
                                              productCode:catalog.productCode,
                                              MSRP:catalog.MSRP}])
                      }}
                    }>Add to cart</Button>
                  </Card.Body>
              </Card>
              </Col>
            )})
          }
          </Row>
          </div>
        </tbody>
    </table>
  </>)
}