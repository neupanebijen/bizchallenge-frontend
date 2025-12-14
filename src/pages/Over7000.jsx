import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ExpeditionList from "../components/ExpeditionList"
import { useNavigate } from "react-router-dom"
import ContentBox from "../components/ContentBox"

import ThirdPageComponent from "../components/NewSecondPageComponent"
import Image from "../assets/over7000m22.jpg"
import Footer from "../components/Footer"

import { updatePage, getAPage } from "../api/expeditions"

const Over7000 = ({ isAdmin }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const getPageCall = async () => {
      const result = await getAPage("Over 7000m")

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
      >
        <ContentBox id="content">
          {data !== null && (
            <ExpeditionList
              text={data.content}
              title={data.title}
              tag="over7000m"
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

export default Over7000
