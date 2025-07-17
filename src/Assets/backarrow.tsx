import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Backarrow(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path fill="none" d="M0 0H24V24H0z" />
      <Path
        d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z"
        fill="#fff"
      />
    </Svg>
  )
}

export default Backarrow