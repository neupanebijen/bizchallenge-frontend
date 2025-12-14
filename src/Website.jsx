import { useState, useEffect } from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"

import Menu from "./components/Menu"
import SecondPageComponent from "./components/SecondPageComponent"
import ThirdPageComponent from "./components/ThirdPageComponent"
import Loading from "./components/Loading"

import Background1 from "./assets/background.png"
import Background3 from "./assets/background3.png"
import Background4 from "./assets/background4.png"
import Background5 from "./assets/background5.png"

import Image1 from "./assets/image1.jpg"
import Image2 from "./assets/image2.jpg"
import Image3 from "./assets/image3.JPG"
import Image4 from "./assets/image4.JPG"
import Image5 from "./assets/image2.jpg"
import Image6 from "./assets/image6.jpg"
import Image7 from "./assets/image7.JPG"
import Image8 from "./assets/image7.JPG"
import Image9 from "./assets/image9.JPG"
import video1 from "./assets/video1.mp4"
import video2 from "./assets/video2.mp4"

const pageData = [
  {
    title: "Pioneer Adventure",
    subTitle: "Come Explore the Mountains with us...",
    text: "",
    buttons: [
      {
        title: "Climb a Mountain",
        text: "How Climb a Mountain",
        image: Image5,
      },
      {
        title: "Find Your Adventure",
        text: "Find Your Adventure",
        image: Image6,
      },
      { title: "Contact Us", text: "Contact Us", image: Image7 },
    ],
    image: Image1,
    background: Background1,
  },
  {
    title: "Expedition",
    subTitle: "",
    text: `Everest Expedition is the most sought-after expedition by people all around the 
    globe. Millions of people have dreams to climb Mount Everest but only half of 
    them find success. Climbing and summiting Mount Everest is incredibly inspiring 
    and a matter of personal status and prestige. Standing on the top of the world 
    and gazing at the view of Mt. Lhotse, Mt Makalu, and many other beautiful peaks
    is beyond human imagination and inexpressive. Hence, better planning, well 
    preparation, training and right selection of the organizing company is a must.`,

    buttons: [{ title: "Expedition", text: "Learn More", image: Image2 }],
    video: video1,
    image: Image2,
    background: Background5,
  },
  {
    title: "Our Team",
    subTitle: "",
    buttons: [
      {
        title: "Meet Our Field Staff",
        text: "Meet our Field Staff",
        image: Image8,
      },
    ],
    members: [
      { name: "Member 1", image: Image1 },
      { name: "Member 2", image: Image2 },
      { name: "Member 3", image: Image3 },
      { name: "Member 4", image: Image4 },
      { name: "Member 5", image: Image9 },
      { name: "Member 6", image: Image6 },
    ],
    image: Image6,
    background: Background4,
  },
  {
    title: "Events",
    subTitle: "",
    text: `Everest Expedition is the most sought-after expedition by people all around the 
    globe. Millions of people have dreams to climb Mount Everest but only half of 
    them find success. Climbing and summiting Mount Everest is incredibly inspiring 
    and a matter of personal status and prestige. Standing on the top of the world 
    and gazing at the view of Mt. Lhotse, Mt Makalu, and many other beautiful peaks
    is beyond human imagination and inexpressive. Hence, better planning, well 
    preparation, training and right selection of the organizing company is a must.
    `,
    buttons: [{ title: "Events", text: "Learn More", image: Image4 }],
    video: video2,
    image: Image4,
    background: Background3,
  },
]

const initial = { y: 100, opacity: 0.5 }
const animate = { y: 0, opacity: 1 }
const exit = { y: -100, opacity: 0, transition: { duration: 0.5 } }
const transition = { duration: 0.75, delay: 0 }

