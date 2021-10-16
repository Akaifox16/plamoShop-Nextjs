import { useRouter} from "next/router"
import { Button } from "react-bootstrap"

export default function Logout(){
    const router = useRouter()
    const logout = ()=>{
        sessionStorage.removeItem("token")
        localStorage.clear()
        router.push(`/`)
    }

    return(
        <Button variant="danger" size="lg" onClick={logout}>Logout</Button>
    )
}