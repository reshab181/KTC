import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DobIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path data-name="Path 37882" d="M0 0h24v24H0z" fill="none" />
      <Path
        data-name="Path 37883"
        d="M12 6a2 2 0 002-2 1.9 1.9 0 00-.29-1.03L12 0l-1.71 2.97A1.9 1.9 0 0010 4a2.006 2.006 0 002 2zm6 3h-5V7h-2v2H6a3 3 0 00-3 3v9a1 1 0 001 1h16a1 1 0 001-1v-9a3 3 0 00-3-3zm1 11H5v-3a3.444 3.444 0 002.4-1.01l1.09-1.07 1.07 1.07a3.543 3.543 0 004.89 0l1.08-1.07 1.07 1.07A3.444 3.444 0 0019 17v3zm0-4.5a1.909 1.909 0 01-1.35-.57l-2.13-2.13-2.14 2.13a2.006 2.006 0 01-2.77 0L8.48 12.8l-2.14 2.13A1.909 1.909 0 015 15.5V12a1 1 0 011-1h12a1 1 0 011 1z"
        fill="#737373"
      />
    </Svg>
  )
}

export default DobIcon;
