import styles from './style.module.css'
import httpQueries from '../../utils/httpQueries'
import globals from '../../utils/globals'
import {useState} from "react";
import router from 'next/router'

export default function SignUp(){
    const [fullName, setFullName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [groupName, setGroupName] = useState('');
    const [lecturerLoggingIn, setLecturerLoggingIn] = useState(true);

    const onSubmitButtonPressed = () => {
        httpQueries.post(globals.BACKEND_URL + `${lecturerLoggingIn ? '/lecturers' : '/students'}/`, {
            fullName,
            login,
            password,
            groupName
        }).then(result => {
            localStorage.setItem(globals.LOCALSTORAGE_KEYS.user, JSON.stringify(result.data));
            localStorage.setItem(globals.LOCALSTORAGE_KEYS.role, lecturerLoggingIn ? globals.ROLES.lecturer : globals.ROLES.student);
            router.push(`/${lecturerLoggingIn ? 'lecturer' : 'student' }/courses`);
        }).catch(() => {
            alert('Something went wrong');
        })
    }

    return(
        <div className={styles.container}>
            <p className={styles.title}>Sign in</p>

            <div className={styles.input_row}>
                <select
                    onChange={e => {
                        setLecturerLoggingIn(Boolean(Number(e.target.value)));
                    }}
                >
                    <option value={1}>I am a Lecturer</option>
                    <option value={0}>I am a Student</option>
                </select>
            </div>

            <div className={styles.input_row}>
                <div className={styles.input_span}>Full name:</div>
                <input
                    className={styles.input_input}
                    onChange={e => setFullName(e.target.value)}
                    value={fullName}
                    type="text"
                />
            </div>
            <div className={styles.input_row}>
                <div className={styles.input_span}>Login:</div>
                <input
                    className={styles.input_input}
                    onChange={e => setLogin(e.target.value)}
                    value={login}
                    type="text"
                />
            </div>
            <div className={styles.input_row}>
                <div className={styles.input_span}>Password:</div>
                <input
                    className={styles.input_input}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                />
            </div>
            <div className={styles.input_row}>
                <div className={styles.input_span}>Group name:</div>
                <input
                    className={styles.input_input}
                    onChange={e => setGroupName(e.target.value)}
                    value={groupName}
                    type="text"
                />
            </div>
            <hr/>
            <div className={styles.input_row}>
                <button
                    className={styles.button}
                    onClick={() => onSubmitButtonPressed()}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
