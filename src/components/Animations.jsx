import { keyframes } from "styled-components"

export const FadeInUpText = keyframes`
  0%{opacity: 0;  margin-top: 25vh;}
  100%{opacity: 1;}
`

export const FadeInUpButton = keyframes`
  0%{opacity: 0;  margin-bottom: -5rem}
  100%{opacity: 1;}
`

export const FadeUp = keyframes`
  0%{opacity: 0;  transform: translateY(60px)}
  100%{opacity: 1; transform: translateY(0)}
`

export const ScaleUp = keyframes` 
0%{opacity: 0;  transform: scale(0.5)}
100%{opacity: 1; transform: scale(1)}
`

export const RotateIn = keyframes`
  0%{opacity: 0;transform:  rotate(270deg) scale(0.5)}
  100%{opacity: 1;transform: rotate(360deg) scale(1)}
`

export const SlideRight = keyframes` 
0%{opacity: 1;  transform: translateX(-10vw)}
100%{opacity: 1; transform: translateX(0)}
`

export const Slider = (length) => keyframes` 
0%{transform: translateX(0)}
50%{transform: translateX(-${length * 50}vw)}
100%{transform: translateX(0%)}
`
