import axios from "axios"
import { useContext, useState } from "react"
import { LoginContext } from "./components/EmployeeLogin"
const baseURL = 'http://127.0.0.1:8000/api'

export default function Login(){
    const {dispatch} =useContext(LoginContext)

    const [user,setUser] = useState({
        employeeNumber: 0,
        password : ""
    })
    const signinClick = async e => {
        e.preventDefault()
        axios.post(`${baseURL}/login`,user)
        .then(res => {
            console.log(res)
            //localStorage.setItem("data",JSON.stringify(res.data.data))
            dispatch({
                type: "SET",
                payload: JSON.parse(res.data.data),
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    const signupClick = async e => {
        e.preventDefault()
        axios.post(`${baseURL}/signup`,user)
        .then(res => {
            console.log(res)

        })
        .catch(err => {
            console.log(err)
        })
    }
    return(<>
        <form>
            <input type="text" placeholder="employee number" onChange={
                e => {
                    setUser({
                        ...user,
                        employeeNumber: e.currentTarget.value
                    })
                }
            }/>
            <input type="type" placeholder="password" onChange={
                e => {
                    setUser({
                        ...user,
                        password: e.currentTarget.value
                    })
                }
            }/>
            <button type="button" onClick={signinClick}>Sign in</button>
            <button type="button" onClick={signupClick}>Sign up</button>
        </form>
    </>)
}