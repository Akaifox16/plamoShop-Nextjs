import { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'
import {Card, Col, Row, ListGroup, ListGroupItem, Button} from 'react-bootstrap'
const baseURL = 'http://127.0.0.1:8000/api'

export default function StockInList(){
    const [catalog,setcatalog] = useState([])
    const [stockIn,setStockIn] = useState([])
    const fetch = () =>{
        const dat = localStorage.getItem('catalog')
        if(dat){
            setcatalog(JSON.parse(dat))
        }else{
            axios.get(`${baseURL}/catalog`)
            .then(response => {
                setcatalog(response.data)
            })
        }
    }

    useEffect(fetch,[catalog])

    return (<div className='m-4'>
        <h3> This is yours stock-in Product</h3>
        <hr />
        <Row xs="auto" md={4} className="g-4">
        {catalog.map((c) => (
            <Col key={c.productCode}>
            <Card border="info" style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>{c.productName}</Card.Title>
                <Card.Text>
                    Description : {c.productDescription}
                </Card.Text>
                
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
        <hr/>
        
    </div>)
}