import Link from 'next/link'
import EmployeeLogin from './components/EmployeeLogin'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

export default function App(){
  const [catalogs,setCatalogs] = useState([])
  const fetch = async () =>{

  }
  useEffect(fetch,[])
  
  return ( <>
    <Container>
      <Row>
        <Col sm={8}><h1>Catalogs</h1></Col>
        <Col sm={4}><EmployeeLogin/></Col>
      </Row>
    </Container>
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