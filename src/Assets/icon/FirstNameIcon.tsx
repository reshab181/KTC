import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FirstNameIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path data-name="Path 37878" d="M0 0h24v24H0z" fill="none" />
      <Path
        data-name="Path 37879"
        d="M12 2a10 10 0 1010 10A10 10 0 0012 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78a7.925 7.925 0 01-9.86 0zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33a8 8 0 1112.72 0zM12 6a3.5 3.5 0 103.5 3.5A3.491 3.491 0 0012 6zm0 5a1.5 1.5 0 111.5-1.5A1.5 1.5 0 0112 11z"
        fill="#737373"
      />
    </Svg>
  )
}

export default FirstNameIcon;
