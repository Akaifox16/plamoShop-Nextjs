import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Form, Row, Button, Col } from "react-bootstrap";
const baseURL = "http://127.0.0.1:8000/api/address";

export default function AddressForm(props) {
    const router = useRouter();
    const { id, type } = props
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
    });
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
    };
    const fetch = async () => {
        const response = await axios.get(`${baseURL}/count/${id}`); // GET /count-address/$id
        setData({ ...data, addressNo: response.data.no });
        setSubmit(false)
    };
    useEffect(fetch, [submit])
    useEffect(async ()=>{
        if(type == "edit"){
            const response = await axios.get(`${baseURL}/edit/${id}`)
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
        }
    },[])

    return (
    <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address No.</Form.Label>
            <Form.Control value={data.addressNo} placeholder="address No." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control value={data.addressLine1} placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control value={data.addressLine2} placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control vlue={data.city}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control value={data.state}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control value={data.postCode}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Country</Form.Label>
            <Form.Control value={data.country} />
            </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
    );
}