const Website = () => {
  const [data, setData] = useState(pageData[0])
  const [pageIndex, setPageIndex] = useState(0)
  const [currentImage, setCurrentImage] = useState(data.image)
  const [showSecondPage, setShowSecondPage] = useState(false)
  const [showThirdPage, setShowThirdPage] = useState(false)
  const [thirdPageData, setThirdPageData] = useState("")
  const [secondPageData, setSecondPageData] = useState("")

  useEffect(() => {
    setCurrentImage(data.image)
  }, [data])

  const changePageData = (index) => {
    setData(pageData[index])
    setPageIndex(index)
  }

  const lowerMenuClicked = (e, index) => {
    setData(pageData[index])
    setPageIndex(index)
  }

  const onMouseEnter = (index) => {
    setData(pageData[index])
    setPageIndex(index)
  }

  const onMouseLeave = (index) => {}

  const loadSecondPage = (data) => {
    setShowSecondPage(true)
    setSecondPageData(data)
  }

  const unloadSecondPage = () => {
    setShowSecondPage(false)
  }

  const loadThirdPage = (data) => {
    setShowThirdPage(true)
    setThirdPageData(data)
  }

  const unloadThirdPage = () => {
    setShowThirdPage(false)
  }

  // scroll behavior
  const scrollPage = (value) => {
    // if (value > 0) {
    //   if (pageIndex === pageData.length - 1) {
    //     changePageData(0)
    //     return
    //   }
    //   changePageData(pageIndex + 1)
    //   return
    // }
    // if (pageIndex === 0) {
    //   changePageData(pageData.length - 1)
    //   return
    // }
    // changePageData(pageIndex - 1)
  }

  return (
    <>
      <Loading />
      <Container
        pageIndex={pageIndex}
        initial={{ y: "100vh" }}
        animate={{ y: 0 }}
        transition={{ delay: 2.2, duration: 1 }}
        onWheel={(e) => scrollPage(e.deltaY)}
        background={data.background}
      >
        <Menu changePageData={changePageData} loadThirdPage={loadThirdPage} />
        <AnimatePresence exitBeforeEnter>
          <HeroMainContainer key={pageIndex}>
            <HeroTitle
              initial={initial}
              animate={animate}
              key={pageIndex}
              transition={transition}
              exit={exit}
            >
              {data.title}
            </HeroTitle>
            <HeroSubTitle
              initial={initial}
              animate={animate}
              key={pageIndex}
              transition={transition}
              exit={exit}
            >
              {data.subTitle}
            </HeroSubTitle>
            <HeroText
              initial={initial}
              animate={animate}
              key={pageIndex}
              transition={transition}
              exit={exit}
            >
              {data.text}
            </HeroText>
            {data.title === "Our Team" ? (
              <HeroImageCircleContainer
                initial={initial}
                animate={animate}
                key={pageIndex}
                transition={{ duration: 1 }}
                exit={exit}
              >
                {data.members.map((value, index) => (
                  <HeroImageCircle
                    key="index"
                    onClick={() =>
                      loadThirdPage({ title: value.name, image: value.image })
                    }
                  >
                    <img
                      src={value.image}
                      width="100%"
                      height="100%"
                      alt="Image"
                    />
                  </HeroImageCircle>
                ))}
              </HeroImageCircleContainer>
            ) : (
              ""
            )}
            {data.buttons.map((data, index) => (
              <HeroButton
                key={`${pageIndex}${index}`}
                className={data.title === "Climb a Mountain" ? "marginTop" : ""}
                onClick={() => loadSecondPage(data)}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={transition}
                exit={{ y: -100, opacity: 0, transition: { duration: 0.2 } }}
                whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
              >
                <div style={{ display: "flex" }}>{data.text}</div>
              </HeroButton>
            ))}
            <motion.div
              initial={initial}
              animate={animate}
              key={pageIndex}
              transition={transition}
              exit={exit}
            >
              {data.video ? (
                <video
                  src={data.video}
                  autoPlay
                  loop
                  muted
                  style={{
                    width: "17vw",
                    height: "8vw",
                    borderRadius: "20%",
                    padding: 0,
                    margin: 0,
                    overflow: "hidden",
                    marginTop: "10vh",
                  }}
                />
              ) : (
                ""
              )}
            </motion.div>
          </HeroMainContainer>
        </AnimatePresence>
        <LowerMenu onMouseLeave={() => onMouseLeave()}>
          <LowerMenuLink
            to="/"
            className={pageIndex === 0 ? "active" : ""}
            onClick={(e) => lowerMenuClicked(e, 0)}
            onMouseEnter={() => onMouseEnter(0)}
          >
            <LowerMenuText>Home</LowerMenuText>
            <LowerMenuIcon />
          </LowerMenuLink>
          <LowerMenuLink
            to="/"
            className={pageIndex === 1 ? "active" : ""}
            onClick={(e) => lowerMenuClicked(e, 1)}
            onMouseEnter={() => onMouseEnter(1)}
          >
            <LowerMenuText>Expedition</LowerMenuText>
            <LowerMenuIcon />
          </LowerMenuLink>
          <LowerMenuLink
            to="/"
            className={pageIndex === 2 ? "active" : ""}
            onClick={(e) => lowerMenuClicked(e, 2)}
            onMouseEnter={() => onMouseEnter(2)}
          >
            <LowerMenuText>Our Team</LowerMenuText>
            <LowerMenuIcon />
          </LowerMenuLink>
          <LowerMenuLink
            to="/"
            className={pageIndex === 3 ? "active" : ""}
            onClick={(e) => lowerMenuClicked(e, 3)}
            onMouseEnter={() => onMouseEnter(3)}
          >
            <LowerMenuText>Events</LowerMenuText>
            <LowerMenuIcon />
          </LowerMenuLink>
        </LowerMenu>
        <AnimatePresence exitBeforeEnter>
          <ImageContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={pageIndex}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
          >
            <Image src={currentImage} />
          </ImageContainer>
        </AnimatePresence>
      </Container>

      <SecondPageComponent
        showSecondPage={showSecondPage}
        unloadSecondPage={unloadSecondPage}
        data={secondPageData}
      />

      <ThirdPageComponent
        showThirdPage={showThirdPage}
        unloadThirdPage={unloadThirdPage}
        data={thirdPageData}
      />
    </>
  )
}

