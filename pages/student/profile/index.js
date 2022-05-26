import SideMenu from "../../../components/common/SideMenu";
import Header from "../../../components/common/Header";
import PageTitle from "../../../components/common/PageTitle";
import Notifications from "../../../components/common/Notifications";
import Profile from "../../../components/student/Profile";

export default function profile(){
    return(
        <div style={{display: 'flex'}}>
            <SideMenu student={true}/>
            <div style={{width: 'calc(100% - 300px)', marginLeft: 300}}>
                <Header student={true}/>
                <PageTitle title={'Account'}/>
                <div style={{marginTop: 30}}>
                    <Profile/>
                </div>
            </div>
        </div>
    );
}
