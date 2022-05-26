import styles from './style.module.css';
import httpsQueries from '../../../utils/httpQueries'
import globals from '../../../utils/globals'
import CoursesTable from "../../common/CoursesTable";
import {useEffect, useState} from "react";
import router from "next/router";
export default function EnrolledCourses({courses = []}){
    const [courseCode, setCourseCode] = useState('');

    const onSubmitButtonPressed = () => {
        let user = JSON.parse(localStorage.getItem(globals.LOCALSTORAGE_KEYS.user));
        httpsQueries.post(globals.BACKEND_URL + '/students/enrollToCourse', {
            courseCode,
            studentId: user._id
        }).then(result => {
            alert('success!');
            router.reload();
        }).catch(() => {
            alert('Something went wrong!');
        })
    }

    return(
        <div className={styles.container}>
            <div>
                <span className={styles.primaryText}>Course ID:</span>
                <input
                    type="text"
                    className={styles.input}
                    value={courseCode}
                    onChange={e => setCourseCode(e.target.value)}
                    placeholder={'Enter course code to enrol'}
                />
                <button
                    className={styles.submit_button}
                    onClick={() => onSubmitButtonPressed()}
                >
                    Submit
                </button>

                <br/><br/>

                {/*<div style={{*/}
                {/*    display: 'flex',*/}
                {/*    justifyContent: 'flex-end',*/}
                {/*    padding: '10px 0'*/}
                {/*}}>*/}
                {/*    <button*/}
                {/*        className={styles.refresh_table_button}*/}
                {/*    >*/}
                {/*        Refresh table*/}
                {/*    </button>*/}
                {/*</div>*/}

                <CoursesTable coursesArray={courses} student={true}/>
            </div>
        </div>
    );
}
