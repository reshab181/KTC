import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EmailIcon(props) {
  return (
    <Svg
      data-name="email_black_24dp(1)"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path data-name="Path 37880" d="M0 0h24v24H0z" fill="none" />
      <Path
        data-name="Path 37881"
        d="M22 6a2.006 2.006 0 00-2-2H4a2.006 2.006 0 00-2 2v12a2.006 2.006 0 002 2h16a2.006 2.006 0 002-2zm-2 0l-8 5-8-5zm0 12H4V8l8 5 8-5z"
        fill="#737373"
      />
    </Svg>
  )
}

export default EmailIcon;
