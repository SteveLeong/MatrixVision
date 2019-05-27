import React from "react"


const Canvas = React.forwardRef((props, canvas) => {

    return (<canvas
        ref={canvas}
        width="640"
        height="480"
        className="canvas"
    />)
})

export default Canvas