import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Menu(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        data-name="Icon material-menu"
        d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
        transform="translate(-141 -40) translate(141 40)"
        fill="#fff"
      />
    </Svg>
  )
}

export default Menu;
