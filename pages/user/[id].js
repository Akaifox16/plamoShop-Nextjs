import {createContext, useEffect, useState } from 'react'
import { useRouter} from "next/router"
import { SSRProvider } from '@react-aria/ssr'
import {Tab, Row, Col, ListGroup, Navbar, Container, Accordion, Button} from 'react-bootstrap'

import CustomersList from '../../components/CustomersList'
import Employeelist from '../../components/EmployeeMgmt'
import StockInList from '../../components/stock/StockInList'
import ProductList from '../../components/product/ProductList'

export const UserContext = createContext({})

function Logout(){
    const router = useRouter()
    const logout = ()=>{
        sessionStorage.removeItem("token")
        localStorage.clear()
        router.push(`/`)
    }

    return(
        <Button variant="danger" size="lg" onClick={logout}>Logout</Button>
    )
}

export default function Address(){
    const [user, setUser] = useState({
        employeeNumber: 0,
        jobTitle: "",
    })
    useEffect(()=>{
        const currentUser = JSON.parse(sessionStorage.getItem("token"))
        if(currentUser !== undefined){
            setUser({...user,employeeNumber: currentUser.employeeNumber, jobTitle: currentUser.jobTitle})
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
                        {<Accordion.Item eventKey="1">
                            <Accordion.Header>Stock management</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    <ListGroup.Item action href="#stock">Stock-in</ListGroup.Item>
                                    <ListGroup.Item action href="#product">Product</ListGroup.Item>
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>}
                    </Accordion>
                        {user.jobTitle === "VP Sales" && <ListGroup.Item action href="#promote">Employees management</ListGroup.Item>}
                    </ListGroup>
                    
                    </Col>
                    <Col sm={8}>
                    <Tab.Content>
                        <Tab.Pane eventKey="#customer">
                            <CustomersList />
                        </Tab.Pane>
                        <Tab.Pane eventKey="#stock">
                            <StockInList />
                        </Tab.Pane>
                        <Tab.Pane eventKey="#product">
                            <ProductList />
                        </Tab.Pane>
                        <Tab.Pane eventKey="#promote">
                            {user.jobTitle === "VP Sales" && <Employeelist />}
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </SSRProvider>
        </UserContext.Provider>
    )
}