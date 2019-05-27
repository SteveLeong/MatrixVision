import { useState, useEffect } from "react"

export const useVideo = videoRef => {

    const [hasVideo, setHasVideo] = useState(false)

    useEffect(() => {

        // console.log("using controller")
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: false })
                .then(localMediaStream => {
                    console.log(localMediaStream);
                    videoRef.current.srcObject = localMediaStream;
                    videoRef.current.play();
                    setHasVideo(true);
                })
                .catch(err => {
                    console.error("Please enable your webcam", err);
                    setHasVideo(false)
                });
        } else {
            console.error("Please enable your webcam");
        }

    }, [])

    return hasVideo
}
