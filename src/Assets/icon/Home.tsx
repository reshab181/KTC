import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Home(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path data-name="Path 37825" d="M0 0h24v24H0z" fill="none" />
      <Path
        data-name="Path 37826"
        d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3z"
        fill="#737373"
      />
    </Svg>
  )
}

export default Home;
