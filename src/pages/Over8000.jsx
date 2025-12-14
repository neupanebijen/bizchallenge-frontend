import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ExpeditionList from "../components/ExpeditionList"
import { useNavigate } from "react-router-dom"
import ContentBox from "../components/ContentBox"

import ThirdPageComponent from "../components/NewSecondPageComponent"
import Image3 from "../assets/over8000m2.jpg"
import Footer from "../components/Footer"

import { updatePage, getAPage } from "../api/expeditions"

const Over8000m = ({ isAdmin }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const getPageCall = async () => {
      const result = await getAPage("Over 8000m")

      setData(result.result)
    }

    getPageCall()
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
        data={{ title: data ? data.name : "Loading", image: Image3 }}
      >
        <ContentBox id="content">
          {data !== null && (
            <ExpeditionList
              text={data.content}
              title={data.title}
              tag="over8000m"
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

export default Over8000m
