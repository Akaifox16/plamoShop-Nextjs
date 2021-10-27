import { useState, useEffect, createContext, useContext} from 'react'
import axios from 'axios'
import { Table, Button, Offcanvas } from 'react-bootstrap'
import StockAddForm from './StockAddForm'
import { StockinContext } from './StockInList'
const baseURL = 'http://127.0.0.1:8000/api'
export const StockpaneContext = createContext()

export default function StockPane() {
    const [stockins, setstockins] = useState([])
    const {catalog} = useContext(StockinContext)
    const fetch = () =>{
            axios.get(`${baseURL}/stock/${catalog.productCode}`)
            .then(response => {
                setstockins(response.data.stock)
            })
    }

    const [selected,setSelect] = useState({
        productCode: catalog.productCode,
        qty: 0})
    const [method,setMethod] = useState()
    const [show, setShow] = useState(false);

    useEffect(()=>{
        setSelect({...selected,productCode:catalog.productCode})
        axios.get(`${baseURL}/stock/${catalog.productCode}`) // GET /getstockByID/$id
        .then(res => {setstockins(res.data.stock)})    
    },[catalog.productCode])

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
                                <td>{catalog.productCode}</td>
                                <td>{c.qty}</td>
                                <td>{c.created_at}</td>
                                <td>{c.updated_at}</td>
                                
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        <Button variant="primary" size="lg" onClick={
            ()=>{
                setShow(true)
                setMethod('Add')
            }
        }>Add</Button>
        <StockpaneContext.Provider value={{stockins,selected,setShow,setSelect,setstockins}}>
            <Offcanvas show={show} onHide={()=>{
                setShow(false)
                setMethod()
            }} placement='bottom' className='h-auto' >
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>{method} stock_in</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {method && <StockAddForm />}
                </Offcanvas.Body>
            </Offcanvas>

        </StockpaneContext.Provider>
        </div>
    )
}