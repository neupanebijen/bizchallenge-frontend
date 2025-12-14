import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { updatePage, getAPage } from "../api/expeditions"
import { motion } from "framer-motion"
import ExpeditionList from "../components/ExpeditionList"
import ContentBox from "../components/ContentBox"

import ThirdPageComponent from "../components/NewSecondPageComponent"
import Image from "../assets/destinationIndia.jpeg"
import Footer from "../components/Footer"

const Destination = ({ isAdmin }) => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, location)

  const [data, setData] = useState(null)

  useEffect(() => {
    const getPageCall = async () => {
      const result = await getAPage("Expedition In India")

      setData(result.result)
    }

    getPageCall()
    window.scrollTo(0, 0)
  }, [])

  const navigator = useNavigate()

  const updatePageCall = async (data) => {
    const result = await updatePage(data)
    if (result.success) {
      navigator(0)
    } else {
      alert("An error has occured")
    }
  }

  return (
    <motion.div exit={{ zIndex: 1, transition: { duration: 0.41, delay: 1 } }}>
      <ThirdPageComponent
        data={{ title: data ? data.name : "Loading", image: Image }}
        backLink="/destination"
      >
        <ContentBox id="content">
          {data !== null && (
            <ExpeditionList
              text={data.content}
              title={data.title}
              tag="India"
              isAdmin={isAdmin}
              data={data}
              updatePage={updatePageCall}
            />
          )}

          <Footer />
        </ContentBox>
      </ThirdPageComponent>
    </motion.div>
  )
}

export default Destination
