import styled from "styled-components"
import { AnimatePresence, motion } from "framer-motion"

import Menu from "./Menu"
import useScrollPosition from "../hooks/useScrollPosition"
import DownArrow from "../assets/downArrow.svg"

import useWindowSize from "../hooks/useWindowSize"

const SecondPageComponent = ({ data, image, ...props }) => {
  const scrollY = useScrollPosition()
  const size = useWindowSize()

  return (
    <SecondPage>
      <BackgroundBox
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        {size.width > 700 && scrollY < 40 && (
          <AnimatePresence>
            <MenuWithWidth>
              <Menu color="#004a8c" />
            </MenuWithWidth>
          </AnimatePresence>
        )}

        <SeconPageImageContainer scrollY={scrollY}>
          <PageImage
            src={data && data.image ? data.image : image}
            scrollY={scrollY}
          />
        </SeconPageImageContainer>
        {/* <SeconPageTransformLayer scrollY={scrollY}></SeconPageTransformLayer> */}
        <SecondPageTitle scrollY={scrollY}>
          {data.title ? (
            <TitleContainer size={size} title={data.title} />
          ) : (
            "Loading"
          )}
          {/* {size.width > 700 ? (
            <>
              <span style={{ color: "white" }}>Loadi</span>ng{" "}
            </>
          ) : (
            "Loading"
          )} */}
        </SecondPageTitle>
        <DownArrowImg
          src={DownArrow}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }}
        />
      </BackgroundBox>
      <OtherBox>{props.children}</OtherBox>
      {size.width < 700 && (
        <AnimatePresence>
          <Menu color="#004a8c" />
        </AnimatePresence>
      )}
    </SecondPage>
  )
}

const TitleContainer = ({ title, size }) => {
  return (
    <>
      {/* {title} */}
      {title.split("").map((value, index) => {
        if (index < 5)
          return (
            <span
              key={index}
              style={{ color: size.width > 900 ? "white" : "" }}
            >
              {value}
            </span>
          )
        return <span key={index}>{value}</span>
      })}
    </>
  )
}

const MenuWithWidth = styled.div`
  width: 90vw;
`

const DownArrowImg = styled.img`
  width: 2vw;
  height: 2vw;
  cursor: pointer;

  position: absolute;
  left: 50vw;
  bottom: 3vh;
  z-index: 3;

  transform: translateX(-50%);
  transition: 0.1s transfrom ease;

  &:hover {
    transform: translateX(-50%) scale(1.1);
    transition: 0.1s transfrom ease;
  }

  @media (max-width: 900px) {
    width: 3.5rem;
    height: 3.5rem;
    bottom: 8vh;
    display: block;
  }
`

const SecondPageTitle = styled.h1`
  font-family: "EskellNormal";
  font-size: 6.458vw;
  line-height: 6.501vw;

  position: absolute;
  transition: 0.1s linear;
  will-change: transform;

  top: 50vh;
  left: 9vw;

  width: 100vw;

  -webkit-text-stroke: 0.3rem #fff;
  color: rgba(0, 0, 0, 0);

  transform: translateY(${(props) => props.scrollY * 0.1}px);

  @media (max-width: 900px) {
    -webkit-text-stroke: 0rem #fff;
    font-size: 4rem;
    color: #004a8c;

    left: 3vw;
    top: 43.5vh;

    width: 100vw;
    line-height: 5rem;
  }
`

const PageImage = styled.img`
  width: 110%;
  height: 110%;

  position: absolute;
  top: 0;
  left: 0;

  border: 1px solid tranparent;
  outline: 1px solid transparent;
  will-change: transform;
  backface-visibility: hidden;

  @media (max-width: 900px) {
    width: 100vw;
    height: calc(100vw * 10 / 16);

    transform: translateZ(0);
  }
`

const SeconPageImageContainer = styled.div`
  width: 60vw;
  height: 75vh;

  margin: 0 auto;
  margin-top: 0vh;

  position: absolute;
  top: 15vh;
  left: 20vw;
  overflow: hidden;
  outline: 1px solid transparent;
  border: 1px solid transparent;

  transform: translateY(-${(props) => props.scrollY * 0.3}px) translateZ(0);

  clip-path: ${(props) =>
    `polygon(
      ${10 + props.scrollY * 0.02}% ${10 + props.scrollY * 0.02}%, 

      ${90 - props.scrollY * 0.01}% ${10 + props.scrollY * 0.05}%, 

      ${90 - props.scrollY * 0.02}% ${90 - props.scrollY * 0.01}%,

      ${10 + props.scrollY * 0.01}% ${90 - props.scrollY * 0.01}%
      )
    `};

  will-change: transform;

  overflow: hidden;

  @media (max-width: 900px) {
    width: 100vw;
    height: calc(100vw);
    top: 12vh;
    left: 0vw;

    transform: translateY(-${(props) => props.scrollY * 0.2}px)
      rotateZ(${(props) => props.scrollY * 0.02}deg)
      scale(${(props) => 1 - props.scrollY * 0.0003}) translateZ(0);

    transition: transform 0.2s linear;
    will-change: transform;

    &:before {
      background: none;
    }
  }
`

const OtherBox = styled.div`
  margin-top: 100vh;
  background: #fff;
  opacity: 1;
  z-index: 3;
  position: relative;

  @media (max-width: 900px) {
    margin-top: 51vh;
  }

  @media (max-height: 450px) {
    margin-top: 80vh;
  }
`

const BackgroundBox = styled(motion.div)`
  max-width: 100vw;
  height: 100vh;

  padding: 0vh 5vw;
  position: fixed;

  will-change: transform;
  transfrom: translateZ(0);
  border: 1px solid tranparent;
  outline: 1px solid tranparent;

  @media (max-width: 900px) {
    padding: 0;
  }
`

const SecondPage = styled(motion.div)`
  background: #fff;

  position: relative;
  font-family: "Helvetica";
  color: #fff;

  z-index: 6;
  top: 0;

  left: 0;

  transition: 0.5s transform ease-in-out;

  @media (min-width: 900px) {
    overflow: scroll;
  }

  background-attachment: fixed;
  background-color: #e6e6e6;

  scroll-behavior: smooth;

  @media (max-width: 900px) {
    padding-top: 1rem;
  }
`

export default SecondPageComponent
