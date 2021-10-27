import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

export default function EmployeeLogin(){
    const [token,setToken] = useState(null)
    function fetch() {
        const login = sessionStorage.getItem("token")
        if(login){
            const dat = JSON.parse(login)
            setToken(dat)
        }
    }
    useEffect(fetch,[])
    
    if(!token){
        return <div className="m-3" ><Link href='/login'><Button variant="primary" size="lg" >Login</Button></Link></div>
    }

    return (
        <div className ="m-3"><Link href= {`/user/${token.employeeNumber}`} ><Button variant="primary" size="lg" >Welcome {token.firstName}</Button></Link></div>
    )
}