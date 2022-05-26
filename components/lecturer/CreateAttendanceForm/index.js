import styles from "./style.module.css";
import globals from './../../../utils/globals';
import httpQueries from './../../../utils/httpQueries';
import {useState} from "react";
import router from 'next/router'

export default function CreateAttendanceForm({course, ...props}){
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const onSubmitPressed = () => {
        const data = {
            id: course._id,
            newDate: `${date} ${time}`
        }

        httpQueries.post(globals.BACKEND_URL + '/courses/setAttendance', data)
            .then(() => {
                alert('Attendance created!');
                router.push('/lecturer/courses/info');
            });
    }

    return(
        <div className={styles.container}>
            <div className={styles.title_block}>
                Create attendance
            </div>
            <div style={{padding: 30}}>
                <div className={styles.info_row}>
                    <span className={styles.info_title}>Course:</span>
                    <span className={styles.info_data}>{course.code} - {course.title}</span>
                </div>
                <div className={styles.info_row}>
                    <span className={styles.info_title}>Date:</span>
                    <span className={styles.info_data}>
                        <input
                            type="date"
                            value={date}
                            className={styles.input}
                            onChange={e => setDate(e.target.value)}
                        />
                    </span>
                </div>
                <div className={styles.info_row}>
                    <span className={styles.info_title}>Time:</span>
                    <span className={styles.info_data}>
                        <input
                            type="time"
                            className={styles.input}
                            value={time}
                            onChange={e => setTime(e.target.value)}
                        />
                    </span>
                </div>
            </div>
            <button className={styles.button} onClick={() => onSubmitPressed()}>
                Submit
            </button>
        </div>
    );
}
