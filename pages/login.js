import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { Form, FloatingLabel, Card, Button, Alert} from "react-bootstrap"

const baseURL = 'http://127.0.0.1:8000/api'

export default function Login(){
    const router = useRouter()
    const [user,setUser] = useState({
        employeeNumber: 0,
        password : ""
    })
    const [success,setSuccess]= useState({success: false, show: false})

    const signinClick = async e => {
        e.preventDefault()
        axios.post(`${baseURL}/login`,user)
        .then(res => {
            if(res.status == 200){
                console.log(res.data)
                sessionStorage.setItem("token",JSON.stringify(res.data.data))
            }
            router.back()    
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
            setSuccess({...success,show:true, success:res.data.success})
        })
        .catch(err => {
            console.log(err)
            setSuccess({...success, show:true, success:false})
        })
    }
    return(<div className="m-5">
    {
        success.show && success.success &&<Alert  variant="success">
        you have succcess register
        </Alert>
    }
    {
        success.show && !success.success && <Alert  variant="danger">
        can't register this account
        </Alert>
    }
    <Card className="text-center">
        <Card.Body>
            <Card.Title><h1>Sign in / Sign up</h1></Card.Title>
            <div className="mx-md-5" >
                <Form>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Employee No."
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="Employee No." onChange={
                            e =>{
                                setUser({...user,employeeNumber: e.target.value})
                            }
                        }/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password" onChange={
                            e =>{
                                setUser({...user,password: e.target.value})
                            }
                        }/>
                    </FloatingLabel>
                </Form>
            </div>
            <div className="m-3">
                <Button variant="success" type= "button" size = "lg" onClick= {signinClick}>Sign in</Button>{' '}
                <Button variant="outline-success" type="button" size = "lg" onClick= {signupClick}>Sign up</Button>
            </div>
        </Card.Body>
    </Card>
    </div>)
}