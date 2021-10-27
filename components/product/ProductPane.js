import { useState, useEffect, createContext, useContext} from 'react'
import axios from 'axios'
import { Table, Button, Offcanvas } from 'react-bootstrap'
import { ProductContext } from './ProductList'
export const ProductPaneContext = createContext()
import ProductAddForm from './ProductAddForm'
import ProductEditForm from './ProductEditForm'

const baseURL = 'http://127.0.0.1:8000/api'

export default function ProductPane(){
    const {catalog} = useContext(ProductContext)
    const [products, setproducts] = useState([])

    const fetch = () =>{
        axios.get(`${baseURL}/product/${catalog.productCode}`)
        .then(response => {
            setproducts(response.data.product)
        })
    }

    const [selected,setSelect] = useState({
        productCode: catalog.productCode,
        quantityInStock: 0})
    const [method,setMethod] = useState()
    const [show, setShow] = useState(false);

    useEffect(()=>{
        setSelect({...selected,productCode:catalog.productCode})
        axios.get(`${baseURL}/product/${catalog.productCode}`) // GET /getstockByID/$id
        .then(res => {setproducts(res.data.product)})    
    },[catalog.productCode])

    useEffect(fetch,[catalog])
    useEffect(()=>{
        localStorage.setItem('products',JSON.stringify(products))
    },[products])





    return (
        <div>
            <Table striped>
            <thead>
            <tr>
                <td><h5>Product Code</h5></td>
                <td><h5>Product Name</h5></td>
                <td><h5>Product Line</h5></td>
                <td><h5>Product Scale</h5></td>
                <td><h5>Product Vendor</h5></td>
                <td><h5>Product Description</h5></td>
                <td><h5>Quantity in stock</h5></td>
                <td><h5>Buy price</h5></td>
                <td><h5>MSRP</h5></td>

            </tr>
            </thead>
            <tbody>
            {
                    products.map(c=>{
                        return(
                            <tr key={c.productCode}>
                                <td>{catalog.productCode}</td>
                                <td>{c.productName}</td>
                                <td>{c.productLine}</td>
                                <td>{c.productScale}</td>
                                <td>{c.productVendor}</td>
                                <td>{c.productDescription}</td>
                                <td>{c.quantityInStock}</td>
                                <td>{c.buyPrice}</td>
                                <td>{c.MSRP}</td>
                                <td><Button variant="success" onClick={
                                    ()=>{
                                        setShow(true)
                                        setMethod('Edit')
                                        setSelect({
                                            ...selected,
                                            productCode: c.productCode,
                                            productName: c.productName,
                                            productLine: c.productLine,
                                            productScale: c.productScale,
                                            productVendor: c.productVendor,
                                            productDescription: c.productDescription,
                                            quantityInStock: c.quantityInStock,
                                            buyPrice: c.buyPrice,
                                            MSRP: c.MSRP
                                        })
                                }} >Edit</Button> {' '}
                                <Button variant="danger" onClick={()=>{del(c.productCode)}}>Delete</Button></td>
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
        <ProductPaneContext.Provider value={{products,selected,setShow,setSelect,setproducts}}>
            <Offcanvas show={show} onHide={()=>{
                setShow(false)
                setMethod()
            }} placement='bottom' className='h-auto' >
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>{method} product</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                {method ? method == 'Edit' ? <ProductEditForm />:<ProductAddForm /> : <></>}
                </Offcanvas.Body>
            </Offcanvas>

        </ProductPaneContext.Provider>
        </div>
    )
}