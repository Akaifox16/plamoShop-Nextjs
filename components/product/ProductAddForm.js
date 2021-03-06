import { useState, useContext, useEffect} from "react";
import axios from "axios";
import { Form, Row, Button, Col,FloatingLabel } from "react-bootstrap";
import { ProductPaneContext } from "./ProductPane";

const baseURL = 'http://127.0.0.1:8000/api'

export default function ProductAddForm() {
    const {catalogs, selected, setSelect, setcatalogs} = useContext(ProductPaneContext)
    // const [no,setNo] = useState()
    // const [submit,setSubmit] = useState(false)


    const submitHandler = (e) => {
        e.preventDefault();
        console.log(selected)
        // POST /create
        axios.post(`${baseURL}/product/create`,selected)
        .then(()=>{
            axios.get(`${baseURL}/stock/${selected.productCode}`)
            .then(res=>{
                setcatalogs([...catalogs,res.data.product[0]])
                // setSubmit(true)
            })
            .catch(err=>{console.error();})
        })
        .catch(err=>{console.error()})         
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formGridproductCode">
                <Form.Label>Product Code</Form.Label>
                <Form.Control placeholder="S123_1234" onChange={e=>{
                    setSelect({...selected,productCode:e.target.value})
                }}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridproductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control placeholder="Mitsubishi Zero" onChange={e=>{
                    setSelect({...selected,productName:e.target.value})
                }}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridproductLine">
                <Form.Label>Product Line</Form.Label>
                <Form.Control placeholder="Torpedo" onChange={e=>{
                    setSelect({...selected,productLine:e.target.value})
                }}/>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridProductScale">
                    <Form.Label>Product Scale</Form.Label>
                    <Form.Control onChange={e=>{
                        setSelect({...selected,productScale:e.target.value})
                    }}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridProductVendor">
                    <Form.Label>Product Vendor</Form.Label>
                    <Form.Control onChange={e=>{
                        setSelect({...selected,productVendor:e.target.value})
                    }}/>
                    </Form.Group>

                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridquantityInStock">
                    <Form.Label>Quantity In Stock</Form.Label>
                    <Form.Control onChange={e=>{
                        setSelect({...selected,quantityInStock:e.target.value})
                    }}/>
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formGridbuyPrice">
                    <Form.Label>Buy Price</Form.Label>
                    <Form.Control onChange={e=>{
                        setSelect({...selected,buyPrice:e.target.value})
                    }}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMSRP">
                    <Form.Label>MSRP</Form.Label>
                    <Form.Control onChange={e=>{
                        setSelect({...selected,MSRP:e.target.value})
                    }}/>
                    </Form.Group>
                </Row>
                <Form.Group as={Col} controlId="formGridProductDescription">
                <Form.Label>Product Description</Form.Label>
                <Form.Control as="textarea" style={{ height: '100px' }}onChange={e=>{
                        setSelect({...selected,productDescription:e.target.value})
                }}/>
                </Form.Group>
                
                <Button className="mt-1" variant="primary" onClick={submitHandler}>
                Submit
            </Button>
            </Form>
        </div>    
        );
}