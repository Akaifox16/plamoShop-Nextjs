import styles from '../styles/Home.module.css'
import Link from 'next/link'
import EmployeeLogin from './components/EmployeeLogin'
import { useEffect, useState } from 'react'

export default function App(){
  const [catalogs,setCatalogs] = useState([])
  const fetch = async () =>{

  }
  useEffect(fetch,[])
  
  return ( <>
    <table>
    <thead>
      <td><h1>Catalog</h1></td>
      <td></td>
      <td><EmployeeLogin /></td>  
    </thead>
    </table>
    <table>
        <tbody>
          {catalogs.map(catalog => {
            return (<>
              show catalogs here
            </>)
          })
          }
        </tbody>
    </table>
  </>)
}