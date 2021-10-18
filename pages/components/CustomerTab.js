import { useEffect, useState} from "react"
import { Tab, Tabs } from "react-bootstrap"
import AddressEditForm from "./AddressEditForm"
import AddressAddForm from "./AddressAddForm"
import AddressPane from "./addressPane"

export default function CustomerTab(props){
    const {customerNumber} = props 
    const [key, setKey] = useState('addresses')
    const [type, setType] = useState('')
    const [id, setId] = useState(0)
    useEffect(()=>{        
        setId(JSON.stringify(localStorage.getItem("selectedAddress")))
    },[type])

    return (
        <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3">
        <Tab eventKey="addresses" title="Addresses">
            <AddressPane id={customerNumber} setKey = {setKey} setType={setType}/>
        </Tab>
        <Tab eventKey="address" title="Address" disabled>
            {type === 'add' ? <AddressAddForm id={id}/> : <AddressEditForm id={id}/>}
        </Tab>
        <Tab eventKey="orders" title="Orders" >
        </Tab>
        <Tab eventKey="order" title="Order" disabled>
        </Tab>
        </Tabs> 
    )
}