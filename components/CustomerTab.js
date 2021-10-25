import { useState} from "react"
import { Tab, Tabs } from "react-bootstrap"
import AddressPane from "./address/AddressPane"
import OrderPane from "./order/OrderPane"

export default function CustomerTab(){
    const [key, setKey] = useState('addresses')

    return (
        <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3">
        <Tab eventKey="addresses" title="Addresses" >
            <AddressPane />
        </Tab>
        <Tab eventKey="orders" title="Orders" >
            <OrderPane />
        </Tab>
        </Tabs> 
    )
}