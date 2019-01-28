// init
const video = document.getElementById("player");
const canvas = document.getElementById("photo");
const ctx = canvas.getContext("2d");
const strip = document.getElementById("strip");
ctx.font = "11px monospace";
ctx.fillStyle = "#00BB00";
var fontSize = 11;
var symbols = new Array(25);
var symbolData = [];
var streams = [];

function setup() {
  getSymbols();

  getVideo();

  var x = 0;
  for (var i = 0; i <= canvas.width / fontSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, Math.random() - 500);
    streams.push(stream);
    x += fontSize;
  }

  console.log(streams);
}

function Stream() {
  this.symbols = [];
  this.totalSymbols = canvas.height / fontSize;
  this.speed = Math.random() * 6 + 2;
  var first = Math.round(Math.random() * 3) == 1;

  this.generateSymbols = function(x, y) {
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first);

      symbol.setRandomSymbol();
      this.symbols.push(symbol);

      y -= fontSize;
      first = false;
    }
  };

  this.getCorrectSymbols = function() {
    this.symbols.forEach(function(symbol) {
      var imgData = ctx.getImageData(symbol.x, symbol.y, 7, 12);
      var brightness = getBrightness(imgData);
      total = brightness[0] / brightness[1];
      symbol.average = Math.floor(total / symbols.length);
      symbol.setToVideoSymbol();
    });
  };

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        ctx.fillStyle = "#09ff08";
      } else {
        ctx.fillStyle = "#00a800";
      }
      ctx.fillText(symbol.value, symbol.x, symbol.y);
      symbol.animate();
    });
  };
}

function Symbol(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.first = first;
  this.value;
  this.average;

  this.setRandomSymbol = function() {
    var rand = Math.floor(Math.random() * 95);
    this.value = symbolData[rand][1];
  };

  this.setToVideoSymbol = function() {
    this.value = symbols[this.average];
  };

  this.animate = function() {
    this.y = this.y >= canvas.height ? 0 : (this.y += this.speed);
  };
}

function paintToCanvas() {
  ctx.drawImage(video, 0, 0);
  matrixify();
  requestAnimationFrame(paintToCanvas);
}

function matrixify() {
  streams.forEach(function(stream) {
    stream.getCorrectSymbols();
  });

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  streams.forEach(function(stream) {
    stream.render();
  });
}

function getSymbols() {
  // Get Katakana symbols
  var xcoor = 0;
  var count = 0;
  var ycoor = 10;

  for (var i = 0; i < 96; i++) {
    // get symbol, 0x30A0 is where Katakana starts
    symbol = String.fromCharCode(0x30a0 + i);

    // if its trying to print off the canvas
    if (count * 12 + 20 > canvas.width) {
      count = 0;
      ycoor += 10;
    }

    xcoor = count * 12 + 20;

    ctx.fillText(symbol, xcoor, ycoor);

    // get the 'brightness' of the symbol, Black=000, so brightness is the amount of RGB in the symbol
    // getImageData(x, y, width, height)

    var imgData = ctx.getImageData(xcoor, ycoor - 10, 7, fontSize - 1);

    // total is the total RGB value of the symbol
    var total = 0; //reset
    for (var j = 0; j < imgData.data.length; j += 4) {
      total += imgData.data[j] + imgData.data[j + 1] + imgData.data[j + 2];
    }

    var arr = new Array(2);
    arr[0] = total;
    arr[1] = symbol;
    //console.log(arr)
    symbolData.push(arr);
    count++;
  }

  // Sort symbols by total values
  symbolData.sort(function(a, b) {
    return a[0] - b[0];
  });

  xcoor = 0;
  ycoor = 50;
  count = 0;
  // print for debug purposes
  for (var i = 0; i < symbolData.length; i++) {
    if (count * 12 + 20 > canvas.width) {
      count = 0;
    }

    if (count == 0) {
      ycoor += 10;
    }

    xcoor = count * 12 + 20;
    ctx.fillText(symbolData[i][1], xcoor, ycoor);

    count++;
  }

  // Take 20 symbols
  var interval = Math.floor(symbolData.length / symbols.length);
  var index = 0;
  for (var i = 0; i < symbols.length - 1 && index < symbolData.length; i++) {
    symbols[i] = symbolData[index][1];
    ctx.fillText(symbols[i], i * 10 + 20, 90);
    index += interval;
  }

  symbols[symbols.length - 1] = symbolData[symbolData.length - 1][1];
  console.log(symbols);
  //pixels.reverse();
  ctx.fillText(symbols[symbols.length - 1], 15 * 6, 110);
}

function getBrightness(imgData) {
  var count = 1;
  var total = 0;
  for (var k = 0; k < imgData.data.length; k += 4) {
    total +=
      0.2126 * imgData.data[k] +
      0.7152 * imgData.data[k + 1] +
      0.0722 * imgData.data[k + 2];
    count++;
  }

  return [total, count];
}

function getVideo() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(localMediaStream => {
        console.log(localMediaStream);
        video.src = window.URL.createObjectURL(localMediaStream);
        video.play();
      })
      .catch(err => {
        console.error("Please enable your webcam", err);
      });
  }
}

function takePhoto() {
  const data1 = canvas.toDataURL("image/jpeg");
  console.log(data1);
  var link = document.createElement("a");
  link.href = data1;
  link.setAttribute("download", "matrix");
  link.innerHTML = `<img src="${data1}"/>`;
  strip.insertBefore(link, strip.firstChild);
}

video.addEventListener("canplay", setup());
