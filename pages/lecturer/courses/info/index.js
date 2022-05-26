import SideMenu from "../../../../components/common/SideMenu";
import Header from "../../../../components/common/Header";
import PageTitle from "../../../../components/common/PageTitle";
import styles from './style.module.css';
import httpQueries from '../../../../utils/httpQueries'
import globals from '../../../../utils/globals'
import CourseInfo from "../../../../components/lecturer/CourseInfo";
import ParticipantsTable from "../../../../components/lecturer/ParticipantsTable";
import {useEffect, useState} from "react";

export default function Info(){
    const [participantsList, setParticipantsList] = useState(null);
    const [currentCourse, setCurrentCourse] = useState(null);

    useEffect(() => {
        const loadInfo = async () => {
            let currentCourseInfo = await httpQueries.get(globals.BACKEND_URL + '/courses/' + JSON.parse(localStorage.getItem(globals.LOCALSTORAGE_KEYS.selectedCourse))._id);
            setCurrentCourse(currentCourseInfo.data);
            let participantsList = await httpQueries.get(globals.BACKEND_URL + '/attendances/course/' + currentCourseInfo.data._id);
            setParticipantsList(participantsList.data);
        }
        loadInfo();
    }, [])

    return(
        <div style={{display: 'flex'}}>
            <SideMenu student={false} />
            <div style={{width: 'calc(100% - 300px)', marginLeft: 300}}>
                <Header student={false}/>
                <PageTitle title={'Course info'}/>
                {currentCourse && <CourseInfo course={currentCourse}/>}

                <div style={{display: 'flex', margin: 30, alignItems: 'center'}}>
                    <p style={{
                        fontSize: 20,
                        fontWeight: 700
                    }}>
                        Participants list:
                    </p>
                </div>

                <div style={{margin: 30}}>
                    <ParticipantsTable participantsList={participantsList}/>
                </div>
            </div>
        </div>
    );
}
