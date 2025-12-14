import React from "react"
import styled, { keyframes } from "styled-components"
import { motion } from "framer-motion"
import Logo from "./Logo"

const PageChangeAnimation = ({ animation, pageChangeColor }) => {
  return (
    <Container
      pageChangeColor={pageChangeColor}
      className={animation ? "animate" : ""}
    >
      <Logo />
    </Container>
  )
}

const animateKeyframe = keyframes`
  0% {
    transform: translateX(-100vw);
  }
  30% {
    transform: translateX(0vw);
  }

  70% {
    transform: translateX(0vw);
  }
  100%{
    transform: translateX(-100vw);
  }
`
const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 1000vh;
  background: ${(props) => props.pageChangeColor};
  z-index: 11;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.05);

  transition: all 0.6s ease;

  display: flex;
  justify-content: center;
  padding-top: 40vh;

  transform: translateX(-100vw) translateZ(0);
  outline: 1px solid transparent;
  will-change: transform;

  &.animate {
    animation: ${animateKeyframe} 1.5s ease-in-out forwards;
  }
`

export default PageChangeAnimation
