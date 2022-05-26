import styles from './style.module.css'
import httpQueries from '../../../utils/httpQueries'
import globals from '../../../utils/globals'
import {useState} from "react";
import router from "next/router";

export default function AddCourses(){
    const [code, setCode] = useState('');
    const [name, setName] = useState('');

    const onSubmitButtonPressed = () => {
        const user = JSON.parse(localStorage.getItem(globals.LOCALSTORAGE_KEYS.user));
        const data = {
            title: name,
            code,
            owner: user
        }
        httpQueries
            .post(globals.BACKEND_URL + '/courses', data)
            .then(result => {
                setName('');
                setCode('');
                router.reload();
            })
            .catch(() => {
                alert('Something went wrong!');
            })
        ;
    }

    return(
        <div className={styles.container}>
            <div className={styles.title_block}>
                <p className={styles.title_text}>Add course</p>
            </div>
            <div className={styles.inputs_block}>
                <div className={styles.inputs_row}>
                    <span className={styles.course_span}>Course code:</span>
                    <input
                        type="text"
                        className={styles.input}
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        placeholder={'Enter course code'}
                    />
                </div>
                <div className={styles.inputs_row}>
                    <span className={styles.course_span}>Course name:</span>
                    <input
                        type="text"
                        className={styles.input}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={'Enter course name'}
                    />
                </div>
            </div>
            <button
                className={styles.submit_btn}
                onClick={() => onSubmitButtonPressed()}
            >
                Submit
            </button>
        </div>
    );
}
