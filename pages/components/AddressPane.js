import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
const baseURL = 'http://127.0.0.1:8000/api/address'

export default function AddressPane(props){
    const [addresses,setAddresses] = useState([])
    const {id} = props
    const fetch = async ()=>{
        const dat = localStorage.getItem('addresses')
        if(dat){
            setAddresses(JSON.parse(dat))
        }else{
            const res = await axios.get(`${baseURL}/${id}`) // GET /address/$id
            setAddresses(res.data.addresses)
            console.log(res.data.addresses)
        }
    }
    useEffect(fetch,[])
    useEffect(()=>{
        localStorage.setItem('addresses',JSON.stringify(addresses))
    },[addresses])

    return (
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
                <td></td>
            </tr>
            </thead>
            <tbody>
                {
                    addresses.map(address=>{
                        return(
                            <tr>
                                <td>{address.addressNo}</td>
                                <td>{address.addressLine1}</td>
                                <td>{address.addressLine2}</td>
                                <td>{address.city}</td>
                                <td>{address.state}</td>
                                <td>{address.postalCode}</td>
                                <td>{address.country}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}