import { useState, useEffect, createContext, useContext} from 'react'
import axios from 'axios'
import { Table, Button, Offcanvas } from 'react-bootstrap'
import { StockinContext } from './StockInList'

export default function StockPane() {
    const [products, setProduct] = useState([])
    //const {catalog} = useContext(StockinContext)

    return (
        <div>
            <p>????????????????? </p>
        </div>
    )
}