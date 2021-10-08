import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
const baseURL = "http://127.0.0.1:8000/api";

export default function AddAddress() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({
    customerID: id,
    addressLine1: "",
    addressLine2: "",
    addressNo: 0,
    city: "",
    state: "",
    postCode: "",
    country: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${baseURL}/add-address`);
  };
  const fetch = async () => {
    const response = await axios.get(`${baseURL}/add-address/${id}`);
    setData({ ...data, addressNo: response.data.no });
  };
  useEffect(fetch,[])

  return (
    <>
      <form action={submitHandler}>
        <table>
          <tr>
            <td>
              <input type="text" readonly="true" value={data.addressNo} />
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" placeholder="address line 1" onchange ={
                  e => {setData({...data,
                        addressLine1: e.currentTarget.value})}}/>
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" placeholder="address line 2" onchange={
                  e =>{setData({...data,
                        addressLine2: e.currentTarget.value})}}/>
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" placeholder="city ex. NYC, Paris" onChange={
                  e => {setData({...data,
                        city: e.currentTarget.value})}}/>
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" placeholder="state ex. NY, CA, PA" onChange={
                  e => {setData({...data,
                        state: e.currentTarget.value})}}/>
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" placeholder="postal Code , zip code" onChange={
                  e => {setData({...data,
                        postCode: e.currentTarget.value})}}/>
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" placeholder="country ex. USA, France, Norway" onChange={
                e => {setData({...data,
                      country: e.currentTarget.value})}}/>
            </td>
          </tr>
          <tr>
            <td>
              <input type="submit" value="Add address" />
            </td>
            <td>
              <Link href={`address/${data.customerID}`}>Back</Link>
            </td>
          </tr>
        </table>
      </form>
    </>
  );
}
