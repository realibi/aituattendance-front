import SideMenu from "../../../components/common/SideMenu";
import Header from "../../../components/common/Header";
import PageTitle from "../../../components/common/PageTitle";
import Notifications from "../../../components/common/Notifications";
import Profile from "../../../components/student/Profile";
import AddCourses from "../../../components/lecturer/AddCourse";
import CoursesTable from "../../../components/common/CoursesTable";
import httpsQueries from "../../../utils/httpQueries";
import globals from "../../../utils/globals";
import {useEffect, useState} from "react";

export default function Courses(){
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const loadCourses = async () => {
            httpsQueries
                .get(globals.BACKEND_URL + '/courses')
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
            <SideMenu student={false} />
            <div style={{width: 'calc(100% - 300px)', marginLeft: 300}}>
                <Header student={false}/>
                <PageTitle title={'Courses'}/>
                <AddCourses/>

                <p style={{
                    margin: 30,
                    fontSize: 20,
                    fontWeight: 700,
                    textAlign: 'center'
                }}>
                    Your courses:
                </p>

                <div style={{margin: 30}}>
                    <CoursesTable coursesArray={courses} student={false}/>
                </div>
            </div>
        </div>
    );
}
