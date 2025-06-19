import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function Logout(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G data-name="Group 20279">
        <Path data-name="Path 37910" d="M0 0h24v24H0z" fill="none" />
      </G>
      <G data-name="Group 20280">
        <Path
          data-name="Path 37911"
          d="M17 8l-1.41 1.41L17.17 11H9v2h8.17l-1.58 1.58L17 16l4-4zM5 5h7V3H5a2.006 2.006 0 00-2 2v14a2.006 2.006 0 002 2h7v-2H5z"
          fill="#737373"
        />
      </G>
    </Svg>
  )
}

export default Logout;
