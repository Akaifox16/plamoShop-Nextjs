import { useState } from "react";
import StockInList from "./StockInList";

export default function StockPane() {
    const [products, setProduct] = useState([])

    return (
        <div>
            <p>edit file here... </p>
            <StockInList />
        </div>
    )
}