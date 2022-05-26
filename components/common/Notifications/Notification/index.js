import styles from './style.module.css'
export default function Notification({title, text}){
    return(
        <div className={styles.container}>
            <p className={styles.title_text}>{title}</p>
            <hr/>
            <p className={styles.content_text}>{text}</p>
        </div>
    );
}
