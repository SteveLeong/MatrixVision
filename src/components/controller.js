import React, { useState, useEffect } from "react";
import { Row, Col, Popover, Button } from "antd";

const Controller = React.forwardRef((props, ref) => {
  const hoverContent = <div>Please Enable Your Webcam!</div>;

  const [canvasRef, stripRef, videoRef] = ref

  const [hover, setHover] = useState(false);
  const [hasVideo, setHasVideo] = useState(false)

  useEffect(() => {
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


  const takePhoto = () => {
    const data1 = canvasRef.current.toDataURL("image/jpeg");
    console.log(data1);
    var link = document.createElement("a");
    link.href = data1;
    link.setAttribute("download", "matrix");
    link.innerHTML = `<img src="${data1}"/>`;
    stripRef.current.insertBefore(link, stripRef.current.firstChild);
    document.querySelector(".strip").scrollIntoView({
      behavior: "smooth"
    });
  };


  const handleVisibleChange = show => {
    console.log("handleHoverChange");
    setHover(show);
  };

  return (
    <div className="controller">
      <Row className="row">
        <Col span={24} gutter={16} className="col">
          <div>
            <Popover
              content={hoverContent}
              trigger="hover"
              placement="bottom"
              visible={hover}
              onVisibleChange={hasVideo ? "" : handleVisibleChange}
            >
              <Button onClick={props.paintToCanvas} disabled={!hasVideo}>
                Matrixify
              </Button>
            </Popover>
          </div>
        </Col>
        <Col span={24} gutter={16} className="col">
          <Button onClick={takePhoto} disabled={!hasVideo}>Take Photo</Button>
        </Col>
      </Row>
    </div>
  );
});

export default Controller;
