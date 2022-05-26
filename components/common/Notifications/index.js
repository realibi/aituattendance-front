import styles from './style.module.css'
import Notification from "./Notification";
export default function Notifications(){
    let notifications = [
        {
            title: 'New Attendance Notification - Course ID: MPD19010203',
            text: 'Course owner: [Ilyas Aitenov] had created an attendance in the course: Machine Learning (123-1)'
        },
        {
            title: 'New Attendance Notification - Course ID: MPD19010203',
            text: 'Course owner: [Ilyas Aitenov] had created an attendance in the course: Machine Learning (123-1)'
        },
        {
            title: 'New Attendance Notification - Course ID: MPD19010203',
            text: 'Course owner: [Ilyas Aitenov] had created an attendance in the course: Machine Learning (123-1)'
        },
        {
            title: 'New Attendance Notification - Course ID: MPD19010203',
            text: 'Course owner: [Ilyas Aitenov] had created an attendance in the course: Machine Learning (123-1)'
        },
        {
            title: 'New Attendance Notification - Course ID: MPD19010203',
            text: 'Course owner: [Ilyas Aitenov] had created an attendance in the course: Machine Learning (123-1)'
        },
    ];
    return(
        <div className={styles.container}>
            {
                notifications.map((item, index) => <Notification key={index} title={item.title} text={item.text}/>)
            }
        </div>
    );
}
