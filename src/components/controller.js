import React, { useState } from "react";
import { Row, Col, Popover, Button } from "antd";

const Controller = props => {
  const hoverContent = <div>Please Enable Your Webcam!</div>;
  const [hover, setHover] = useState(false);
  //   const [video, setVideo] = useState(false);

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
          <Button onClick={props.takePhoto}>Take Photo</Button>
        </Col>
      </Row>
    </div>
  );
};

export default Controller;
