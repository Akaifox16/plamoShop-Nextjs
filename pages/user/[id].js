import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
const baseURL = 'http://127.0.0.1:8000/api'

export default function Address(){

    return (
        <>
            <tr><Link href= "">info</Link></tr>
            <tr><Link href="">customers</Link></tr>
            <tr><Link href=""></Link></tr>
        </>
    )
}