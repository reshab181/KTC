import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MyProfile(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path data-name="Path 37809" d="M0 0h24v24H0z" fill="none" />
      <Path
        data-name="Path 37810"
        d="M11 2a9 9 0 109 9 9 9 0 00-9-9zM6.563 16.652c.387-.81 2.745-1.6 4.437-1.6s4.059.792 4.437 1.6a7.133 7.133 0 01-8.874 0zm10.161-1.305c-1.287-1.566-4.41-2.1-5.724-2.1s-4.437.531-5.724 2.1a7.2 7.2 0 1111.448 0zM11 5.6a3.15 3.15 0 103.15 3.15A3.142 3.142 0 0011 5.6zm0 4.5a1.35 1.35 0 111.35-1.35A1.348 1.348 0 0111 10.1z"
        transform="translate(1)"
        fill="#737373"
      />
    </Svg>
  )
}

export default MyProfile;
