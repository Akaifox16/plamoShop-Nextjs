import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
const baseURL = 'http://127.0.0.1:8000/api'

export default function Address(){

    return (
        <>
            <h1></h1>
            <div><Link href="">customers</Link></div>
            <div><Link href="">stock</Link></div> {/*for sales employee */}
            <div><Link href="">orders</Link></div> {/*for sales employee */}
            <div><Link href="">paymentation</Link></div> {/*for sales employee*/}
            <div><Link href="">employee management</Link></div> {/*for VP sales only*/}
            <div><Link href="">logout</Link></div>
        </>
    )
}