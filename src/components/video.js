import React from "react"

const Video = React.forwardRef((props, ref) => {


  return (<video ref={ref} className="video" />)
}
)
export default Video