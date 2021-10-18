import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ItemContext } from "./CustomerTab";
import { Form, Row, Button, Col } from "react-bootstrap";
const baseURL = "http://127.0.0.1:8000/api/address";

export default function AddressForm() {
    const { id, type } = useContext(ItemContext)
    const [submit,setSubmit] = useState(false)
    const [data, setData] = useState({
        id: id,
        addressLine1: "",
        addressLine2: "",
        addressNo: 0,
        city: "",
        state: "",
        postCode: "",
        country: ""
    })
    
    const submitHandler = async (e) => {
        e.preventDefault();
        axios.post(`${baseURL}/create`,data) // POST /add-address
        .then(res => {
            console.log(res)
            setData({...data,
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            postCode: "",
            country: ""
            })
            setSubmit(true)})
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(()=>{
        axios.get(`${baseURL}/count/${id}`)
        .then(response => {
            setData({ ...data, addressNo: response.data.no });
            setSubmit(false)
        })
        .catch(console.error())
    }, [submit])
    useEffect(async ()=>{
        if(type == "edit"){
            axios.get(`${baseURL}/edit/${id}`)
            .then(response => {
                setData({
                    ...data,
                    addressLine1: response.data.addressLine1,
                    addressLine2: response.data.addressLine2,
                    addressNo: response.data.addressNo,
                    city: response.data.city,
                    state: response.data.state,
                    postCode: response.data.postalCcode,
                    country: response.data.country
                })
            })
            .catch(err => console.log(err))
        }else if(type == "add"){
            axios.get(`${baseURL}/count/${id}`)
            .then(res =>{
                setData({...data, addressNo:res.data})
                console.log(res.data)
            })
            .catch(console.error())
        }
    },[])

    return (
    <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address No.</Form.Label>
            <Form.Control value={data.addressNo} placeholder="address No." readOnly/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control value={data.addressLine1} placeholder="1234 Main St" onChange={e=>{
                setData({...data,addressLine1:e.target.value})
            }}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control value={data.addressLine2} placeholder="Apartment, studio, or floor" onChange={e=>{
                setData({...data,addressLine2:e.target.value})
            }}/>
        </Form.Group>

        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control vlue={data.city} onChange={e=>{
                setData({...data,city:e.target.value})
            }}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control value={data.state} onChange={e=>{
                setData({...data,state:e.target.value})
            }}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control value={data.postCode} onChange={e=>{
                setData({...data,postCode:e.target.value})
            }}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Country</Form.Label>
            <Form.Control value={data.country} onChange={e=>{
                setData({...data,country:e.target.value})
            }}/>
            </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
    );
}
