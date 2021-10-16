import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
const baseURL = 'http://127.0.0.1:8000/api/address'

export default function AddressPane(){
    const router = useRouter()
    const [addresses,setAddresses] = useState([])
    const [customer, setCustomer] = useState([])
    const {id} = router.query
    const fetch = async ()=>{
            const res = await axios.get(`${baseURL}/${id}`) // GET /customer-address/$id
            setAddresses(res.data.addresses)
            setCustomer(res.data.customer)
    }
    useEffect(fetch,[])
    const del = (id) => {
        axios.delete(`${baseURL}/del${id}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <>
        <h1>{customer.customerName}</h1>
        <table>
            <thead>
            <tr>
                <td>No.</td>
                <td>address</td>
                <td>city</td>
                <td>state</td>
                <td>postal code</td>
                <td>country</td>
            </tr>
            </thead>
            <tbody>
        {addresses.map(address =>{
            return (
                <tr>
                    <td> <p>{address.addressNo}</p> </td>
                    <td>
                        <p>{address.addressLine1}</p>
                        <p>{address.addressLine2}</p>
                    </td>
                    <td> <p>{address.city}</p> </td>
                    <td> <p>{address.state}</p> </td>
                    <td> <p>{address.postalCode}</p> </td>
                    <td> <p>{address.country}</p> </td>
                    <td> <Link href = {`/edit/${address.id}`} >edit</Link> </td>
                    <td> <button onClick ={async e => {
                                e.preventDefault()
                                del(address.id)
                            }} >del</button></td>
                </tr>    
            )
        })}
            </tbody>
        <tfoot>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td> <Link href= {`/address/add/${customer.customerNumber}`} >add new</Link> </td>
            <td><button type="button" onClick={() => router.back()}>back</button></td>
        </tr>
        </tfoot>
        </table>
        </>
    )
}