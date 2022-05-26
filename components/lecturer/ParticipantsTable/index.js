import styles from "./style.module.css";
import classnames from "classnames";

export default function ParticipantsTable({participantsList, ...props}){
    return(
        <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '0.5px solid grey'
        }}>
            <tbody>
            <tr className={styles.table_row}>
                <th className={styles.table_cell}>Full name</th>
                <th className={styles.table_cell}>Group name</th>
                <th className={styles.table_cell}>Time</th>
            </tr>

            {participantsList && participantsList.map((item, index) => {
                const createdDate = new Date(item.createdAt);
                const year = createdDate.getFullYear();
                const month = createdDate.getMonth() + 1;
                const day = createdDate.getDate();
                const hour = createdDate.getHours();
                const minutes = createdDate.getMinutes();
                const seconds = createdDate.getSeconds();

                return(
                    <tr key={index} className={styles.table_row}>
                        <td className={styles.table_cell}>{item.student.fullName}</td>
                        <td className={styles.table_cell}>{item.student.groupName}</td>
                        <td className={styles.table_cell}>[{day}/{month}/{year}] {hour}:{minutes}:{seconds}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}
