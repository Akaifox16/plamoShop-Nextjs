import { useState, useContext, useEffect} from "react";
import axios from "axios";
import { Form, Row, Button, Col,FloatingLabel } from "react-bootstrap";
import { ProductPaneContext } from "./ProductPane";

const baseURL = 'http://127.0.0.1:8000/api'

export default function ProductEditForm() {
    const {products, selected, setShow, setSelect, setproducts} = useContext(ProductPaneContext)

    const submitHandler = (e) => {
        e.preventDefault();
        
        axios.patch(`${baseURL}/product/update/${selected.productCode}`,selected)
        .then(()=>{
            let product = []
            products.forEach(a => {
                if(a.id == selected.id){
                    product = [...product, {
                        productCode: selected.productCode,
                        productName:selected.productName,
                        productLine:selected.productLine,
                        productScale:selected.productScale,
                        productVendor:selected.productVendor,
                        productDescription:selected.productDescription,
                        quantityInStock:selected.quantityInStock,
                        buyPrice:selected.buyPrice,
                        MSRP:selected.MSRP
                    }]
                }else{
                    product = [...product,a]
                }
            })
            setproducts(product)
            setShow(false)
        })
        .catch(err=>{console.error();})         
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formGridproductCode">
                <Form.Label>Product Code</Form.Label>
                <Form.Control value={selected.productCode} placeholder="S123_1234" onChange={e=>{
                    setSelect({...selected,productCode:e.target.value})
                }}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridproductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control value={selected.productName} placeholder="แท่งหรรษามีแสง" onChange={e=>{
                    setSelect({...selected,productName:e.target.value})
                }}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridproductLine">
                <Form.Label>Product Line</Form.Label>
                <Form.Control value={selected.productLine} placeholder="Motorbike" onChange={e=>{
                    setSelect({...selected,productLine:e.target.value})
                }}/>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridProductScale">
                    <Form.Label>Product Scale</Form.Label>
                    <Form.Control value={selected.productScale} onChange={e=>{
                        setSelect({...selected,productScale:e.target.value})
                    }}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridProductVendor">
                    <Form.Label>Product Vendor</Form.Label>
                    <Form.Control value={selected.productVendor} onChange={e=>{
                        setSelect({...selected,productVendor:e.target.value})
                    }}/>
                    </Form.Group>
                    
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridquantityInStock">
                    <Form.Label>Quantity In Stock</Form.Label>
                    <Form.Control value={selected.quantityInStock} onChange={e=>{
                        setSelect({...selected,quantityInStock:e.target.value})
                    }}/>
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formGridbuyPrice">
                    <Form.Label>Buy Price</Form.Label>
                    <Form.Control value={selected.buyPrice} onChange={e=>{
                        setSelect({...selected,buyPrice:e.target.value})
                    }}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMSRP">
                    <Form.Label>MSRP</Form.Label>
                    <Form.Control value={selected.MSRP} onChange={e=>{
                        setSelect({...selected,MSRP:e.target.value})
                    }}/>
                    </Form.Group>
                </Row>
                <Form.Group as={Col} controlId="formGridProductDescription">
                <Form.Label>Product Description</Form.Label>
                <Form.Control value={selected.productDescription} as="textarea" style={{ height: '100px' }}onChange={e=>{
                        setSelect({...selected,productDescription:e.target.value})
                }}/>
                </Form.Group>
                
                <Button variant="primary" onClick={submitHandler}>
                Submit
            </Button>
            </Form>
        </div>    
        );





}