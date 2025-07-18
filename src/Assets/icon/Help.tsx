import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Help(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} {...props}>
      <Path
        d="M14.938 2.688l2.652-.051C20 3 20 3 21.785 4.305 23.868 7.21 23.482 9.565 23 13c-2.438 2.313-2.438 2.313-5 4l-1 2h-5c-.25-2.313-.25-2.313 0-5 1.938-1.625 1.938-1.625 4-3l1-3c-2.756.498-2.756.498-5 2-1.666.04-3.334.043-5 0 .896-5.676 2.101-7.287 7.938-7.313zM14.563 21.938L17 22c.563 1.938.563 1.938 1 4-1 1-1 1-3.563 1.063L12 27c-.563-1.938-.563-1.938-1-4 1-1 1-1 3.563-1.063z"
        fill="#9B9B9B"
      />
    </Svg>
  )
}

export default Help;
