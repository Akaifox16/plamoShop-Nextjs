import { useState, useContext} from "react";
import axios from "axios";
import { Form, Row, Button, Col } from "react-bootstrap";
import { AddressContext } from "./addressPane";
const baseURL = "http://127.0.0.1:8000/api/address";

export default function AddressEditForm() {
    const {addresses, selected, setShow, setSelect, setAddresses} = useContext(AddressContext)
    
    const submitHandler = (e) => {
        e.preventDefault();
        // PATCH /edit/{id}
        axios.patch(`${baseURL}/edit/${selected.id}`,selected)
        .then(()=>{
            let address = []
            addresses.forEach(a => {
                if(a.id == selected.id){
                    address = [...address, {
                        id: selected.id,
                        AddressLine1: selected.addressLine1,
                        AddressLine2: selected.addressLine2,
                        AddressNo: selected.addressNo,
                        City: selected.city,
                        State: selected.state,
                        PostalCode: selected.postCode,
                        Country: selected.country
                    }]
                }else{
                    address = [...address,a]
                }
            })
            setAddresses(address)
            setShow(false)
        })
        .catch(err=>{console.error();})         
    }

    return (
    <div>
        <Form>
            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address No.</Form.Label>
                <Form.Control value={selected.addressNo} placeholder="address No." readOnly/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control value={selected.addressLine1} placeholder="1234 Main St" onChange={e=>{
                    setSelect({...selected,addressLine1:e.target.value})
                }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control value={selected.addressLine2} placeholder="Apartment, studio, or floor" onChange={e=>{
                    setSelect({...selected,addressLine2:e.target.value})
                }}/>
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control value={selected.city} onChange={e=>{
                    setSelect({...selected,city:e.target.value})
                }}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control value={selected.state} onChange={e=>{
                    setSelect({...selected,state:e.target.value})
                }}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control value={selected.postCode} onChange={e=>{
                    setSelect({...selected,postCode:e.target.value})
                }}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Country</Form.Label>
                <Form.Control value={selected.country} onChange={e=>{
                    setSelect({...selected,country:e.target.value})
                }}/>
                </Form.Group>
            </Row>

            <Button variant="primary" onClick={submitHandler}>
                Submit
            </Button>
        </Form>
    </div>    
    );
}
