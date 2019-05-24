import React, { Component } from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import "./css/main.css";

import Stream from "./scripts/stream";
import NavBar from "./components/navBar";
import Controller from "./components/controller";
import Video from "./components/video"
import Canvas from "./components/canvas"

class App extends Component {
  state = {
    video: false
  };

  constructor(props) {
    super(props);

    this.sfontSize = 11;
    this.symbols = new Array(25);
    this.symbolData = []; // All 96 Katakana symbols and their respective RGB totals
    this.streams = [];
    this.video = React.createRef()
    this.strip = React.createRef()
    this.canvas = React.createRef()
    this.controllerRefs = [this.canvas, this.strip, this.video]
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext("2d");
    this.clearCTX();
    this.setUp();
    this.clearCTX();
  }

  clearCTX = () => {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.current.width, this.canvas.current.height);
  }

  setUp = () => {
    this.getSymbols();
    var x = 0;
    for (var i = 0; i <= this.canvas.current.width / this.sfontSize; i++) {
      var stream = new Stream(this.canvas.current.height, this.sfontSize);
      stream.generateSymbols(
        x,
        Math.random() - 500,
        this.sfontSize,
        this.symbolData
      );
      this.streams.push(stream);
      x += this.sfontSize;
    }
  };

  getSymbols = () => {
    this.ctx.font = "11px monospace";
    this.ctx.fillStyle = "#00BB00";
    // Get Katakana symbols
    var xcoor = 0;
    var count = 0;
    var ycoor = 10;
    var symbol;

    for (var i = 0; i < 96; i++) {
      // get symbol, 0x30A0 is where Katakana starts
      symbol = String.fromCharCode(0x30a0 + i);

      // if its trying to print off the canvas
      if (count * 12 + 20 > this.canvas.current.width) {
        count = 0;
        ycoor += 10;
      }

      xcoor = count * 12 + 20;

      this.ctx.fillText(symbol, xcoor, ycoor);

      // get the 'brightness' of the symbol, Black=000, so brightness is the amount of RGB in the symbol

      var imgData = this.ctx.getImageData(
        xcoor,
        ycoor - 10,
        7,
        this.sfontSize - 1
      );

      // total is the total RGB value of the symbol
      var total = 0; //reset
      for (var j = 0; j < imgData.data.length; j += 4) {
        total += imgData.data[j] + imgData.data[j + 1] + imgData.data[j + 2];
      }

      var arr = new Array(2);
      arr[0] = total;
      arr[1] = symbol;
      this.symbolData.push(arr);
      count++;
    }

    // Sort symbols by total values
    this.symbolData.sort((a, b) => {
      return a[0] - b[0];
    });

    // Take 25 symbols
    var interval = Math.floor(this.symbolData.length / this.symbols.length);
    var index = 0;
    for (
      var k = 0;
      k < this.symbols.length - 1 && index < this.symbolData.length;
      k++
    ) {
      this.symbols[k] = this.symbolData[index][1];
      // draw them onto empty canvas
      this.ctx.fillText(this.symbols[k], k * 10 + 20, 90);
      index += interval;
    }

    // Last symbol is always has biggest total RGB
    this.symbols[this.symbols.length - 1] = this.symbolData[
      this.symbolData.length - 1
    ][1];

  };

  paintToCanvas = () => {
    this.ctx.drawImage(this.video.current, 0, 0);
    this.matrixify(this.canvas, this.ctx, this.symbols, this.sfontSize);
    requestAnimationFrame(this.paintToCanvas);
  };

  matrixify = (canvas, ctx, symbols, size) => {
    this.streams.forEach((stream) => {
      stream.symbols.forEach((symbol) => {
        var imgData = ctx.getImageData(symbol.x1, symbol.y1, 7, size);
        var brightness = symbol.getBrightness(imgData);
        var total = brightness[0] / brightness[1];

        symbol.average = Math.ceil(total / stream.symbols.length);
        symbol.setToVideoSymbol(symbols);
      });
    });

    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

    this.streams.forEach(function (stream) {
      stream.render(ctx, canvas.current.height);
    });
  };

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
                paintToCanvas={this.paintToCanvas}
                sfontSize={this.sfontSize}
                ref={this.controllerRefs}
              />
            </Col>
          </Row>
          <div ref={this.strip} className="strip" />
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

    /* <div>Make Sure Your Webcam is Enabled!</div> */
  }
}

export default App;
