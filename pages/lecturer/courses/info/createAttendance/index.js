import styles from "./style.module.css";
import classnames from "classnames";
import CreateAttendanceForm from "../../../../../components/lecturer/CreateAttendanceForm";
import SideMenu from "../../../../../components/common/SideMenu";
import Header from "../../../../../components/common/Header";
import PageTitle from "../../../../../components/common/PageTitle";
import globals from './../../../../../utils/globals';
import {useEffect, useState} from "react";

export default function createAttendance(){
    const [currentCourse, setCurrentCourse] = useState(null);

    useEffect(() => {
        const loadInfo = async () => {
            let currentCourseInfo = JSON.parse(localStorage.getItem(globals.LOCALSTORAGE_KEYS.selectedCourse));
            setCurrentCourse(currentCourseInfo);
        }
        loadInfo();
    }, [])

    return(
        <div style={{display: 'flex'}}>
            <SideMenu student={false}/>
            <div style={{width: 'calc(100% - 300px)', marginLeft: 300}}>
                <Header student={false}/>
                <PageTitle title={'Attendance form'}/>
                {currentCourse && (<CreateAttendanceForm course={currentCourse}/>)}
            </div>
        </div>
    );
}
