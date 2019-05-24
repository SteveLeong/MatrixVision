import React, { useState } from "react";
import { Row, Col, Popover, Button } from "antd";

const Controller = React.forwardRef((props, ref) => {
  const hoverContent = <div>Please Enable Your Webcam!</div>;

  const [canvasRef, stripRef] = ref

  const [hover, setHover] = useState(false);
  //   const [video, setVideo] = useState(false);

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
              onVisibleChange={props.video ? "" : handleVisibleChange}
            >
              <Button onClick={props.paintToCanvas} disabled={!props.video}>
                Matrixify
              </Button>
            </Popover>
          </div>
        </Col>
        <Col span={24} gutter={16} className="col">
          <Button onClick={takePhoto}>Take Photo</Button>
        </Col>
      </Row>
    </div>
  );
});

export default Controller;
