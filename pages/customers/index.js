import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import router from 'next/router'
const baseURL = 'http://127.0.0.1:8000/api'

export default function CustomerList(){
    const [customers,setCustomers] = useState([])
    const fetch = async () =>{
        const response = await axios.get(`${baseURL}/customers`)
        setCustomers(response.data)
    }
    useEffect(fetch,[])
    return (
        <>
        <Link href='/'>home</Link>
        <table>
            <thead>
            <tr>
                <td>CID</td>
                <td>customer name</td>
                <td>contact name</td>
                <td>phone</td>
                <td>credit</td>
                <td></td>
            </tr>
            </thead>

            <tbody>
            {customers.map(customer => {
                return (<>
                <tr key={customer.customerNumber}>
                    <td><p>{customer.customerNumber}</p></td>
                    <td><p>{customer.customerName}</p></td>
                    <td><p>{customer.contactLastName} {customer.contactFirstName}</p></td>
                    <td><p>{customer.phone}</p></td>
                    <td><p>{customer.creditLimit}</p></td>
                    <button onClick={()=>{router.push(`/address/${customer.customerNumber}`)}}>address</button>
                </tr>
                </>)
            })}
            </tbody>
        </table>
        </>
    )
}