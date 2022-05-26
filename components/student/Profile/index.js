import styles from './style.module.css'
import {useState} from "react";
export default function Profile(){
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [id, setId] = useState('');

    return(
        <div className={styles.container}>
            <div className={styles.info_block}>
                <div style={{textAlign: 'right', paddingRight: 20}}>
                    <span className={styles.info_title}>Email:</span>
                </div>
                <input
                    className={styles.info_input}
                    value={email}
                    type="text"
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className={styles.info_block}>
                <div style={{textAlign: 'right', paddingRight: 20}}>
                    <span className={styles.info_title}>Role:</span>
                </div>
                <input
                    className={styles.info_input}
                    value={role}
                    type="text"
                    onChange={e => setRole(e.target.value)}
                />
            </div>
            <div className={styles.info_block}>
                <div style={{textAlign: 'right', paddingRight: 20}}>
                    <span className={styles.info_title}>First name:</span>
                </div>
                <input
                    className={styles.info_input}
                    value={firstName}
                    type="text"
                    onChange={e => setFirstName(e.target.value)}
                />
            </div>
            <div className={styles.info_block}>
                <div style={{textAlign: 'right', paddingRight: 20}}>
                    <span className={styles.info_title}>Last name:</span>
                </div>
                <input
                    className={styles.info_input}
                    value={lastName}
                    type="text"
                    onChange={e => setLastName(e.target.value)}
                />
            </div>
            <div className={styles.info_block}>
                <div style={{textAlign: 'right', paddingRight: 20}}>
                    <span className={styles.info_title}>ID:</span>
                </div>
                <input
                    className={styles.info_input}
                    value={id}
                    type="text"
                    onChange={e => setId(e.target.value)}
                />
            </div>
            <div style={{padding: 30, textAlign: 'center'}}>
                <button className={styles.save_btn}>Save changes</button>
            </div>
        </div>
    );
}
