import React from "react"
import { motion } from "framer-motion"
import ContentBox from "../components/ContentBox"

import ThirdPageComponent from "../components/NewThirdPageComponent"
import Image from "../assets/image15.jpg"
import Footer from "../components/Footer"

const HowToClimbAMountain = () => {
  return (
    <motion.div>
      <ThirdPageComponent
        data={{ title: "How to Climb a mountain", image: Image }}
        backLink="/"
      >
        <ContentBox style={{ paddingBottom: 0 }} id="content"></ContentBox>
        <Footer />
      </ThirdPageComponent>
    </motion.div>
  )
}

export default HowToClimbAMountain
