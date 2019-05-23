class Symbol {
  constructor(x, y, speed, first) {
    this.x1 = x;
    this.y1 = y;
    this.speed1 = speed;
    this.first1 = first;
    this.average = 0;
  }

  setRandomSymbol(symbolData) {
    var rand = Math.floor(Math.random() * 95);
    this.value = symbolData[rand][1];
  }

  setToVideoSymbol(symbolData) {
    this.value = symbolData[this.average];
  }

  getBrightness(imgData) {
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

  animate(height) {
    this.y1 = this.y1 >= height ? 0 : (this.y1 += this.speed1);
  }
}

export default Symbol;
