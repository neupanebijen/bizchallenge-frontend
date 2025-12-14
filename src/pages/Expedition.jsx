import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

import SecondPageComponent from "../components/NewSecondPageComponent"
import Image2 from "../assets/SliderContrast8.JPG"
import Footer from "../components/Footer"
import ExpeditionDetails from "../components/ExpeditionDetails"
import ContentBox from "../components/ContentBox"

import { getAPage } from "../api/expeditions"

const Expedition = ({ isAdmin }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const getPageCall = async () => {
      try {
        const result = await getAPage("Packages")

        setData(result.result)
      } catch {}
    }

    getPageCall()
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.div exit={{ zIndex: 1, transition: { duration: 0.41, delay: 1 } }}>
      <SecondPageComponent data={{ title: data && data.name, image: Image2 }}>
        <ContentBox>
          {data !== null && <ExpeditionDetails data={data} isAdmin={isAdmin} />}
          <Footer />
        </ContentBox>
      </SecondPageComponent>
    </motion.div>
  )
}

export default Expedition
