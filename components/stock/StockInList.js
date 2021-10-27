import { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'
import {Card, Col, Row, ListGroup, ListGroupItem, Button} from 'react-bootstrap'
import StockPane from './StockPane'
const baseURL = 'http://127.0.0.1:8000/api'
export const StockinContext = createContext()

export default function StockInList(){
    const [catalogs,setcatalogs] = useState([])
    const [catalog,setcatalog] = useState(null)
    const btnText = {selected: 'selected',select: 'select'}
    const fetch = () =>{
        // const dat = localStorage.getItem('catalogs')
        // if(dat){
            // setcatalogs(JSON.parse(dat))
        // }else{
            axios.get(`${baseURL}/catalog`)
            .then(response => {
                setcatalogs(response.data)
            })
        // }
    }
    useEffect(fetch,[])
    useEffect(()=>{
        localStorage.setItem('catalogs',JSON.stringify(catalogs))
    },[catalogs])
    useEffect(()=>{
        localStorage.setItem('catalog',JSON.stringify(catalog))
    },[catalog])
    
    

    return (<div className='m-4'>
        <h3> This is yours stock-in Product</h3>
        <hr />
        <Row xs="auto" md={4} className="g-4">
        {catalogs.map((c) => (
            <Col key={c.productCode}>
            <Card border="info" style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>{c.productName}</Card.Title>
                <Card.Text>
                    Code : {c.productCode} <br/>
                    Line : {c.productLine}
                </Card.Text>
                <Button variant={catalog ? 
                c.productCode == catalogs.productCode ? 
                "primary" : "outline-primary"
                : "outline-primary"} onClick={
                    () => {
                        setcatalog(c) 
                    }}>
                        {catalog ? c.productCode == catalog.productCode ? btnText.selected:btnText.select:btnText.select}
                </Button>
                
                
                
                
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
        <hr/>
        <StockinContext.Provider value={{catalog}}>
        {
            catalog && <StockPane />
        }
        </StockinContext.Provider>
    </div>)
}