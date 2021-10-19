import { useState, useEffect, createContext, useContext} from 'react'
import axios from 'axios'
import { Table, Button, Offcanvas } from 'react-bootstrap'
import AddressEditForm from './AddressEditForm'
import AddressAddForm from './AddressAddForm'
const baseURL = 'http://127.0.0.1:8000/api/address'

import { CustomerContext } from '../CustomersList'
export const AddressContext = createContext()

export default function AddressPane(){
    const {customer} = useContext(CustomerContext)
    const [addresses,setAddresses] = useState([])
    const [selected,setSelect] = useState({
        customerID: customer.customerNumber,
        id: 0,
        addressLine1: "",
        addressLine2: "",
        addressNo: 0,
        city: "",
        state: "",
        postCode: "",
        country: ""})
    const [method,setMethod] = useState()
    const [show, setShow] = useState(false);
    
    useEffect(async ()=>{
        const dat = localStorage.getItem('addresses')
        if(dat){
            setAddresses(JSON.parse(dat))
        }else{
            const res = await axios.get(`${baseURL}/${customer.customerNumber}`) // GET /address/$id
            setAddresses(res.data.addresses)
        }
    },[])

    useEffect(()=>{
        setSelect({...selected,customerID:customer.customerNumber})
        axios.get(`${baseURL}/${customer.customerNumber}`) // GET /address/$id
        .then(res => {setAddresses(res.data.addresses)})    
    },[customer.customerNumber])
    
    useEffect(()=>{
        localStorage.setItem('addresses',JSON.stringify(addresses))
    },[addresses])

    const del = (id)=>{
        axios.delete(`${baseURL}/del/${id}`)
        .then(res => {setAddresses(addresses.filter(address=> address.id != res.data.data.id ))})
    }

    return (<div>
        <Table striped>
            <thead>
            <tr>
                <td>Line1</td>
                <td>Line2</td>
                <td>City</td>
                <td>State</td>
                <td>Zip</td>
                <td>Country</td>
            </tr>
            </thead>
            <tbody>
                {
                    addresses.map(address=>{
                        return(
                            <tr key={address.id}>
                                <td>{address.AddressLine1}</td>
                                <td>{address.AddressLine2}</td>
                                <td>{address.City}</td>
                                <td>{address.State}</td>
                                <td>{address.PostalCode}</td>
                                <td>{address.Country}</td>
                                <td><Button variant="success" onClick={
                                    ()=>{
                                        setShow(true)
                                        setMethod('Edit')
                                        setSelect({
                                            ...selected,
                                            id: address.id,
                                            addressLine1: address.AddressLine1,
                                            addressLine2: address.AddressLine2? address.AddressLine2:"",
                                            addressNo: address.AddressNo,
                                            city: address.City,
                                            state: address.State? address.State:"",
                                            postCode: address.PostalCode? address.PostalCode:"",
                                            country: address.Country
                                        })
                                }} >Edit</Button> {' '}
                                <Button variant="danger" onClick={()=>{del(address.id)}}>Delete</Button></td>
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
        <AddressContext.Provider value={{addresses,selected,setShow,setSelect,setAddresses}}>
            <Offcanvas show={show} onHide={()=>{
                setShow(false)
                setMethod()
            }} placement='end' >
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>{method} address</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {method ? method == 'Edit' ? <AddressEditForm />:<AddressAddForm /> : <></>}
                </Offcanvas.Body>
            </Offcanvas>
        </AddressContext.Provider>
    </div>
    )
}