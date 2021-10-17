import { useState, useEffect } from 'react'
import axios from 'axios'
import {Card, Col, Row, ListGroup, ListGroupItem, Button} from 'react-bootstrap'
import EmployeeTab from './EmployeeTab'
const baseURL = 'http://127.0.0.1:8000/api'

export default function Employeelist(props){
    const [employees,setEmployees] = useState([])
    const [employee,setEmployee] = useState()
    const {id} = props
    const fetch = async () =>{
        const dat = localStorage.getItem('employees')
        if(dat){
            setEmployees(JSON.parse(dat))
        }else{
            const response = await axios.get(`${baseURL}/employees`)
            setEmployees(response.data)
        }
        const dat1 = localStorage.getItem('employee')
        if(dat1){
            setEmployee(JSON.parse(dat1))
        }
    }

    useEffect(fetch,[])
    useEffect(()=>{
        localStorage.setItem('employees',JSON.stringify(employees))
    },[employees])
    useEffect(()=>{
        localStorage.setItem('employee',JSON.stringify(employee))
    },[employee])

    return (<div>
        <h4> This is yours employees</h4>
        <hr />
        <Row xs="auto" md={4} className="g-4">
        {employees.map((c) => (
            <Col key={c.employeeNumber}>
            <Card border="info" style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>{c.firstName}</Card.Title>
                <Card.Text>
                    Email : {c.email} 
                </Card.Text>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Jobtitle : {c.jobTitle}</ListGroupItem>
                    <ListGroupItem>Boss : {c.reportsTo}</ListGroupItem>
                </ListGroup>
                <Button variant="outline-primary" onClick={
                    e => {setEmployee(c)}
                }>select</Button>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
        <hr/>
        {
            employee && <EmployeeTab employeeNumber={employee.employeeNumber}/>
        }
    </div>)
}