import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

import ContentBox from "../components/ContentBox"

import SecondPageComponent from "../components/NewSecondPageComponent"
import Image from "../assets/SliderContrast1.JPG"
import ExpeditionDetails from "../components/ExpeditionDetails"
import Footer from "../components/Footer"

import { getAPage } from "../api/expeditions"

const Destinations = ({ isAdmin }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const getPageCall = async () => {
      const result = await getAPage("Destinations")

      console.log(result)
      setData(result.result)
    }

    getPageCall()
  }, [])

  return (
    <motion.div exit={{ zIndex: 1, transition: { duration: 0.41, delay: 1 } }}>
      {data !== null && (
        <SecondPageComponent data={{ title: data.name, image: Image }}>
          <ContentBox id="content">
            {data !== null && (
              <ExpeditionDetails
                data={data}
                isDestinations={true}
                isAdmin={isAdmin}
              />
            )}
            <Footer />
          </ContentBox>
        </SecondPageComponent>
      )}
    </motion.div>
  )
}

export default Destinations
