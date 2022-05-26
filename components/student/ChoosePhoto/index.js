import styles from './style.module.css'
import {useEffect, useRef, useState} from "react";
import httpQueries from '../../../utils/httpQueries';
import globals from '../../../utils/globals'
import * as faceapi from 'face-api.js';
import router from "next/router";

export default function ChoosePhoto(){
    const [webcamChosen, setWebcamChosen] = useState(true);
    const [lastDetectedDescriptor, setLastDetectedDescriptor] = useState(null);
    const [videoStarted, setVideoStarted] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);

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
        }
    }

    const handleVideoOnPlay = async () => {
        await loadModels();
        let intervalId = setInterval(async() => {
            await detectFace();
        }, 500);

        setIntervalId(intervalId);
    }

    const saveBtnClick = () => {
        setSaveButtonPressed(!saveButtonPressed);
        const user = JSON.parse(localStorage.getItem(globals.LOCALSTORAGE_KEYS.user));
        stopVideo();
        if(webcamChosen){
            httpQueries
                .post(globals.BACKEND_URL + '/students/uploadDescriptor', {
                    studentId: user._id,
                    faceDescriptor: lastDetectedDescriptor
                })
                .then(() => {
                    alert('Face saved');
                    //canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0, displaySize.width, displaySize.height);
                    // const image = new Image()
                    // image.src = canvasRef.current.toDataURL();
                    // console.log('imgUrl', image.src);
                    // setVideoCaptureImgSrc(image.src);
                })
        }else{
            alert('Please chose webcam');
        }
    }

    useEffect(() => {
        const loadInfo = async () => {
            const currentUserInfo = JSON.parse(localStorage.getItem(globals.LOCALSTORAGE_KEYS.user));
            setCurrentUser(currentUserInfo);
            if(currentUserInfo != null){
                if(currentUserInfo.faceDescriptor[0] !== undefined){
                    alert("face not loaded");
                }else{
                    const userChoice = confirm('Your face is already loaded. Do you want to load again?');
                    if(userChoice){
                        loadModels();
                        startVideo();
                    }else{
                        router.push('/student/courses');
                    }
                }
            }
        }
        loadInfo();
    }, [])

    return(
        <div className={styles.container}>
            {webcamChosen ? (
                <>
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
                </>
            ) : (
                <input type="file"/>
            )}

            <div style={{textAlign: 'center', marginTop: 10}}>
                <button
                    className={styles.save_btn}
                    onClick={() => saveBtnClick()}
                >Save</button>
            </div>

        </div>
    );
}
