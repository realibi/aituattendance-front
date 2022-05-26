import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>
          Welcome to <a href="">AITU</a>attendance
        </p>
        <p className={styles.code}>
          An attendance tracking app with facial recognition. AITU Diploma project.
        </p>
        <div style={{width: 300, display: "flex", justifyContent: 'space-around', margin: '0 auto'}}>
          <Link href={'/signIn'}>
            <button className={styles.card}>Sign in</button>
          </Link>
          <Link href={'/signUp'}>
            <button className={styles.card}>Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
