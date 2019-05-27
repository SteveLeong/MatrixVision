import Stream from "./stream"

export const setUp = (canvas, ctx, sfontSize, symbols, symbolData, streams) => {

    clearCTX(canvas, ctx)
    getSymbols(canvas, ctx, sfontSize, symbolData, symbols);
    clearCTX(canvas, ctx)
    var x = 0;
    for (var i = 0; i <= canvas.current.width / sfontSize; i++) {
        var stream = new Stream(canvas.current.height, sfontSize);
        stream.generateSymbols(
            x,
            Math.random() - 500,
            sfontSize,
            symbolData
        );
        streams.push(stream);
        x += sfontSize;
    }

};

const clearCTX = (canvas, ctx) => {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

}

const getSymbols = (canvas, ctx, sfontSize, symbolData, symbols) => {

    ctx.font = "11px monospace";
    ctx.fillStyle = "#00BB00";
    // Get Katakana symbols
    var xcoor = 0;
    var count = 0;
    var ycoor = 10;
    var symbol;

    for (var i = 0; i < 96; i++) {
        // get symbol, 0x30A0 is where Katakana starts
        symbol = String.fromCharCode(0x30a0 + i);

        // if its trying to print off the canvas
        if (count * 12 + 20 > canvas.current.width) {
            count = 0;
            ycoor += 10;
        }

        xcoor = count * 12 + 20;

        ctx.fillText(symbol, xcoor, ycoor);

        // get the 'brightness' of the symbol, Black=000, so brightness is the amount of RGB in the symbol

        var imgData = ctx.getImageData(
            xcoor,
            ycoor - 10,
            7,
            sfontSize - 1
        );

        // total is the total RGB value of the symbol
        var total = 0; //reset
        for (var j = 0; j < imgData.data.length; j += 4) {
            total += imgData.data[j] + imgData.data[j + 1] + imgData.data[j + 2];
        }

        var arr = new Array(2);
        arr[0] = total;
        arr[1] = symbol;
        symbolData.push(arr);
        count++;
    }

    // Sort symbols by total values
    symbolData.sort((a, b) => {
        return a[0] - b[0];
    });

    // Take 25 symbols
    var interval = Math.floor(symbolData.length / symbols.length);
    var index = 0;
    for (
        var k = 0;
        k < symbols.length - 1 && index < symbolData.length;
        k++
    ) {
        symbols[k] = symbolData[index][1];
        // draw them onto empty canvas
        ctx.fillText(symbols[k], k * 10 + 20, 90);
        index += interval;
    }

    // Last symbol is always has biggest total RGB
    symbols[symbols.length - 1] = symbolData[
        symbolData.length - 1
    ][1];

};