const LowerMenuIcon = styled.div`
  width: 0.9rem;
  height: 2.5rem;
  background: #fff;
  border-radius: 20%;
  z-index: 3;
`

const LowerMenuText = styled.div`
  color: #fff;
  font-size: 2rem;
  font-family: "HelveticaBold";

  transform: translateX(50%);
  opacity: 0;
  z-index: 3;

  transition: 0.5s transform ease-out;
`

const LowerMenuLink = styled.div`
  text-decoration: none;
  display: flex;
  gap: 1.5rem;
  cursor: pointer;
  margin-top: 1.3rem;
  margin-left: auto;

  &.active {
    & ${LowerMenuText} {
      color: #ffc400;
    }
    & ${LowerMenuIcon} {
      background: #ffc400;
    }
  }

  &:hover {
    & ${LowerMenuText} {
      color: #ffc400;
    }
    & ${LowerMenuIcon} {
      background: #ffc400;
    }
  }
`

const LowerMenu = styled.div`
  position: fixed;
  top: 50vh;
  right: 6vw;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &:before {
    content: "";
    position: fixed;

    background: #004a85;
    top: -50vh;
    left: -100vw;
    right: -10vw;
    bottom: -50vh;

    transform: translateX(100%);
    transition: 0.3s transform ;

    z-index: 2;
    pointer-events: none;
  }

  &:hover {
    & ${LowerMenuText} {
      opacity: 1;
      transform: translateX(0);

      transition: 0.3s transform ease-out, 0.1s opacity;
      transition-delay: 0.1s;
      z-index: 3;
    }
    &:before {
      transform translateX(0); 
      z-index: 2;
    }

    & + .imageContainer {
      top: 0;
    }
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
`

const ImageContainer = styled(motion.div)`
  position: absolute;

  top: 22.5vh;
  right: 10vw;
  height: 65vh;
  width: 40vw;
  overflow: hidden;

  background: #dadada;
  border-radius: 1rem;

  transform: rotateX(10deg) rotateY(30deg) rotateZ(0);
  transition: 0.3s transform ease;
  -moz-transition: 0.3s transform ease;
  overflow: hidden;

  ${LowerMenu}:hover ~ & {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0) translateX(-50%)
      translateY(-10%) scaleX(1.3);
    transition: 0.3s transform ease;
    -moz-transition: 0.3s transform ease;
    transition-delay: 0.1s;
  }
`

const HeroImageCircleContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4rem;
  margin-bottom: 4vh;
`

const HeroImageCircle = styled(motion.div)`
  width: 24%;
  height: 8vw;

  border-radius: 50%;
  overflow: hidden;
  margin-top: 2vh;
  cursor: pointer;

  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`

const HeroButton = styled(motion.div)`
  width: 30rem;
  padding: 1rem 0rem;
  font-size: 2.1rem;
  font-family: "HelveticaBold";

  margin-top: 2vh;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 4px solid #004a85;
  border-radius: 20rem;

  cursor: pointer;
  margin-top: 2rem;

  transition: 0.3s transform;

  &:hover {
    color: #fff;
    background: #004a85;
    transform: scale(1.1);

    transition: 0.3s transform;
  }

  &.marginTop {
    margin-top: 13vh;
  }
`

const HeroText = styled(motion.div)`
  font-size: 2.2rem;
  color: #111;
  font-weight: bold;
  margin: 1rem 0;
`

const HeroSubTitle = styled(motion.div)`
  font-family: "HelveticaBold";
  font-size: 3.8rem;
  color: #656565;
  margin-top: 2vh;
`

const HeroTitle = styled(motion.div)`
  font-family: "AlfaSlab";
  font-size: 12.4rem;
  line-height: 12.5rem;
`

const HeroMainContainer = styled.div`
  width: 40vw;
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
`

const Container = styled(motion.div)`
  width: 100vw;
  height: 100vh;

  padding: 0 6vw;
  z-index: 1;

  border-left: 1rem solid #004a85;

  background: rgba(0, 0, 0, 0);
  background-size: cover;
  overflow: hidden;

  position: relative;
  font-family: "Helvetica";
  color: #004a85;
  max-height: 100vh;
`

export default Website
