import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
const baseURL = 'http://127.0.0.1:8000/api'

export default function address(){
    const router = useRouter()
    const [addresses,setAddresses] = useState([])
    const [customer, setCustomer] = useState([])
    const {id} = router.query
    const fetch = async ()=>{
            const res = await axios.get(`${baseURL}/customer-address/${id}`)
            setAddresses(res.data.addresses)
            setCustomer(res.data.customer)
    }
    useEffect(fetch,[])

    function Selected(props){
        return <input type="radio" name="addrNo" value= {props.addressNo} checked="checked"/>
    }
    function NonSelect(props){
        return <input type="radio" name="addrNo" value= {props.addressNo}/>
    }
    function ConditionSelectBox(props){
        if(props.selected == 1){
            return <Selected addressNo = {props.addressNo}/>
        }
        return <NonSelect addressNo = {props.addressNo}/>
    }

    return (
        <>
        <h1>{customer.customerName}</h1>
        <table>
            <thead>
            <tr>
                <td>selected</td>
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
                    <td>
                        <ConditionSelectBox selected = {address.selected} addressNo = {address.AddressNo}/>
                    </td>
                    <td> <p>{address.AddressNo}</p> </td>
                    <td>
                        <p>{address.AddressLine1}</p>
                        <p>{address.AddressLine2}</p>
                    </td>
                    <td> <p>{address.City}</p> </td>
                    <td> <p>{address.State}</p> </td>
                    <td> <p>{address.PostalCode}</p> </td>
                    <td> <p>{address.Country}</p> </td>
                    <td> <Link href = {`/edit-addrss/${address.CustomerID}/${address.AddressNumber}`} >edit</Link> </td>
                    <td>
                    </td>
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
            <td> <Link href= {`/add-address/${customer.customerNumber}`} >add new</Link> </td>
            <td><Link href="/customers">Back</Link></td>
        </tr>
        </tfoot>
        </table>
        </>
    )
}