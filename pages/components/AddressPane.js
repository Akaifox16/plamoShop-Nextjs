import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap'
import { ItemContext } from './CustomerTab'
const baseURL = 'http://127.0.0.1:8000/api/address'


export default function AddressPane(props){
    const [addresses,setAddresses] = useState([])
    const {id, setKey, setType} = props
    const {setItem} = useContext(ItemContext)
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
                                        setKey('address')
                                        setItem(address.id)
                                        setType('edit')
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
                setKey('address')
                setType('add')
                setItem(0)
            }
        }>Add</Button>
    </div>
    )
}