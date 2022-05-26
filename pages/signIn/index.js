import styles from './style.module.css'
import httpQueries from '../../utils/httpQueries'
import globals from '../../utils/globals'
import {useEffect, useState} from "react";
import router from 'next/router'
export default function SignIn(){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [lecturerLoggingIn, setLecturerLoggingIn] = useState(true);

    useEffect(() => {
        localStorage.removeItem(globals.LOCALSTORAGE_KEYS.user);
        localStorage.removeItem(globals.LOCALSTORAGE_KEYS.role);
    }, []);

    const onSubmitButtonPressed = () => {
        httpQueries.post(globals.BACKEND_URL + `${lecturerLoggingIn ? '/lecturers' : '/students'}/login`, {
            login,
            password
        }).then(result => {
            if(result.data){
                localStorage.setItem(globals.LOCALSTORAGE_KEYS.user, JSON.stringify(result.data));
                localStorage.setItem(globals.LOCALSTORAGE_KEYS.role, lecturerLoggingIn ? globals.ROLES.lecturer : globals.ROLES.student);
                router.push(`/${lecturerLoggingIn ? 'lecturer' : 'student' }/courses`);
            }else{
                alert('Wrong login data!');
            }
        }).catch(err => {
            alert('Something went wrong!');
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
                <div className={styles.input_span}>Login:</div>
                <input
                    className={styles.input_input}
                    type="text"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                />
            </div>
            <div className={styles.input_row}>
                <div className={styles.input_span}>Password:</div>
                <input
                    className={styles.input_input}
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
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
