import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
const baseURL = 'http://127.0.0.1:8000/api'

export default function Address(){

    return (
        <>
            <tr><Link href="">customers</Link></tr>
            <tr><Link href="">stock</Link></tr> {/*for sales employee */}
            <tr><Link href="">orders</Link></tr> {/*for sales employee */}
            <tr><Link href="">paymentation</Link></tr> {/*for sales employee*/}
            <tr><Link href="">employee management</Link></tr> {/*for VP sales only*/}
        </>
    )
}