import styles from './style.module.css'
import globals from '../../../utils/globals'
import Link from "next/link";
import {useEffect, useState} from "react";

export default function Header({student}){
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem(globals.LOCALSTORAGE_KEYS.user)));
    }, []);

    return(
        <div className={styles.container}>
            <p className={styles.primary_text}>Hello, {currentUser.fullName}</p>
            <div>
                <Link href={`/${student ? 'student': 'lecturer'}/notifications`}>
                    <button className={styles.button}>
                        Notifications
                    </button>
                </Link>
                {/*<Link href={`/${student ? 'student': 'lecturer'}/profile`}>*/}
                {/*    <button className={styles.button}>*/}
                {/*        Account*/}
                {/*    </button>*/}
                {/*</Link>*/}
                <Link href={`/signIn`}>
                    <button className={styles.button}>
                        Sign out
                    </button>
                </Link>
            </div>
        </div>
    )
}
