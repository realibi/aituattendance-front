import styles from "./style.module.css";
import classnames from "classnames";
import Link from "next/link";
import router from "next/router";
import globals from "./../../../utils/globals";

export default function CoursesTable({coursesArray=[], student}){
    return(
        <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '0.5px solid grey'
        }}>
            <tbody>
            <tr className={styles.table_row}>
                <th className={styles.table_cell}>Code</th>
                <th className={styles.table_cell}>Title</th>
                <th className={styles.table_cell}>Owner</th>
                <th className={styles.table_cell}>Action</th>
            </tr>
            {coursesArray.map((item, index) => (
                <tr key={index} className={styles.table_row}>
                    <td className={styles.table_cell}>{item.code}</td>
                    <td className={styles.table_cell}>{item.title}</td>
                    <td className={styles.table_cell}>{item.owner.fullName}</td>
                    <td className={styles.table_cell}>
                        <button
                            className={styles.action_button}
                            onClick={() => {
                                localStorage.setItem(globals.LOCALSTORAGE_KEYS.selectedCourse, JSON.stringify(item));
                                router.push(`/${student ? 'student' : 'lecturer'}/courses/info`);
                            }}
                        >
                            GO
                        </button>
                        {/*<button className={classnames(styles.action_button, styles.danger)}>DEL</button>*/}
                    </td>
                </tr>
            ))}

            </tbody>
        </table>
    );
}
