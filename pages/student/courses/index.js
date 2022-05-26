import styles from './styles.module.css'
import SideMenu from "../../../components/common/SideMenu";
import Header from "../../../components/common/Header";
import PageTitle from "../../../components/common/PageTitle";
import EnrolledCourses from "../../../components/student/EnrolledCourses";
import {useEffect, useState} from "react";
import globals from "../../../utils/globals";
import httpsQueries from "../../../utils/httpQueries";

export default function Dashboard(){
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const loadCourses = async () => {
            const user = JSON.parse(localStorage.getItem(globals.LOCALSTORAGE_KEYS.user));
            httpsQueries
                .get(globals.BACKEND_URL + `/students/enrolledCourses/${user._id}`)
                .then(result => {
                    setCourses(result.data);
                })
                .catch(() => alert('Something went wrong!'))
            ;
        }
        loadCourses();
    }, [])

    return(
        <div style={{display: 'flex'}}>
            <SideMenu student={true} active={'Courses'}/>
            <div style={{width: 'calc(100% - 300px)', marginLeft: 300}}>
                <Header student={true}/>
                <PageTitle title={'Courses page'}/>
                <EnrolledCourses courses={courses}/>
            </div>
        </div>
    );
}
