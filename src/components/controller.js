import React, { useState } from "react";
import { Row, Col, Popover, Button } from "antd";

import { useVideo } from "../hooks/videoHook"

var isPaused = false
var rec

const Controller = React.forwardRef((props, ref) => {

  const hoverContent = <div>Please Enable Your Webcam!</div>;
  const [canvasRef, stripRef, videoStripRef, videoRef] = ref

  const [hover, setHover] = useState(false);

  const [inMatrix, setInMatrix] = useState({
    flag: false,
    btnTxt: "Matrixify"
  })

  const [takingVideo, setTakingVideo] = useState({
    flag: false,
    btnTxt: "Take Video"
  })


  const hasVideo = useVideo(videoRef);

  const checkMatrixState = () => {
    if (!inMatrix.flag) {

      setInMatrix({ flag: true, btnTxt: "Pause" })
      paintToCanvas()

    } else {

      isPaused = !isPaused
      setInMatrix({ flag: true, btnTxt: isPaused ? "Paused" : "Pause" })

    }
  }

  const paintToCanvas = () => {

    if (!isPaused) {
      let ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0);
      matrixify(ctx);

    }
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

  const takeVideo = () => {

    if (!takingVideo.flag) {

      setTakingVideo({ flag: true, btnTxt: "Stop" })
      const chunks = []; // here we will store our recorded media chunks (Blobs)
      const stream = canvasRef.current.captureStream(); // grab our canvas MediaStream
      rec = new MediaRecorder(stream); // init the recorder
      // every time the recorder has new data, we will store it in our array
      rec.ondataavailable = e => chunks.push(e.data);
      // only when the recorder stops, we construct a complete Blob from all the chunks
      rec.onstop = e => exportVid(new Blob(chunks, { type: 'video/webm' }));

      rec.start();

    } else {
      rec.stop()
      setTakingVideo({ flag: false, btnTxt: "Take Video" })
    }
  }

  const exportVid = (blob) => {

    const vid = document.createElement('video');
    vid.src = URL.createObjectURL(blob);
    vid.controls = true;

    const link = document.createElement("a");
    link.className = "videoLink"
    link.download = 'myvid.webm';
    link.href = vid.src;
    link.appendChild(vid)

    videoStripRef.current.insertBefore(link, videoStripRef.current.firstChild);
    document.querySelector(".videoStrip").scrollIntoView({
      behavior: "smooth"
    });

  }


  const handleVisibleChange = show => { setHover(show); };


  return (
    <div className="controller">
      <Row gutter={16} className="row">
        <Col span={24} className="col">
          <div>
            <Popover
              content={hoverContent}
              trigger="hover"
              placement="bottom"
              visible={hover}
              onVisibleChange={hasVideo ? "" : handleVisibleChange}
            >
              <Button onClick={checkMatrixState} disabled={!hasVideo} id="matrixBtn">
                {inMatrix.btnTxt}
              </Button>
            </Popover>
          </div>
        </Col>
        <Col span={24} className="col">
          <Button onClick={takePhoto} disabled={!inMatrix.flag}>Take Photo</Button>

        </Col>
        <Col span={24} className="col">
          <Button onClick={takeVideo} disabled={!inMatrix.flag}>{takingVideo.btnTxt}</Button>
        </Col>
      </Row>
    </div>
  );
});

export default Controller;
