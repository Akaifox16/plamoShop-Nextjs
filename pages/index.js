import Link from 'next/link'
import EmployeeLogin from './components/EmployeeLogin'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Navbar} from 'react-bootstrap'

export default function App(){
  const [catalogs,setCatalogs] = useState([])
  const fetch = async () =>{
    
  }
  useEffect(fetch,[])
  
  return ( <>
    <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">
                <h1>Catalog Homepage</h1>
            </Navbar.Brand>
            <Col sm={2}><EmployeeLogin/></Col>
            </Container>
    </Navbar>
    <table>
        <tbody>
          
          {catalogs.map(catalog => {
            return (<Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>)
          })
          }
        </tbody>
    </table>
  </>)
}