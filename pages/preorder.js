import { Col, Container, Navbar } from "react-bootstrap";
import EmployeeLogin from "../components/EmployeeLogin";


export default function Preorder() {
    return (<>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">
                <h1>7-lnw-JoanSalad</h1>
            </Navbar.Brand>
            <Col sm={2}><EmployeeLogin/></Col>
            </Container>
        </Navbar>

    </>)
}   