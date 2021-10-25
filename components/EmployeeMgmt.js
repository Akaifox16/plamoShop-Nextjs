import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {Card, Col, Row, ListGroup, ListGroupItem, Button} from 'react-bootstrap'
const baseURL = 'http://127.0.0.1:8000/api'

import { UserContext } from '../pages/user/[id]'

export default function Employeelist(){
    const [employees,setEmployees] = useState([])
    const id = useContext(UserContext)
    const fetch = () =>{
        const dat = localStorage.getItem('employees')
        if(dat){
            setEmployees(JSON.parse(dat))
        }else{
            axios.get(`${baseURL}/employees`)
            .then(response => {
                setEmployees(response.data)
            })
        }
    }

    const promote = async (id,jobTitle) => {
        let Job = "Sales Rep"
        if(jobTitle === 'Sales Rep'){
            Job = "Manager"
        }
        const data = {employeeNumber:id, jobtitle:Job}
        await axios.post(`${baseURL}/promote`,data)
        const response = await axios.get(`${baseURL}/employee/${id}`)
        let newEmployees =[]
        employees.forEach(employee=>{
            if(employee.employeeNumber == id){
                newEmployees = [...newEmployees,response.data]
            }else{
                newEmployees = [...newEmployees,employee]
            }
        })
        setEmployees(newEmployees)
    }

    useEffect(fetch,[])
    useEffect(()=>{
        localStorage.setItem('employees',JSON.stringify(employees))
    },[employees])

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
                    ID : {c.employeeNumber} <br></br>
                    Email : {c.email}
                </Card.Text>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Jobtitle : {c.jobTitle}</ListGroupItem>
                    <ListGroupItem>Boss : {c.reportsTo}</ListGroupItem>
                </ListGroup>
                <Button variant="outline-primary" onClick={()=>{
                    promote(c.employeeNumber,c.jobTitle)
                }
                }>{c.jobTitle== "Sales Rep" ?"Promote":"Demote"}</Button>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
        <hr/>
    </div>)
}