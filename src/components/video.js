const paintToCanvas = () => {
  this.ctx.drawImage(this.video, 0, 0);
  this.matrixify();
  requestAnimationFrame(this.paintToCanvas);
};

const matrixify = () => {
  var height = this.canvas.height;
  var ctx = this.ctx;
  var symbols = this.symbols;
  var size = this.sfontSize;
  this.streams.forEach(function(stream) {
    stream.symbols.forEach(function(symbol) {
      var imgData = ctx.getImageData(symbol.x1, symbol.y1, 7, size);
      var brightness = symbol.getBrightness(imgData);
      var total = brightness[0] / brightness[1];

      symbol.average = Math.ceil(total / stream.symbols.length);
      symbol.setToVideoSymbol(symbols);
    });
  });

  ctx.clearRect(0, 0, this.canvas.width, height);

  this.streams.forEach(function(stream) {
    stream.render(ctx, height);
  });
};

const takePhoto = () => {
  const data1 = this.canvas.toDataURL("image/jpeg");
  console.log(data1);
  var link = document.createElement("a");
  link.href = data1;
  link.setAttribute("download", "matrix");
  link.innerHTML = `<img src="${data1}"/>`;
  this.strip.insertBefore(link, this.strip.firstChild);
  document.querySelector(".strip").scrollIntoView({
    behavior: "smooth"
  });
};
