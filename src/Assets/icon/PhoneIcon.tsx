import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PhoneIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path data-name="Path 37901" d="M0 0h24v24H0z" fill="none" />
      <Path
        data-name="Path 37902"
        d="M17 1.01L7 1a2.006 2.006 0 00-2 2v18a2.006 2.006 0 002 2h10a2.006 2.006 0 002-2V3a2 2 0 00-2-1.99zM17 19H7V5h10z"
        fill="#737373"
      />
    </Svg>
  )
}

export default PhoneIcon;
