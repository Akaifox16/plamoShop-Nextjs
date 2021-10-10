import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ConditionSelectBox from '../components/conditionSelectBox'
const baseURL = 'http://127.0.0.1:8000/api'

export default function Address(){
    const router = useRouter()
    const [addresses,setAddresses] = useState([])
    const [customer, setCustomer] = useState([])
    const {id} = router.query
    const fetch = async ()=>{
            const res = await axios.get(`${baseURL}/address/${id}`) // GET /customer-address/$id
            setAddresses(res.data.addresses)
            setCustomer(res.data.customer)
    }
    useEffect(fetch,[])
    const del = (id) => {
        axios.delete(`${baseURL}/del/address/${customer.customerNumber}/${id}`)
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
                    <td> <p>{address.AddressNo}</p> </td>
                    <td>
                        <p>{address.AddressLine1}</p>
                        <p>{address.AddressLine2}</p>
                    </td>
                    <td> <p>{address.City}</p> </td>
                    <td> <p>{address.State}</p> </td>
                    <td> <p>{address.PostalCode}</p> </td>
                    <td> <p>{address.Country}</p> </td>
                    <td> <Link href = {`/addrss/edit/${customer.customerNumber}/${address.AddressNumber}`} >edit</Link> </td>
                    <td> <button onClick ={async e => {
                                e.preventDefault()
                                del(address.AddressNumber)
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