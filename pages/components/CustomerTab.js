import { useState, createContext } from "react"
import { Tab, Tabs } from "react-bootstrap"
import AddressForm from "./AddressForm"
import AddressPane from "./addressPane"

export const ItemContext = createContext()

export default function CustomerTab(props){
    const {customerNumber} = props 
    const [key, setKey] = useState('addresses')
    const [item, setItem] = useState(-1)
    const [type, setType] = useState('')

    return (
        <ItemContext.Provider value={item, setItem, type}>
            <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3">
            <Tab eventKey="addresses" title="Addresses" onClick={(()=>setItem(-1))}>
                <AddressPane id={customerNumber} setKey = {setKey} setType={setType}/>
            </Tab>
            <Tab eventKey="address" title="Address" disabled>
                <AddressForm />
            </Tab>
            <Tab eventKey="orders" title="Orders" >
            </Tab>
            <Tab eventKey="order" title="Order" disabled>
            </Tab>
            </Tabs> 
        </ItemContext.Provider>
    )
}