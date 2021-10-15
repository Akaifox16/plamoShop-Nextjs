import Link from "next/link"
import {useEffect, useState} from "react"
import {Button} from 'react-bootstrap'

function EmployeeLogin(){
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
        return <div className="md-2" ><Link href='/login'><Button variant="primary">Login</Button></Link></div>
    }

    return (
        <div className ="md-2"><Link href= {`/user/${token.employeeNumber}`} ><Button variant="primary">Welcome {token.firstName}</Button></Link></div>
    )
}

export default EmployeeLogin