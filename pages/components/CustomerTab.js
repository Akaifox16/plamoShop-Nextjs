import { useState } from "react"
import { Tab, Tabs } from "react-bootstrap"
import AddressPane from "./addressPane"

const baseURL = 'http://127.0.0.1:8000/api'

export default function CustomerTab(props){
    const {customerNumber} = props 
    const [key, setKey] = useState('addresses')
    return (
        <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3">
        <Tab eventKey="addresses" title="Addresses">
        <AddressPane id={customerNumber}/>
        </Tab>
        <Tab eventKey="address" title="Address" disabled>
        </Tab>
        <Tab eventKey="orders" title="Orders" >
        </Tab>
        <Tab eventKey="order" title="Order" disabled>
        </Tab>
        </Tabs> 
    )
}