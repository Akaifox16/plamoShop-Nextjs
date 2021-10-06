import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
const baseURL = 'http://127.0.0.1:8000/api'

export default function customerList(){
    const [customers,setCustomers] = useState([])
    const fetch = async () =>{
        const response = await axios.get(`${baseURL}/customer-list`)
        setCustomers(response.data)
        console.log(response.data)
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
            </tr>
            </thead>

            <tbody>
            {customers.map(customer => {
                return <tr>
                    <td>{customer.customerNumber}</td>
                    <td>{customer.customerName}</td>
                    <td>{customer.contactLastName} {customer.contactFirstName}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.creditLimit}</td>
                    <Link key={customer.customerNumber} href= {`/post/${customer.customerNumber}`}>address</Link>
                </tr>
            })}
            </tbody>
        </table>
        </>
    )
}