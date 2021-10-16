import { Button } from "react-bootstrap"

export default function Btn(props){
    return <Button variant={props.variant}>{props.text}</Button>
}