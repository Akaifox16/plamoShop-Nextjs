import { useState, useEffect} from 'react'
import axios from 'axios'
import { Table, Button, Offcanvas } from 'react-bootstrap'
import AddressEditForm from './AddressEditForm'
import AddressAddForm from './AddressAddForm'
const baseURL = 'http://127.0.0.1:8000/api/address'


export default function AddressPane(props){
    const [addresses,setAddresses] = useState([])
    const [selected,setSelect] = useState(0)
    const [method,setMethod] = useState()
    const [show, setShow] = useState(false);
    const {id} = props
    
    useEffect(async ()=>{
        const dat = localStorage.getItem('addresses')
        if(dat){
            setAddresses(JSON.parse(dat))
        }else{
            const res = await axios.get(`${baseURL}/${id}`) // GET /address/$id
            setAddresses(res.data.addresses)
        }
    },[])
    useEffect(()=>{
        axios.get(`${baseURL}/${id}`) // GET /address/$id
        .then(res => {setAddresses(res.data.addresses)})    
    },[id])
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
                                        setSelect(address.id)
                                        console.log(selected)
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
            }
        }>Add</Button>
        <Offcanvas show={show} onHide={()=>{
            setShow(false)
            setMethod()
            setSelect(0)
        }} placement='end' >
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>{method} address</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {method ? method == 'Edit' ? <AddressEditForm id={selected}/>:<AddressAddForm id={selected}/> : <></>}
            </Offcanvas.Body>
        </Offcanvas>
    </div>
    )
}