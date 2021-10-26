import { useState, useContext, useEffect} from "react";
import axios from "axios";
import { Form, Row, Button, Col } from "react-bootstrap";
import { StockpaneContext } from "./StockPane";
const baseURL = 'http://127.0.0.1:8000/api'

export default function StockAddForm() {
    const {selected, setSelect, setstockins} = useContext(StockpaneContext)
    const [no,setNo] = useState()
    const [submit,setSubmit] = useState(false)

    /*useEffect(()=>{
        axios.get(`${baseURL}/stock/count/${selected.customerID}`)
        .then(res=>{
            setNo(res.data.no)   
            setSubmit(false)
        })
        .catch(err=>{console.error();})
    },[submit])*/

    const submitHandler = (e) => {
        e.preventDefault();
        // POST /create
        axios.post(`${baseURL}/stock/create`,selected)
        .then(()=>{
            axios.get(`${baseURL}/stock/${selected.productCode}`)
            .then(res=>{
                setstockins(res.data.stock)
                setSubmit(true)
            })
            .catch(err=>{console.error();})
        })         
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
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control onChange={e=>{
                        setSelect({...selected,qty:e.target.value})
                    }}/>
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="formGridcreated_at">
                    <Form.Label>Created_at</Form.Label>
                    <Form.Control type='date' value={selected.created_at} onChange={e=>{
                        setSelect({...selected,created_at:e.target.value})
                    }}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridupdated_at">
                    <Form.Label>Updated_at</Form.Label>
                    <Form.Control type='date' value={selected.updated_at} onChange={e=>{
                        setSelect({...selected,updated_at:e.target.value})
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