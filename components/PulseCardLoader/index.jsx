import React from "react"
import ContentLoader from "react-content-loader"

const PulseCardLoader = (props) => (
  <ContentLoader 
    width={350}
    height={400}
    viewBox="0 0 450 500"
    speed={2}
    backgroundColor="#e9d5ff"
    foregroundColor="#d8b4fe"
    {...props}
  >
    <rect rx="0" ry="0" width="100%" height="100%" />
    </ContentLoader>
)

export default PulseCardLoader;