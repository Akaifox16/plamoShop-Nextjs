import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap'
const baseURL = 'http://127.0.0.1:8000/api/address'

export default function AddressPane(props){
    const [addresses,setAddresses] = useState([])
    const {id} = props
    useEffect(async ()=>{
        const dat = localStorage.getItem('addresses')
        if(dat){
            setAddresses(JSON.parse(dat))
        }else{
            const res = await axios.get(`${baseURL}/${id}`) // GET /address/$id
            setAddresses(res.data.addresses)
            console.log(res.data.addresses)
        }
    },[])
    useEffect(async ()=>{
        const res = await axios.get(`${baseURL}/${id}`) // GET /address/$id
            setAddresses(res.data.addresses)
            console.log(res.data.addresses)
    },[id])
    useEffect(()=>{
        localStorage.setItem('addresses',JSON.stringify(addresses))
    },[addresses])

    const del = ()=>{
        
    }

    return (<div>
        <Table striped>
            <thead>
            <tr>
                <td>No.</td>
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
                            <tr>
                                <td>{address.AddressNo}</td>
                                <td>{address.AddressLine1}</td>
                                <td>{address.AddressLine2}</td>
                                <td>{address.City}</td>
                                <td>{address.State}</td>
                                <td>{address.PostalCode}</td>
                                <td>{address.Country}</td>
                                <td><Button variant="danger" onClick={del}>Delete</Button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        
    </div>
    )
}