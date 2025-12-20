import React from "react"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import { ScaleUp } from "./Animations.jsx"

import Image2 from "../assets/image10.jpg"
import Image1 from "../assets/image2.jpg"
import Image3 from "../assets/image3.jpg"
import Image4 from "../assets/image4.jpg"
import Image5 from "../assets/image11.jpg"
import Image6 from "../assets/image6.jpg"
import Image7 from "../assets/image12.jpg"
import Image8 from "../assets/image13.jpg"
import Image9 from "../assets/image9.jpg"

const SingleExpeditionCard = ({ title, duration, image, index, value }) => {
  const [isInView, setIsInView] = useState(false)
  const [inViewRef, inView] = useInView({
    threshold: window.innerWidth < 900 ? 0.1 : 0.1,
  })
  useEffect(() => {
    if (inView) {
      setIsInView(true)
    }
  }, [inView])

  const [newImage, setNewImage] = useState(Image1)
  useEffect(() => {
    switch (index) {
      case 0:
        setNewImage(Image1)
        break
      case 1:
        setNewImage(Image2)
        break
      case 2:
        setNewImage(Image3)
        break
      case 3:
        setNewImage(Image4)
        break
      case 4:
        setNewImage(Image5)
        break
      case 5:
        setNewImage(Image6)
        break
      case 6:
        setNewImage(Image7)
        break
      case 7:
        setNewImage(Image8)
        break
      case 8:
        setNewImage(Image9)
        break
      default:
        setNewImage(Image1)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <CardContainer
        image={image ? image : newImage}
        ref={inViewRef}
        className={isInView ? "animate child" : ""}
      >
        <BackgroundColor />
        <CardTextSmall>Duration: {value.duration}</CardTextSmall>
        <CardText>{value.name}</CardText>
      </CardContainer>
    </>
  )
}

const CardTextSmall = styled.div`
  color: #fff;

  font-family: "Eskell";
  font-size: 1.6rem;
  z-index: 2;
  text-align: center;
`

const CardText = styled.div`
  color: #fff;

  font-family: "EskellNormal";
  font-weight: bold;
  font-size: 4rem;
  text-align: center;

  width: 100%;
  margin: 0 auto;
  padding-bottom: 2%;
  mix-blend-mode: contrast;
  z-index: 2;
`

const CardContainer = styled.div`
  width: 100%;
  min-height: 35rem;
  margin-top: 1%;
  position: relative;

  background: url("${(props) => props.image}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  cursor: pointer;
  transition: transform 0.2s;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &:hover {
    transform: scale(1.05);
  }

  opacity: 0;

  &.animate {
    animation: 0.5s ${ScaleUp} ease-out forwards;
    animation-delay: 0.1s;
  }
`

const BackgroundColor = styled.div`
  &:before {
    position: absolute;
    content: "";

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    background: rgba(0, 72, 135, 0.3);

    transition: opacity 0.3s ease-in;
  }

  &:hover {
    &:before {
      opacity: 0;
    }
  }
`

export default SingleExpeditionCard
