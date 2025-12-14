import React, { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { ScaleUp } from "./Animations.jsx"
import styled from "styled-components"
import ExpeditionCardImage from "../assets/ExpeditionCardImage.png"

const ExpeditionCard = ({ title, image }) => {
  const [isInView, setIsInView] = useState(false)
  const [inViewRef, inView] = useInView({
    threshold: window.innerWidth < 900 ? 0.1 : 0.1,
  })
  useEffect(() => {
    if (inView) {
      setIsInView(true)
    }
  }, [inView])

  return (
    <>
      <CardContainer
        image={image ? image : ExpeditionCardImage}
        ref={inViewRef}
        className={isInView ? "animate" : ""}
      >
        <BackgroundColor />
        <CardText>{title}</CardText>
        <Flick1 />
        <Flick2 />
      </CardContainer>
    </>
  )
}

const Flick1 = styled.div`
  position: absolute;
  top: 3%;
  left: 3%;
  height: 30px;
  width: 30px;
  border-top: 2px solid #ddd;
  border-left: 2px solid #ddd;

  transition: 0.2s width ease, 0.2s height ease;
`

const Flick2 = styled.div`
  position: absolute;
  bottom: 3%;
  right: 3%;
  height: 30px;
  width: 30px;
  border-right: 2px solid #ddd;
  border-bottom: 2px solid #ddd;

  transition: 0.2s width ease, 0.2s height ease;
`

const CardText = styled.div`
  color: #fff;

  font-family: "Eskell";
  font-size: 4rem;
  text-align: center;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  width: 70%;
  margin: 0 auto;
  z-index: 2;
  transition: top 0.1s ease;

  @media (max-width: 600px) {
    padding-bottom: 0;
  }
`

const CardContainer = styled.div`
  width: 100%;
  min-height: 64rem;
  height: 50vh;
  margin-top: 5%;
  position: relative;

  background: url("${(props) => props.image}");
  background-size: cover;
  background-position: center;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);

    & ${CardText} {
      top: 90%;
      transition: top 0.1s ease;
    }

    & ${Flick1} {
      width: 0;
      height: 0;
      transition: 0.2s width ease, 0.2s height ease;
    }

    & ${Flick2} {
      width: 0;
      height: 0;
      transition: 0.2s width ease, 0.2s height ease;
    }
  }

  @media (max-width: 600px) {
    align-items: center;
    min-height: 40rem;
  }

  opacity: 0;

  &.animate {
    animation: 0.5s ${ScaleUp} ease-out forwards;
  }

  @media (max-width: 1400px) {
    height: 30vh;
    min-height: 45vh;
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

    background: rgba(0, 0, 0, 0.6);

    transition: opacity 0.3s ease-in;
  }

  &:hover {
    &:before {
      opacity: 0;
    }
  }
`
export default ExpeditionCard
