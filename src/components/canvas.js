import React from "react"


const Canvas = React.forwardRef((props, canvas) => {

    const paintToCanvas = () => {
        this.ctx.drawImage(this.video.current, 0, 0);
        this.matrixify();
        requestAnimationFrame(this.paintToCanvas);
    };

    const matrixify = () => {
        var height = this.canvas.current.height;
        var ctx = this.ctx;
        var symbols = this.symbols;
        var size = this.sfontSize;
        this.streams.forEach(function (stream) {
            stream.symbols.forEach(function (symbol) {
                var imgData = ctx.getImageData(symbol.x1, symbol.y1, 7, size);
                var brightness = symbol.getBrightness(imgData);
                var total = brightness[0] / brightness[1];

                symbol.average = Math.ceil(total / stream.symbols.length);
                symbol.setToVideoSymbol(symbols);
            });
        });

        ctx.clearRect(0, 0, this.canvas.current.width, height);

        this.streams.forEach(function (stream) {
            stream.render(ctx, height);
        });
    };


    return (<canvas
        ref={canvas}
        width="640"
        height="480"
        className="canvas"
    />)
})

export default Canvas