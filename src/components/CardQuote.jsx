import * as React from "react"

const SvgCardQuote = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <clipPath id="cardQuote_svg__a">
        <path
          data-name="Rectangle 775"
          fill={props.fill}
          d="M0 0h109.255v83.194H0z"
        />
      </clipPath>
    </defs>
    <g data-name="Group 1561" clipPath="url(#cardQuote_svg__a)">
      <path
        data-name="Path 4088"
        d="M48.848 83.193H0V41.215q0-10.472 3.76-17.393a35.782 35.782 0 0 1 9.759-11.508 52.5 52.5 0 0 1 13.355-7.357Q34.233 2.176 41.43-.001l7.2 13.081a74.023 74.023 0 0 0-9.321 4.2 26.914 26.914 0 0 0-6.326 4.633 15.7 15.7 0 0 0-3.6 5.723 22.636 22.636 0 0 0-1.144 7.578h20.61Zm60.407 0H60.516V41.215q0-10.473 3.76-17.393a36.048 36.048 0 0 1 9.708-11.508 51.553 51.553 0 0 1 13.3-7.358q7.357-2.78 14.554-4.957l7.307 13.081a74.023 74.023 0 0 0-9.321 4.2 26.914 26.914 0 0 0-6.324 4.631 15.674 15.674 0 0 0-3.6 5.723 22.637 22.637 0 0 0-1.144 7.578h20.5Z"
        fill={props.fill}
      />
    </g>
  </svg>
)

export default SvgCardQuote
