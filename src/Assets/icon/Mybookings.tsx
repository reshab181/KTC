import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Mybooking(props) {
  return (
    <Svg
      data-name="My bookings"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path data-name="Rectangle 4620" fill="none" d="M0 0H24V24H0z" />
      <Path
        data-name="Path 37912"
        d="M22 5.18L10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10zm-2.21 5.04A7.995 7.995 0 1112 4a7.921 7.921 0 014.28 1.25l1.44-1.44A9.9 9.9 0 0012 2a10.027 10.027 0 109.4 6.61z"
        fill="#737373"
      />
    </Svg>
  )
}

export default Mybooking;
