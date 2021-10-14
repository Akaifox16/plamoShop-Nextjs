import Link from "next/link"
import {useEffect, useState} from "react"


function EmployeeLogin(){
    const [token,setToken] = useState(null)
    function fetch() {
        const login = sessionStorage.getItem("token")
        if(login){
            const dat = JSON.parse(login)
            //console.log(dat)
            setToken(dat)
        }
    }
    useEffect(fetch,[])
    
    if(!token){
        return <Link href='/login'><button>Login</button></Link>
    }

    return (
        <>
        <Link href= {`/user/${token.employeeNumber}`} ><button>Welcome {token.firstName}</button></Link>
        </>
    )
}

export default EmployeeLogin