import { useState, useEffect, createContext, useContext} from 'react'
import axios from 'axios'
import { Table, Button, Offcanvas } from 'react-bootstrap'
import { StockinContext } from './StockInList'
const baseURL = 'http://127.0.0.1:8000/api'

export default function StockPane() {
    const [stockins, setstockins] = useState([])
    const {catalog} = useContext(StockinContext)
    const fetch = () =>{
        
            axios.get(`${baseURL}/stock/${catalog.productCode}`)
            .then(response => {
                setstockins(response.data.stock)
            })
    }

    useEffect(fetch,[catalog])
    useEffect(()=>{
        localStorage.setItem('stockins',JSON.stringify(stockins))
    },[stockins])


    return (
        <div>
            <Table striped>
            <thead>
            <tr>
                <td><h5>Product Code</h5></td>
                <td><h5>Quantity</h5></td>
                <td><h5>Create at</h5></td>
                <td><h5>Update at</h5></td>

            </tr>
            </thead>
            <tbody>
            {
                    stockins.map(c=>{
                        return(
                            <tr key={c.productCode}>
                                <td>{c.productCode}</td>
                                <td>{c.qty}</td>
                                <td>{c.created_at}</td>
                                <td>{c.updated_at}</td>
                                <td><Button variant="success">Edit</Button> {' '}
                                <Button variant="danger" onClick={()=>{del(c.produtCode)}}>Delete</Button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        </div>
    )
}