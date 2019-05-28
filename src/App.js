import React, { Component } from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import "./css/main.css";

import NavBar from "./components/navBar";
import Controller from "./components/controller";
import Video from "./components/video";
import Canvas from "./components/canvas";
import { setUp } from "./scripts/setup";

class App extends Component {
  constructor(props) {
    super(props);

    this.sfontSize = 11;
    this.symbols = new Array(25);
    this.symbolData = []; // All 96 Katakana symbols and their respective RGB totals
    this.streams = [];
    this.video = React.createRef();
    this.strip = React.createRef();
    this.videoStrip = React.createRef();
    this.canvas = React.createRef();
    this.controllerRefs = [
      this.canvas,
      this.strip,
      this.videoStrip,
      this.video
    ]; // can't send multiple refs to one component
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext("2d");
    setUp(
      this.canvas,
      this.ctx,
      this.sfontSize,
      this.symbols,
      this.symbolData,
      this.streams
    );
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          <Row style={{ height: "100%" }}>
            <Col span={16}>
              <Canvas ref={this.canvas} />
            </Col>
            <Col span={8} style={{ height: "80vh" }}>
              <Video ref={this.video} />
              <Controller
                symbols={this.symbols}
                fontSize={this.sfontSize}
                streams={this.streams}
                ref={this.controllerRefs}
              />
            </Col>
          </Row>
          <div ref={this.strip} className="strip" />
          <div ref={this.videoStrip} className="videoStrip" />
          <div className="footer">
            <div className="description">
              For my Final Net Art Project I decided to do an Interactive
              Artwork inspired by the movie 'Matrix'. In the movie, there is a
              scene where the main character sees 'code' in his vision,
              overlayed on top of reality. I thought it would be cool to
              recreate this effect using a webcam.
              <br /> Originally this was done entirely in JavaScript, but I
              decided to convert it to a React application.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
