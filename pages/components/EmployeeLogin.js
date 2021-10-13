import Link from "next/link"
import { useReducer,createContext,useEffect} from "react"

export const LoginContext = createContext({});

export default function EmployeeLogin(){
    const [login,dispatch] = useReducer(reducer, {data:null})
    const reducer = (login , action) =>{
        switch(action.type){
            case "SET":
                return {
                ...login,
                data: action.payload,
                };
        }
    }
    
    function fetch() {
        const data = localStorage.getItem("data");
        if (data) {
                dispatch({
                type: "SET",
                payload: JSON.parse(data),
            })
        }
    }
    useEffect(fetch, [])
    useEffect(() => {
    localStorage.setItem("data", JSON.stringify(login.data));
    }, [login.data])
    
    return (
        <>
            <LoginContext.Provider value={{login,dispatch}}>
            {login.data ? (
                <Link href='/user'><button>{login.data.fistName}</button></Link>
            ):(
                <Link href='/login'><button>Login</button></Link>
            )}
            </LoginContext.Provider>
        </>
    )
}