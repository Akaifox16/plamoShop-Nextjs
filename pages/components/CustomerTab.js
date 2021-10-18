import { useState} from "react"
import { Tab, Tabs } from "react-bootstrap"
import AddressPane from "./addressPane"

export default function CustomerTab(props){
    const [key, setKey] = useState('addresses')

    return (
        <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3">
        <Tab eventKey="addresses" title="Addresses" >
            <AddressPane id={props.customerNumber}/>
        </Tab>
        <Tab eventKey="orders" title="Orders" >
        </Tab>
        <Tab eventKey="order" title="Order" disabled>
        </Tab>
        </Tabs> 
    )
}