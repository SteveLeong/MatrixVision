import Symbol from "./symbol";

class Stream {
  constructor(height, fontSize) {
    this.symbols = [];
    this.totalSymbols = height / fontSize;
    this.speed = Math.random() * 6 + 2;
    this.first = Math.round(Math.random() * 3) === 1;
  }

  generateSymbols(x, y, fontSize, symbolData) {
    for (var i = 0; i <= this.totalSymbols; i++) {
      var symbol = new Symbol(x, y, this.speed, this.first, symbolData);

      symbol.setRandomSymbol(symbolData);
      this.symbols.push(symbol);

      y -= fontSize;
      this.first = false;
    }
  }

  render(ctx, height) {
    this.symbols.forEach((symbol) => {
      if (symbol.first) {
        ctx.fillStyle = "#09ff08";
      } else {
        ctx.fillStyle = "#00a800";
      }
      ctx.fillText(symbol.value, symbol.x1, symbol.y1);
      symbol.animate(height);
    });
  }
}

export default Stream;
