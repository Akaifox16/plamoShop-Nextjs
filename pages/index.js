import axios from 'axios'
import { execOnce } from 'next/dist/shared/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Navbar, Button, ListGroup, ListGroupItem} from 'react-bootstrap'

const BaseUrl = "http://127.0.0.1:8000/api"
function EmployeeLogin(){
    const [token,setToken] = useState(null)
    function fetch() {
        const login = sessionStorage.getItem("token")
        if(login){
            const dat = JSON.parse(login)
            setToken(dat)
        }
    }
    useEffect(fetch,[])
    
    if(!token){
        return <div className="m-3" ><Link href='/login'><Button variant="primary" size="lg" >Login</Button></Link></div>
    }

    return (
        <div className ="m-3"><Link href= {`/user/${token.employeeNumber}`} ><Button variant="primary" size="lg" >Welcome {token.firstName}</Button></Link></div>
    )
}

export default function App(){
  const [catalogs,setCatalogs] = useState([])
  const fetch = async () =>{
    axios.get(`${BaseUrl}/catalog`).then(res=>{setCatalogs(res.data)})
  }
  useEffect(fetch,[])
  
  return ( <>
    <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">
                <h1>7-lnw-JoanSalad</h1>
            </Navbar.Brand>
            <Col sm={2}><EmployeeLogin/></Col>
            </Container>
    </Navbar>
    
    <Button variant="primary" size="lg" onClick={()=>{
      console.log("create new order")
    }}>Create New</Button>

    <table>
        <tbody>
        <div classname = "g=4">
        <Row xs="auto" md={4} className="g-4">
          {catalogs.map(catalog => {
            return (<Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{catalog.productName}</Card.Title>
                  <Card.Text>
                    
                  </Card.Text>
                  </Card.Body>
                  
                <ListGroup className = "show">
                  <ListGroupItem> Price {catalog.buyPrice}</ListGroupItem>
                  <ListGroupItem> Quantity {catalog.quantityInStock}</ListGroupItem>
                </ListGroup>
                  <Card.Body>
                  <Button variant="primary">Add to cart</Button>
                  </Card.Body>
                
                 
              </Card>)
          })
          }
          </Row>
          </div>
        </tbody>
    </table>
  </>)
}