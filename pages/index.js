import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Features(){
  return (<>
    <h1>Feature List</h1>
    <ul>
        <li><a href="/customer-list">Address</a></li>
    </ul>
    </>
  )
}