import SideMenu from "../../../components/common/SideMenu";
import Header from "../../../components/common/Header";
import PageTitle from "../../../components/common/PageTitle";
import Notifications from "../../../components/common/Notifications";

export default function UploadPhoto(){
    return(
        <div style={{display: 'flex'}}>
            <SideMenu student={false}/>
            <div style={{width: 'calc(100% - 300px)', marginLeft: 300}}>
                <Header student={false}/>
                <PageTitle title={'Notifications'}/>
                <Notifications/>
            </div>
        </div>
    );
}
