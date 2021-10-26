import { useState, useContext, useEffect} from "react";
import axios from "axios";
import { Form, Row, Button, Col } from "react-bootstrap";
import { AddressContext } from "./AddressPane";
const addressURL = "http://127.0.0.1:8000/api/address";

export default function AddressAddForm() {
    const {selected, setSelect, setAddresses} = useContext(AddressContext)
    const [no,setNo] = useState()
    const [submit,setSubmit] = useState(false)
    
    useEffect(()=>{
        axios.get(`${addressURL}/count/${selected.customerID}`)
        .then(res=>{
            setNo(res.data.no)
            setSubmit(false)
        })
        .catch(err=>{console.error();})
    },[submit])

    const submitHandler = (e) => {
        e.preventDefault();
        // POST /create
        axios.post(`${addressURL}/create`,{...selected,addressNo:no})
        .then(()=>{
            axios.get(`${addressURL}/${selected.customerID}`)
            .then(res=>{
                setAddresses(res.data.addresses)
                setSubmit(true)
            })
            .catch(err=>{console.error();})
        })         
    }

    return (
    <div>
        <Form>
            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address No.</Form.Label>
                <Form.Control value={no} placeholder="address No." readOnly/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" onChange={e=>{
                    setSelect({...selected,addressLine1:e.target.value})
                }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" onChange={e=>{
                    setSelect({...selected,addressLine2:e.target.value})
                }}/>
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control onChange={e=>{
                    setSelect({...selected,city:e.target.value})
                }}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control onChange={e=>{
                    setSelect({...selected,state:e.target.value})
                }}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control onChange={e=>{
                    setSelect({...selected,postCode:e.target.value})
                }}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Country</Form.Label>
                <Form.Control onChange={e=>{
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
