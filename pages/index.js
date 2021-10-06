import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Features(){
  return (<>
    <h1>Feature List</h1>
    <ul>
        <li><Link href='/customers'>Address</Link></li>
    </ul>
    </>
  )
}