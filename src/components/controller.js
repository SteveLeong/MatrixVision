import React, { useState, useEffect } from "react";
import { Row, Col, Popover, Button } from "antd";

const Controller = React.forwardRef((props, ref) => {

  const hoverContent = <div>Please Enable Your Webcam!</div>;
  const [canvasRef, stripRef, videoRef] = ref
  const [hover, setHover] = useState(false);
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


  const paintToCanvas = () => {

    let ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);
    matrixify(ctx);
    requestAnimationFrame(paintToCanvas);

  };


  const matrixify = (ctx) => {

    props.streams.forEach((stream) => {
      stream.symbols.forEach((symbol) => {
        var imgData = ctx.getImageData(symbol.x1, symbol.y1, 7, props.fontSize);
        var brightness = symbol.getBrightness(imgData);
        var total = brightness[0] / brightness[1];

        symbol.average = Math.ceil(total / stream.symbols.length);
        symbol.setToVideoSymbol(props.symbols);
      });
    });

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    props.streams.forEach(function (stream) {
      stream.render(ctx, canvasRef.current.height);
    });

  };


  const takePhoto = () => {

    const data1 = canvasRef.current.toDataURL("image/jpeg");
    // console.log(data1);
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
              <Button onClick={paintToCanvas} disabled={!hasVideo}>
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
