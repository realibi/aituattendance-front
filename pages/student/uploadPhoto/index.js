import styles from './style.module.css'
import SideMenu from "../../../components/common/SideMenu";
import Header from "../../../components/common/Header";
import PageTitle from "../../../components/common/PageTitle";
import EnrolledCourses from "../../../components/student/EnrolledCourses";
import ChoosePhoto from "../../../components/student/ChoosePhoto";
export default function UploadPhoto(){
    return(
        <div style={{display: 'flex'}}>
            <SideMenu student={true} active={'Upload photo'}/>
            <div style={{width: 'calc(100% - 300px)', marginLeft: 300}}>
                <Header/>
                <PageTitle title={'Upload photo'}/>
                <ChoosePhoto/>
            </div>
        </div>
    );
}
