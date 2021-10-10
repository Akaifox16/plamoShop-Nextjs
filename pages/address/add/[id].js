import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
const baseURL = "http://127.0.0.1:8000/api";

export default function AddAddress() {
    const router = useRouter();
    const { id } = router.query;
    const [submit,setSubmit] = useState(false)
    const [data, setData] = useState({
        customerID: id,
        addressLine1: "",
        addressLine2: "",
        addressNo: 0,
        city: "",
        state: "",
        postCode: "",
        country: ""
    });
    const submitHandler = async (e) => {
        e.preventDefault();
        axios.post(`${baseURL}/create/address`,data) // POST /add-address
        .then(res => {
            console.log(res)
            setData({...data,
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            postCode: "",
            country: ""
            })
            setSubmit(true)})
        .catch(err => {
            console.log(err)
        })
    };
    const fetch = async () => {
        const response = await axios.get(`${baseURL}/count/${id}`); // GET /count-address/$id
        setData({ ...data, addressNo: response.data.no });
        setSubmit(false)
    };
    useEffect(fetch, [submit])

    return (
        <>
            <form onSubmit={submitHandler}>
                <table>
                    <tr>
                        <td>
                            <input type="text" readOnly={true} value={data.addressNo} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" placeholder="address line 1" value={data.addressLine1} onChange={
                                e => {
                                    setData({
                                        ...data,
                                        addressLine1: e.currentTarget.value
                                    })
                                }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" placeholder="address line 2" value={data.addressLine2} onChange={
                                e => {
                                    setData({
                                        ...data,
                                        addressLine2: e.currentTarget.value
                                    })
                                }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" placeholder="city ex. NYC, Paris" value={data.city} onChange={
                                e => {
                                    setData({
                                        ...data,
                                        city: e.currentTarget.value
                                    })
                                }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" placeholder="state ex. NY, CA, PA" value={data.state} onChange={
                                e => {
                                    setData({
                                        ...data,
                                        state: e.currentTarget.value
                                    })
                                }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" placeholder="postal Code , zip code" value={data.postCode} onChange={
                                e => {
                                    setData({
                                        ...data,
                                        postCode: e.currentTarget.value
                                    })
                                }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" placeholder="country ex. USA, France, Norway" value={data.country} onChange={
                                e => {
                                    setData({
                                        ...data,
                                        country: e.currentTarget.value
                                    })
                                }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="submit" value="Add address" />
                        </td>
                        <td>
                        <button type="button" onClick={() => router.back()}>back</button>
                        </td>
                    </tr>
                </table>
            </form>
        </>
    );
}
