import CustomersList from '../components/CustomersList'
import Logout from '../components/Logout'
import {Tab, Row, Col, ListGroup, Navbar, Container, Accordion} from 'react-bootstrap'
import { useRouter } from 'next/router'

export default function Address(){
    const router = useRouter()
    const {id} = router.query

    return (
        <>
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
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Customers service</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                <ListGroup.Item action href="#customer">Customer Service</ListGroup.Item>
                                <ListGroup.Item disabled action href="#address">Addresses</ListGroup.Item>
                                <ListGroup.Item disabled action href="#order">Orders</ListGroup.Item>
                                <ListGroup.Item disabled action href="#payment">Paymentation</ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Stock management</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                <ListGroup.Item action href="#stock">Stock-in</ListGroup.Item>
                                <ListGroup.Item action href="#product">Product</ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Employee management</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                <ListGroup.Item action href="#promote">Employees management</ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                </ListGroup>
                </Col>
                <Col sm={8}>
                <Tab.Content>
                    <Tab.Pane eventKey="#customer">
                        <CustomersList id={id}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#address">
                        
                    </Tab.Pane>
                    <Tab.Pane eventKey="#order">

                    </Tab.Pane>
                    <Tab.Pane eventKey="#payment">

                    </Tab.Pane>
                    <Tab.Pane eventKey="#stock">

                    </Tab.Pane>
                    <Tab.Pane eventKey="#product">

                    </Tab.Pane>
                    <Tab.Pane eventKey="#promote">

                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    </>)
}