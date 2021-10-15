import CustomersList from '../components/CustomersList'
import {Tab, Row, Col, ListGroup, Navbar, Container} from 'react-bootstrap'
import { useRouter } from 'next/router'
import Button from '@restart/ui/esm/Button'

export default function Address(){
    const router = useRouter()
    const {id} = router.query

    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">
                <h1>Catalog Homepage</h1>{' '}
            </Navbar.Brand>
            <Button variant="danger">Logout</Button>
            </Container>
        </Navbar>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#customer">
            <Row>
                <Col sm={4}>
                <ListGroup>
                    <ListGroup.Item action href="#customer">Customers</ListGroup.Item>
                    <ListGroup.Item action href="#stock">Stock management</ListGroup.Item>
                    <ListGroup.Item action href="#order">orders</ListGroup.Item>
                    <ListGroup.Item action href="#payment">paymentation</ListGroup.Item>
                    <ListGroup.Item action href="#promote">employees management</ListGroup.Item>
                </ListGroup>
                </Col>
                <Col sm={8}>
                <Tab.Content>
                    <Tab.Pane eventKey="#customer">
                        <CustomersList id={id}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#stock">

                    </Tab.Pane>
                    <Tab.Pane eventKey="#order">

                    </Tab.Pane>
                    <Tab.Pane eventKey="#payment">

                    </Tab.Pane>
                    <Tab.Pane eventKey="#promote">

                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    </>)
}