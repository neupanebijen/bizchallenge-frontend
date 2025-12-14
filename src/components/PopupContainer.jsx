import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

const PopupContainer = styled(motion.div)`
  position: aboslute;
  top: 100vh;
  right: 0;
  bottom: -100vh;
  left: 0;
  z-index: 100;

  background: rgba(0, 0, 0, 0.3);
`

const Popup = styled(motion.div)`
  position: fixed;

  width: 90vw;
  height: 82.5vh;
  max-height: 82.5vh;
  background: #fff;

  top: 108.5vh;
  left: 5vw;

  background: rgba(255, 255, 255, 1);
  color: #004a85;
`

export default PopupContainer
