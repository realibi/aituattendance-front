import styles from './styles.module.css';
import Image from 'next/image'
import Link from "next/link";
import classnames from 'classnames'

export default function SideMenu(props){
    let menuItems = [
        {
            studentItem: true,
            title: 'Courses',
            icon: '/courses_menu_item.png',
            link: '/student/courses'
        },
        {
            studentItem: true,
            title: 'Upload photo',
            icon: '/upload_photo_menu_item.png',
            link: '/student/uploadPhoto'
        },
        {
            studentItem: false,
            title: 'Courses',
            icon: '/courses_menu_item.png',
            link: '/lecturer/courses'
        },
    ];

    return(
        <div className={styles.container}>
            <div className={styles.logo_title}>
                <Image width={50} height={55} src={'/aitu-logo_.png'}/>
                <span style={{fontSize: 24}}>{props.student ? 'Student' : 'Lecturer'} version</span>
            </div>

            {
                menuItems.map((item, index) =>
                    props.student === item.studentItem &&
                    (
                        <Link key={index} href={item.link}>
                            <a className={classnames(styles.menu_item, props.active === item.title ? styles.active : null)}>
                                <img style={{width: 27, height: 27}} src={item.icon}/>
                                <p style={{fontSize: 24, margin: '0 0 0 20px'}}>{item.title}</p>
                            </a>
                        </Link>
                    ))
            }
        </div>
    );
}
