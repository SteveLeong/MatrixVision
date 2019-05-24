import { useState, useEffect } from "react"

export const useVideo = videoRef => {

    const [hasVideo, setHasVideo] = useState(false)

    useEffect(() => {

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: false })
                .then(localMediaStream => {
                    console.log(localMediaStream);
                    videoRef.srcObject = localMediaStream;
                    videoRef.play();
                    setHasVideo(true)
                    console.log(hasVideo);
                })
                .catch(err => {
                    console.error("Please enable your webcam", err);
                    // setHasVideo(false)
                    console.log(hasVideo);
                });
        }

    }, [])

    return hasVideo
}

// export default useVideo