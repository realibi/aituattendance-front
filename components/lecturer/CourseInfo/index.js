import styles from './style.module.css'
import {useState} from "react";
import Link from "next/link";

export default function CourseInfo({course, ...props}){
    const createdDate = new Date(course.createdAt);

    const getDateString = (date, timeNeeded) => {
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let seconds = date.getSeconds();

        if(month < 10) month = '0' + month;
        if(day < 10) day = '0' + day;

        let result = `${year}/${month}/${day}`;

        if(timeNeeded){
            if(hour < 10) hour = '0' + hour;
            if(minute < 10) minute = '0' + minute;
            if(seconds < 10) seconds = '0' + seconds;
            result = `[${year}/${month}/${day}]: ${hour}:${minute}:${seconds}`;
        }

        return result;
    }

    return(
        <div className={styles.container}>
            <p className={styles.title_text}>{course.title}</p>
            <p className={styles.course_span}><b>Code:</b> {course.code}</p>
            <p className={styles.course_span}><b>Created:</b> {getDateString(new Date(course.createdAt), false)} </p>
            <p className={styles.course_span}><b>Attendance:</b> {getDateString(new Date(course.attendanceDate), true)} </p>

            <Link href={`/lecturer/courses/info/createAttendance`}>
                <button className={styles.submit_btn}>Create attendance</button>
            </Link>
        </div>
    );
}
