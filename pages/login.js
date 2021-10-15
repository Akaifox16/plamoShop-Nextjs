import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { Form, FloatingLabel, Card, Button} from "react-bootstrap"

const baseURL = 'http://127.0.0.1:8000/api'

export default function Login(){
    const router = useRouter()
    const [user,setUser] = useState({
        employeeNumber: 0,
        password : ""
    })

    const back = () => router.back()
    const signinClick = async e => {
        e.preventDefault()
        axios.post(`${baseURL}/login`,user)
        .then(res => {
            if(res.status == 200){
                console.log(res.data)
                sessionStorage.setItem("token",JSON.stringify(res.data.data))
            }    
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
    return(<div className="mx-5">
    <Card className="text-center">
        <Card.Body>
            <Card.Title>Sign in / Sign up</Card.Title>
            <div className="mx-5" >
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
            <div className="mx-5">
                <Button variant="success" type= "button" size = "lg" onClick= {signinClick}>Sign in</Button>{' '}
                <Button variant="outline-success" type="button" size = "lg" onClick= {signupClick}>Sign up</Button>
            </div>
        </Card.Body>
    </Card>
    </div>)
}