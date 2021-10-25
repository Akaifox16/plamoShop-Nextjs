import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Navbar, Button} from 'react-bootstrap'

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