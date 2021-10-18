import CustomersList from '../components/CustomersList'
import { SSRProvider } from '@react-aria/ssr'
import Logout from '../components/Logout'
import {Tab, Row, Col, ListGroup, Navbar, Container, Accordion} from 'react-bootstrap'
import Employeelist from '../components/EmployeeMgmt'
import {createContext, useEffect, useState } from 'react'

export const UserContext = createContext({})

export default function Address(){
    const [user, setUser] = useState(0)
    const [job, setJob] = useState("")
    useEffect(()=>{
        const currentUser = JSON.parse(sessionStorage.getItem("token"))
        if(currentUser !== undefined){
            //console.log(currentUser)
            setUser(currentUser.employeeNumber)
            setJob(currentUser.jobTitle)
        }
    },[])

    return (
        <UserContext.Provider value={user}>
            <SSRProvider>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">
                    <h1>7-lnw-JoanSalad</h1>
                </Navbar.Brand>
                <Col sm={2}><Logout/></Col>
                </Container>
            </Navbar>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#customer">
                <Row>
                    <Col sm={4}>
                    <ListGroup>
                        <ListGroup.Item action href="#customer">Customer Service</ListGroup.Item>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Stock management</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    <ListGroup.Item action href="#stock">Stock-in</ListGroup.Item>
                                    <ListGroup.Item action href="#product">Product</ListGroup.Item>
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                        {job === "VP Sales" && <ListGroup.Item action href="#promote">Employees management</ListGroup.Item>}
                    </ListGroup>
                    </Col>
                    <Col sm={8}>
                    <Tab.Content>
                        <Tab.Pane eventKey="#customer">
                            <CustomersList />
                        </Tab.Pane>
                        <Tab.Pane eventKey="#stock">

                        </Tab.Pane>
                        <Tab.Pane eventKey="#product">

                        </Tab.Pane>
                        <Tab.Pane eventKey="#promote">
                            {job === "VP Sales" && <Employeelist />}
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </SSRProvider>
        </UserContext.Provider>
    )
}