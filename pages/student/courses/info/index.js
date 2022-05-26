import SideMenu from "../../../../components/common/SideMenu";
import Header from "../../../../components/common/Header";
import PageTitle from "../../../../components/common/PageTitle";
import styles from './style.module.css';
import CourseInfo from "../../../../components/lecturer/CourseInfo";
import ParticipantsTable from "../../../../components/lecturer/ParticipantsTable";
import httpQueries from "../../../../utils/httpQueries";
import globals from "../../../../utils/globals";
import * as faceapi from "face-api.js";
import {useEffect, useRef, useState} from "react";

export default function Index(){
    const [currentStudent, setCurrentStudent] = useState({});
    const [currentCourse, setCurrentCourse] = useState(null);

    const [attendanceButtonDisabled, setAttendanceButtonDisabled] = useState(false);
    const [attendanceButtonText, setAttendanceButtonText] = useState('Start camera');

    const [lastDetectedDescriptor, setLastDetectedDescriptor] = useState(null);
    const [videoStarted, setVideoStarted] = useState(false);

    let attendanceCreatedCount = 0;

    const videoHeight = 480;
    const videoWidth = 640;
    const videoRef = useRef('');
    const canvasRef = useRef('');
    const [videoStream, setVideoStream] = useState();
    const [labeledDescriptorsFromDb, setLabeledDescriptorsFromDb] = useState([]);
    const [intervalId, setIntervalId] = useState(0);
    const [videoCaptureImgSrc, setVideoCaptureImgSrc] = useState(null);
    const [saveButtonPressed, setSaveButtonPressed] = useState(false);

    const displaySize = {
        width: videoWidth,
        height: videoHeight
    };

    const createAttendance = async () => {
        let data = {
            student: JSON.parse(localStorage.getItem(globals.LOCALSTORAGE_KEYS.user)),
            course: JSON.parse(localStorage.getItem(globals.LOCALSTORAGE_KEYS.selectedCourse))
        }
        alert("attendance created");
        await httpQueries.post(globals.BACKEND_URL + '/attendances', data);
    }

    useEffect(() => {
        setCurrentStudent(JSON.parse(localStorage.getItem(globals.LOCALSTORAGE_KEYS.user)));
        const selectedCourseAttendanceDate = JSON.parse(localStorage.getItem(globals.LOCALSTORAGE_KEYS.selectedCourse)).attendanceDate;

        // if(new Date() <= new Date(selectedCourseAttendanceDate)){
        //     let timeDifference = new Date(selectedCourseAttendanceDate) - new Date();
        //     let differenceInMinutes = Math.round(((timeDifference % 86400000) % 3600000) / 60000);
        //
        //     if(differenceInMinutes > 15){
        //         setAttendanceButtonDisabled(true);
        //         setAttendanceButtonText('You can not attend the lesson now');
        //     }
        // }else{
        //     setAttendanceButtonDisabled(true);
        //     setAttendanceButtonText('You can not attend the lesson now');
        // }

        const loadLabeledDescriptors = async () => {
            try{
                let students = await httpQueries.get(globals.BACKEND_URL + '/students');
                let resultArray = [];
                students.data.map(item => resultArray.push(new faceapi.LabeledFaceDescriptors(item.fullName, [new Float32Array(Object.values(item.faceDescriptor[0]))])))
                setLabeledDescriptorsFromDb(resultArray);
            }catch{
                alert('You did not upload image!');
            }
        }
        loadLabeledDescriptors();
    }, [])

    async function loadModels() {
        const MODEL_URL = '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    }

    const startVideo = async () => {
        navigator.getUserMedia(
            {video: {}},
            stream => {
                videoRef.current.srcObject = stream;
                setVideoStream(stream);
            },
            error => console.log(error)
        )
    }

    const stopVideo = () => {
        clearInterval(intervalId);
        videoStream.getTracks().forEach(function(track) {
            track.stop();
        });
        canvasRef.current = {};
    }

    const drawRecognisedFaceLabels = async (lastDetectedDescriptor) => {
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptorsFromDb);
        let faceMatcherResults = faceMatcher.findBestMatch(lastDetectedDescriptor);
        let detectedStudentLabel = faceMatcherResults._label;

        if(detectedStudentLabel === currentStudent.fullName){
            if(attendanceCreatedCount === 0) {
                attendanceCreatedCount++;
                await createAttendance();
            }

            const text = [detectedStudentLabel]
            const anchor = { x: 200, y: 200 }
            const drawOptions = {
                anchorPosition: 'TOP_LEFT',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
            const drawBox = new faceapi.draw.DrawTextField(text, anchor, drawOptions)
            drawBox.draw(canvasRef.current);
        }
    }

    const detectFace = async () => {
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
        if(detections !== undefined && detections[0] !== undefined){
            setLastDetectedDescriptor(detections[0].descriptor);

            canvasRef.current.innerHTML = faceapi.createCanvas(videoRef.current);
            faceapi.matchDimensions(canvasRef.current, displaySize);

            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
            faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
            drawRecognisedFaceLabels(detections[0].descriptor);
        }
    }

    const handleVideoOnPlay = async () => {
        await loadModels();
        let intervalId = setInterval(async() => {
            await detectFace();
        }, 500);

        setIntervalId(intervalId);
    }

    return(
        <div style={{display: 'flex'}}>
            <SideMenu student={true} />
            <div style={{width: 'calc(100% - 300px)', marginLeft: 300}}>
                <Header student={true}/>
                <PageTitle title={'Course info'}/>

                <button
                    className={styles.save_btn}
                    style={{
                        margin: '0 auto'
                    }}
                    disabled={attendanceButtonDisabled}
                    onClick={() => {
                        videoStarted ? stopVideo() : startVideo();
                        setVideoStarted(!videoStarted);
                    }}
                >
                    {videoStarted ? 'Stop' : attendanceButtonText}
                </button>

                <div className={styles.webcam_video_block}>
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        height={videoHeight}
                        width={videoWidth}
                        onPlay={handleVideoOnPlay}
                        style={{
                            position: 'absolute'
                        }}
                    />
                    <canvas height={videoHeight} width={videoWidth} ref={canvasRef} style={{position: 'absolute'}}/>
                </div>

            </div>
        </div>
    );
}
