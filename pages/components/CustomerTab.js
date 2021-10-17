import { useState } from "react"
import { Tab, Tabs } from "react-bootstrap"
import AddressForm from "./AddressForm"
import AddressPane from "./addressPane"

export default function CustomerTab(props){
    const {customerNumber} = props 
    const [key, setKey] = useState('addresses')
    const [item, setItem] = useState(0)
    const [type, setType] = useState('') 
    return (
        <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3">
        <Tab eventKey="addresses" title="Addresses" onClick={(()=>setItem(0))}>
            <AddressPane id={customerNumber} setKey = {setKey} setItem={setItem} setType={setType}/>
        </Tab>
        <Tab eventKey="address" title="Address" disabled>
        {item > 0 && <AddressForm id={item} type={type}/>}
        </Tab>
        <Tab eventKey="orders" title="Orders" >
        </Tab>
        <Tab eventKey="order" title="Order" disabled>
        </Tab>
        </Tabs> 
    )
}