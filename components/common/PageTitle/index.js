import styles from './style.module.css'
export default function PageTitle({title}){
    return (
        <div className={styles.container}>
            <p className={styles.text}>{title}</p>
        </div>
    );
}
