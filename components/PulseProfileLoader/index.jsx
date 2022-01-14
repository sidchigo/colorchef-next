import React from "react"
import ContentLoader from "react-content-loader"

const PulseProfileLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={476}
    height={124}
    viewBox="0 0 476 124"
    backgroundColor="#e9d5ff"
    foregroundColor="#d8b4fe"
    {...props}
  >
    <rect x="185" y="26" rx="3" ry="3" width="282" height="20" /> 
    <rect x="186" y="58" rx="3" ry="3" width="163" height="13" /> 
    <circle cx="101" cy="64" r="59" /> 
    <rect x="186" y="84" rx="3" ry="3" width="100" height="30" />
  </ContentLoader>
)

export default PulseProfileLoader;


