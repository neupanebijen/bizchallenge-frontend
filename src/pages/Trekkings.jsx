import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ContentBox from "../components/ContentBox"

import Image from "../assets/SliderContrast1.JPG"
import Footer from "../components/Footer"

import { getAPage } from "../api/expeditions"

import SecondPageComponent from "../components/NewSecondPageComponent"
import ExpeditionDetails from "../components/ExpeditionDetails"

const Trekkings = ({ isAdmin }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const getPageCall = async () => {
      const result = await getAPage("Trekkings")

      setData(result.result)
      console.log(result)
    }

    getPageCall()
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.div exit={{ zIndex: 1, transition: { duration: 0.41, delay: 1 } }}>
      <SecondPageComponent data={{ title: data && data.name, image: Image }}>
        <ContentBox>
          {data !== null && (
            <ExpeditionDetails
              data={data}
              isAdmin={isAdmin}
              isTrekkings={true}
            />
          )}
          <Footer />
        </ContentBox>
      </SecondPageComponent>
    </motion.div>
  )
}

export default Trekkings
