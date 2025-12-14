import React, { useMemo } from "react"
import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation, useNavigate } from "react-router-dom"
import useIntro from "../hooks/useIntro"

import Menu from "../components/Menu"
import Loading from "../components/Loading"
import Carousel from "../components/Carousel/CarouselContainer"

import Image1 from "../assets/image1.jpg"
import Image2 from "../assets/image2.jpg"
import Image4 from "../assets/image4.jpg"
import Image6 from "../assets/image6.jpg"
import Image7 from "../assets/image7.jpg"
import video3 from "../assets/video3.mp4"
import video4 from "../assets/video4.mp4"
import video5 from "../assets/video5.mp4"
import video6 from "../assets/video6.mp4"
import video7 from "../assets/video7.mp4"
import DownArrow from "../assets/downArrow.svg"
import useWindowSize from "../hooks/useWindowSize"

import { faA, faArrowDown } from "@fortawesome/free-solid-svg-icons"

const Home = ({ setPageChangeColor }) => {
  const location = useLocation()
  const pageNumber = 0

  const size = useWindowSize()

  const pageData = useMemo(
    () => [
      {
        title: "Pioneer Adventure",
        subTitle: "Summit Your Challenges...",
        text: "",
        buttons: [
          {
            title: "Find Your Adventure",
            text: "Find Your Adventure",
            image: Image6,
            link: "packages",
          },
          {
            title: "Contact Us",
            text: "Contact Us",
            image: Image7,
            link: "contactUs",
          },
        ],
        image: Image1,
        video: video3,
        background: "",
        titleColor: "#004a8c",
        textColor: window.innerWidth > 900 ? "#e6e6e6" : "#707070",
        menuColor: "#004a8c",
        key: "0",
      },
      {
        title: "Expedition",
        subTitle: "",
        text: `This tiny Himalayan country offers the best climbing opportunities for those who want to explore the beauty of the mountains. Nepal is home to many high mountains and small peaks, which are ideal for climbers all around the world.
     `,

        buttons: [
          {
            title: "Expedition",
            text: "Learn More",
            image: Image2,
            link: "packages",
          },
        ],
        video: video7,
        background: "#E2ECED",
        titleColor: "#D34634",
        textColor: "#000",
        menuColor: "#000",
        image: Image2,
        key: "1",
      },
      {
        title: "Trekkings",
        subTitle: "",
        text: `This tiny Himalayan country offers the best climbing opportunities for those who want to explore the beauty of the mountains. Nepal is home to many high mountains and small peaks, which are ideal for climbers all around the world.
     `,

        buttons: [
          {
            title: "Trekkings",
            text: "Learn More",
            image: Image2,
            link: "trekkings",
          },
        ],
        video: video7,
        background: "#121D29",
        titleColor: "#EBF0F1",
        textColor: "#fff",
        menuColor: "#fff",
        key: "2",
      },
      {
        title: "Destination",
        subTitle: "",
        text: `Everest Expedition is the most sought-after expedition by people all around the 
      globe. Millions of people have dreams to climb Mount Everest but only half of 
      them find success.`,
        buttons: [
          {
            title: "Destination",
            text: "Learn More",
            image: Image4,
            link: "destination",
          },
        ],
        video: video5,
        background: "#D1DBEE",
        titleColor: "#F77D20",
        textColor: "#000",
        menuColor: "#000",
        image: Image4,
        key: "3",
      },
      {
        title: "Events",
        subTitle: "",
        text: `The key to a successful expedition starts before you even decide to climb. Check out the useful infomation you need to make your dream of summiting the peak of your dream a reality. 
      `,
        buttons: [
          {
            title: "Events",
            text: "Learn More",
            image: Image4,
            link: "events",
          },
        ],
        image: Image4,
        video: video4,
        link: "events",
        background: "#121D29",
        titleColor: "#EBF0F1",
        textColor: "#fff",
        menuColor: "#fff",
        key: "4",
      },

      {
        title: "Useful Info",
        subTitle: "",
        text: `Himalayas people dream of climbing is spread across various countries. Find out where the mountain you wish to climb is located. `,
        buttons: [
          {
            title: "Useful Info",
            text: "Learn More",
            image: Image4,
            link: "usefulInfo",
          },
        ],
        image: Image4,
        background: "rgb(0,0,0)",
        titleColor: "#F9F200",
        textColor: "#fff",
        menuColor: "#fff",
        video: video6,
        key: "5",
      },
    ],
    []
  )

  const initial1 =
    size.width < 900 ? { opacity: 0.5, scale: 0.5 } : { opacity: 0.5, y: 100 }
  const animate =
    size.width < 900 ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 }
  const exit1 =
    size.width < 900
      ? { opacity: 0, scale: 0.5, transition: { duration: 0.3 } }
      : {
          y: -100,
          opacity: 0,
          transition: { duration: 0.3 },
        }

  const [indexPositive, setIndexPositive] = useState(true)
  const transition = { duration: 0.5, delay: 0 }

  const [data, setData] = useState(pageData[pageNumber])
  const [pageIndex, setPageIndex] = useState(0)
  const [lowerMenuActive, setLowerMenuActive] = useState(false)
  const [wheelActive, setWheelActive] = useState(true)
  const [touchActive, setTouchActive] = useState(true)
  const [touchTrack, setTouchTrack] = useState(0)
  const [aniTrack, setAniTrack] = useState(0)

  const showAnimation = useIntro()

  useEffect(() => {
    location.state && setPageIndex(location.state.pageNumber)
    location.state && setData(pageData[location.state.pageNumber])
  }, [])

  useEffect(() => {
    setPageChangeColor(data.titleColor)
  }, [pageIndex])

  const changePageData = (indexValue) => {
    setData(pageData[indexValue])
    setPageIndex(indexValue)
  }

  const lowerMenuClicked = (e, indexValue) => {
    setData(pageData[indexValue])
    setPageIndex(indexValue)
  }

  const onMouseEnter = (indexValue) => {
    // if (pageIndex === indexValue) {
    //   return
    // }
    if (lowerMenuActive == false) {
      setTimeout(() => {
        setData(pageData[indexValue])
        setPageIndex(indexValue)
      }, 1000)
      setLowerMenuActive(true)
      return
    }

    setData(pageData[indexValue])
    setPageIndex(indexValue)
  }

  const onMouseLeave = (index) => {
    setLowerMenuActive(false)
  }

  // scroll behavior
  const scrollPage = (value, e = "") => {
    if (value < 0 && pageIndex === 0) return
    if (value > 0 && pageIndex === pageData.length - 1) return
    if (!wheelActive) return
    setWheelActive(false)
    setTimeout(() => setWheelActive(true), 900)
    if (value > 0) {
      setIndexPositive(true)
      changePageData(pageIndex + 1)
      return
    }

    setIndexPositive(true)
    changePageData(pageIndex - 1)
  }

  const scrollOnGesture = (e) => {
    if (size.width > 900) {
      if (!touchActive) return
      let pageCoordinate = e.touches[0].pageY
      if (e.type === "touchstart") {
        setTouchTrack(pageCoordinate)
        return
      }
      if (pageCoordinate - touchTrack > 0 && pageIndex === 0) return
      if (pageCoordinate - touchTrack < 0 && pageIndex === pageData.length - 1)
        return

      setTouchActive(false)
      setTimeout(() => setTouchActive(true), 900)
      if (pageCoordinate - touchTrack < 0) {
        if (pageIndex === pageData.length - 1) {
          setIndexPositive(true)
          changePageData(0)
          return
        }
        setIndexPositive(true)
        changePageData(pageIndex + 1)
        return
      }

      if (pageIndex === 0) {
        setIndexPositive(false)
        changePageData(pageData.length - 1)
        return
      }

      setIndexPositive(true)
      changePageData(pageIndex - 1)
    }
    if (!touchActive) return
    let pageCoordinate = e.touches[0].pageX
    if (e.type === "touchstart") {
      setTouchTrack(pageCoordinate)
      return
    }
    if (pageCoordinate - touchTrack > 0 && pageIndex === 0) return
    if (pageCoordinate - touchTrack < 0 && pageIndex === pageData.length - 1)
      return

    setTouchActive(false)
    setTimeout(() => setTouchActive(true), 900)
    if (pageCoordinate - touchTrack < 0) {
      if (pageIndex === pageData.length - 1) {
        setIndexPositive(true)
        changePageData(0)
        return
      }
      setIndexPositive(true)
      changePageData(pageIndex + 1)
      return
    }

    if (pageIndex === 0) {
      setIndexPositive(false)
      changePageData(pageData.length - 1)
      return
    }

    setIndexPositive(true)
    changePageData(pageIndex - 1)
  }

  // navigate Page
  const navigate = useNavigate()

  const navigatePage = (index) => {
    navigate(data.buttons[0].link)
  }

  console.log(lowerMenuActive)

  return (
    <motion.div
      style={{ height: "100vh" }}
      exit={{ zIndex: 1, transition: { duration: 0.41, delay: 1 } }}
    >
      {size.width > 900 && (
        <Loading
          showAnimation={showAnimation}
          showVideo={pageIndex === 0}
          videoToShow={video3}
          pageIndex={pageIndex}
          background={data.background}
        />
      )}
      {size.width < 900 && (
        <Menu
          changePageData={changePageData}
          loadThirdPage={() => {}}
          hideMenu={pageIndex === 0 ? false : true}
          isHomePage={true}
          color={data.menuColor}
        />
      )}
      <motion.div
        onWheel={(e) => scrollPage(e.deltaY)}
        onTouchStart={(e) => scrollOnGesture(e)}
        onTouchMove={(e) => scrollOnGesture(e)}
      >
        <Container
          data={data}
          initial={window.innerWidth > 900 && showAnimation && { opacity: 0 }}
          animate={window.innerWidth > 900 && showAnimation && { opacity: 1 }}
          transition={
            window.innerWidth > 900 &&
            showAnimation && { delay: 2, duration: 2 }
          }
        >
          {size.width > 900 && (
            <Menu
              changePageData={changePageData}
              loadThirdPage={() => {}}
              hideMenu={pageIndex === 0 ? false : true}
              isHomePage={true}
              color={data.menuColor}
            />
          )}
          <AnimatePresence exitBeforeEnter>
            <HeroMainContainer key={data.key}>
              {pageIndex === 0 ? (
                <DownArrowImg
                  src={DownArrow}
                  onClick={() => changePageData(1)}
                />
              ) : (
                ""
              )}
              <HeroTitle
                initial={size.width && initial1}
                animate={animate}
                key={data.key + 100}
                transition={transition}
                exit={exit1}
                style={{ originX: "0" }}
                className="title"
              >
                {data.title}
              </HeroTitle>
              <HeroSubTitle
                initial={size.width && initial1}
                animate={animate}
                key={data.key + 200}
                transition={transition}
                exit={exit1}
                isMobile={size.width > 900 ? false : true}
                style={{ originX: "0" }}
              >
                {data.subTitle}
              </HeroSubTitle>
              {pageIndex !== 0 && (
                <HeroText
                  initial={initial1}
                  animate={animate}
                  key={data.key + 300}
                  transition={transition}
                  exit={exit1}
                  className="text"
                  style={{ originX: "0" }}
                >
                  {data.text}
                </HeroText>
              )}

              {/* button section */}
              <ButtonContainer
                className={pageIndex === 0 ? "alignBottom" : ""}
                initial={size.width && initial1}
                animate={animate}
                transition={transition}
                exit={exit1}
                style={{ originX: "0" }}
              >
                {data.buttons.map((data, index) =>
                  data.link === "contactUs" ? (
                    <a
                      href="contactUs"
                      as={motion(Link)}
                      target={data.link === "contactUs" && "_blank"}
                      style={{
                        textDecoration: "none",
                        color: "#004a85",
                      }}
                      key={data.key + index + 500}
                    >
                      <HeroButton
                        style={{ textDecoration: "none" }}
                        key={`${pageIndex}${index}`}
                        className={
                          data.title === "Find Your Adventure"
                            ? "marginTop button"
                            : "button"
                        }
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.01 },
                          exit: { transition: { duration: 0.1 } },
                        }}
                      >
                        {data.text}
                      </HeroButton>
                    </a>
                  ) : (
                    <Link
                      to={data.link}
                      as={motion.div}
                      target={data.link === "contactUs" && "_blank"}
                      style={{
                        textDecoration: "none",
                        color: "#004a85",
                      }}
                      key={data.key + index + 500}
                    >
                      <HeroButton
                        style={{ textDecoration: "none" }}
                        key={`${pageIndex}${index}`}
                        className={
                          data.title === "Find Your Adventure"
                            ? "marginTop button"
                            : "button"
                        }
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.01 },
                          exit: { transition: { duration: 0.1 } },
                        }}
                      >
                        {data.text}
                      </HeroButton>
                    </Link>
                  )
                )}
              </ButtonContainer>
              {/* video section */}
            </HeroMainContainer>
          </AnimatePresence>
        </Container>

        {/* Video Section of the website */}
        <AnimatePresence exitBeforeEnter>
          {data.video && size.width < 900 ? (
            <VideoContainer
              background={data.titleColor}
              style={{ originX: 0 }}
              initial={
                size.width < 900
                  ? {
                      scale: 0,
                    }
                  : { rotateX: -90, rotateZ: 5, scale: 0.8 }
              }
              animate={
                size.width < 900
                  ? {
                      scale: 1,
                    }
                  : { rotateX: 0, rotateZ: 0, scale: 1 }
              }
              key={data.key + 600}
              transition={transition}
              exit={
                size.width < 900
                  ? {
                      scale: 0,
                      transition: { duration: 0.5 },
                    }
                  : {
                      rotateX: 90,
                      rotateZ: 5,
                      scale: 0.8,
                    }
              }
              whileHover={{
                width: "30vw",
                height: "40vh",
                boxShadow: "0px 0px 15px rgba(0,0,0,0.25)",
              }}
              className="video"
            >
              <motion.video
                src={data.video}
                key={data.key}
                autoPlay
                loop
                muted
                style={{
                  objectFit: "fill",
                  width: "100%",
                  height: "100%",
                  minWidth: size.height < 580 ? "110%" : "100%",
                  minHeight: size.height < 580 ? "110%" : "100%",
                  border: `4px solid ${data.titleColor}`,
                }}
                onClick={() => navigatePage(pageIndex)}
                loading="lazy"
              />
            </VideoContainer>
          ) : pageIndex !== 0 ? (
            <VideoContainer
              background={data.titleColor}
              initial={
                indexPositive
                  ? { rotateX: -90, rotateZ: 5, scale: 0.8 }
                  : { rotateX: 90, rotateZ: -5, scale: 0.8 }
              }
              animate={{ rotateX: 0, rotateZ: 0, scale: 1 }}
              key={data.key + 600}
              transition={transition}
              exit={
                indexPositive
                  ? {
                      rotateX: 90,
                      rotateZ: 5,
                      scale: 0.8,
                    }
                  : {
                      rotateX: -90,
                      rotateZ: -5,
                      scale: 0.8,
                    }
              }
              whileHover={{
                width: "30vw",
                height: "40vh",
                boxShadow: "0px 0px 15px rgba(0,0,0,0.25)",
              }}
              className="video"
              onClick={() => navigatePage(pageIndex)}
            >
              <video
                src={data.video}
                autoPlay
                loop
                muted
                style={{
                  objectFit: "fill",
                  width: "111%",
                  height: "111%",
                  outline: `none`,
                  border: "none",
                }}
              />
            </VideoContainer>
          ) : (
            ""
          )}
        </AnimatePresence>

        {/* Lower Menu */}
        {size.width > 900 ? (
          pageIndex !== 0 && (
            <LowerMenu
              onMouseLeave={() => onMouseLeave()}
              onMouseEnter={() => {
                setLowerMenuActive(true)
              }}
              lowerMenuActive={lowerMenuActive}
              key={data.key}
            >
              {/* Animation */}

              <LowerMenuLink
                to="/"
                className={pageIndex === 1 ? "active" : ""}
                onClick={(e) => lowerMenuClicked(e, 1)}
                onMouseEnter={() => {
                  onMouseEnter(1)
                }}
                lowerMenuActive={lowerMenuActive}
                titleColor={data.titleColor}
              >
                <LowerMenuText className={lowerMenuActive && "textAnimation"}>
                  Expedition
                </LowerMenuText>
                <LowerMenuIcon
                  lowerMenuActive={lowerMenuActive}
                  leftLength={8.8}
                  delay={0}
                  className={lowerMenuActive && "lowerAnimate"}
                />
              </LowerMenuLink>
              <LowerMenuLink
                to="/"
                className={pageIndex === 2 ? "active" : ""}
                onClick={(e) => lowerMenuClicked(e, 2)}
                onMouseEnter={() => {
                  onMouseEnter(2)
                }}
                lowerMenuActive={lowerMenuActive}
                titleColor={data.titleColor}
              >
                <LowerMenuText className={lowerMenuActive && "textAnimation"}>
                  Trekkings
                </LowerMenuText>
                <LowerMenuIcon
                  lowerMenuActive={lowerMenuActive}
                  leftLength={8.2}
                  delay={0.5}
                  className={lowerMenuActive && "lowerAnimate"}
                />
              </LowerMenuLink>
              <LowerMenuLink
                to="/"
                className={pageIndex === 3 ? "active" : ""}
                onClick={(e) => lowerMenuClicked(e, 3)}
                onMouseEnter={() => {
                  onMouseEnter(3)
                }}
                lowerMenuActive={lowerMenuActive}
                titleColor={data.titleColor}
              >
                <LowerMenuText className={lowerMenuActive && "textAnimation"}>
                  Destinations
                </LowerMenuText>
                <LowerMenuIcon
                  lowerMenuActive={lowerMenuActive}
                  leftLength={10.3}
                  delay={1}
                  className={lowerMenuActive && "lowerAnimate"}
                />
              </LowerMenuLink>
              <LowerMenuLink
                to="/"
                className={pageIndex === 4 ? "active" : ""}
                onClick={(e) => lowerMenuClicked(e, 4)}
                onMouseEnter={() => {
                  onMouseEnter(4)
                }}
                lowerMenuActive={lowerMenuActive}
                titleColor={data.titleColor}
              >
                <LowerMenuText className={lowerMenuActive && "textAnimation"}>
                  Events
                </LowerMenuText>
                <LowerMenuIcon
                  lowerMenuActive={lowerMenuActive}
                  leftLength={6}
                  delay={1.5}
                  className={lowerMenuActive && "lowerAnimate"}
                />
              </LowerMenuLink>
              <LowerMenuLink
                to="/"
                className={pageIndex === 5 ? "active" : ""}
                onClick={(e) => lowerMenuClicked(e, 5)}
                onMouseEnter={() => {
                  onMouseEnter(5)
                }}
                lowerMenuActive={lowerMenuActive}
                titleColor={data.titleColor}
              >
                <LowerMenuText className={lowerMenuActive && "textAnimation"}>
                  Useful Info
                </LowerMenuText>
                <LowerMenuIcon
                  lowerMenuActive={lowerMenuActive}
                  leftLength={10}
                  delay={2}
                  className={lowerMenuActive && "lowerAnimate"}
                />
              </LowerMenuLink>
            </LowerMenu>
          )
        ) : (
          <LowerMenu key={data.key}>
            <LowerMenuLink
              to="/"
              className={pageIndex === 0 ? "active" : ""}
              titleColor={data.titleColor}
              onClick={() => changePageData(0)}
            >
              <LowerMenuIcon lowerMenuActive={lowerMenuActive} key={data.key} />
            </LowerMenuLink>
            <LowerMenuLink
              to="/"
              className={pageIndex === 1 ? "active" : ""}
              titleColor={data.titleColor}
              onClick={() => changePageData(1)}
            >
              <LowerMenuIcon lowerMenuActive={lowerMenuActive} />
            </LowerMenuLink>
            <LowerMenuLink
              to="/"
              className={pageIndex === 2 ? "active" : ""}
              titleColor={data.titleColor}
              onClick={() => changePageData(2)}
            >
              <LowerMenuIcon lowerMenuActive={lowerMenuActive} />
            </LowerMenuLink>
            <LowerMenuLink
              to="/"
              className={pageIndex === 3 ? "active" : ""}
              titleColor={data.titleColor}
              onClick={() => changePageData(3)}
            >
              <LowerMenuIcon lowerMenuActive={lowerMenuActive} />
            </LowerMenuLink>
            <LowerMenuLink
              to="/"
              className={pageIndex === 4 ? "active" : ""}
              titleColor={data.titleColor}
              onClick={() => changePageData(4)}
            >
              <LowerMenuIcon lowerMenuActive={lowerMenuActive} />
            </LowerMenuLink>
          </LowerMenu>
        )}

        {/* Page Cover */}
        {size.width > 900 && (
          <PageCover className={lowerMenuActive && "animate"} />
        )}

        <AnimatePresence>
          {size.width > 900 ? (
            pageIndex !== 0 && (
              <Carousel
                activeIndex={pageIndex}
                navigatePage={navigatePage}
                setActiveIndex={(index) => setPageIndex(index)}
                pageIndex={pageIndex}
                changePageData={(index) => changePageData(index)}
                lowerMenuActive={lowerMenuActive}
                size={size}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )
          ) : (
            <Carousel
              activeIndex={pageIndex}
              navigatePage={navigatePage}
              changePageData={(index) => changePageData(index)}
              lowerMenuActive={lowerMenuActive}
              size={size}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

const LowerMenuAnimator = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  margin-top: 1.3rem;
  margin-left: auto;
  z-index: 14;
`

const LowerMenuAnimatorLine = styled.div`
  width: 0.9rem;
  height: 2.5rem;
  background: #000;
  border-radius: 20%;
  z-index: 4;

  @media (max-width: 900px) {
    width: 2rem;
    height: 0.9rem;
  }
`

const upAndDown = keyframes`
    0%{transform: translateY(0);}
    50%{transform: translateY(-1.5vh);}
    100%{transform: translateY(0vh);}
`

const DownArrowImg = styled.img`
  width: 3.5rem;
  position: fixed;
  bottom: 5vh;
  left: 50vw;
  cursor: pointer;

  animation: 3s ${upAndDown} infinite;

  @media (max-width: 900px) {
    display: none;
  }
`

const PageCover = styled.div`
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  opacity: 0;
  z-index: -1;
  transition: opacity 1s;

  &.animate {
    opacity: 1;
    z-index: 2;
  }
`

const LowerMenuIcon = styled.div`
  width: 0.9rem;
  height: 2.5rem;
  background: ${(props) => (props.lowerMenuActive ? "#fff" : "#999")};
  border-radius: 20%;
  z-index: 3;

  position: absolute;
  right: 0rem;

  &:before {
    position: absolute;
    content: "";
    right: 0rem;
    left: ${(props) =>
      props.lowerMenuActive ? `-${props.leftLength}rem` : "1rem"};

    opacity: ${(props) => (props.lowerMenuActive ? 0 : 1)};
    transition: left 0.5s linear, opacity 0.1s linear 0.5s;

    height: 100%;
    background: #fff;
    z-index: 4;
    border-radius: 20% 7.5% 7.5% 20%;
  }

  &:after {
    position: absolute;
    content: "";
    right: 0rem;
    left: ${(props) =>
      props.lowerMenuActive ? `1rem` : `-${props.leftLength}rem`};

    opacity: ${(props) => (props.lowerMenuActive ? 1 : 0)};

    transition: left 0.2s linear 0.7s, opacity 0.01s linear 0.5s;

    height: 100%;
    background: #fff;
    z-index: 4;
    border-radius: 20% 7.5% 7.5% 20%;
  }

  @media (max-width: 900px) {
    width: 2rem;
    height: 0.9rem;
  }
`

const LowerMenuText = styled.div`
  color: #fff;
  font-size: 1.041vw;
  font-family: "HelveticaBold";

  transform: translateX(50%);
  -webkit-transform: translateX(50%);
  opacity: 0;
  z-index: 3;
  margin-right: 1vw;

  transition: 0.5s transform ease-out;
  -webkit-transition: 0.5s transform ease-out;

  @media (max-width: 900px) {
    display: none;
  }
`

const lowerAni = keyframes`
    0%{width: 0.9rem;}
    50%{width: 13.5rem;}
    100%{width: 0.9rem;}
`

const LowerMenuLink = styled.div`
  text-decoration: none;
  display: flex;
  gap: 1.5rem;
  cursor: pointer;
  margin-top: 1.3rem;
  margin-left: auto;
  z-index: 12;

  &.active {
    & ${LowerMenuText} {
      color: #ffc400;

    }
    & ${LowerMenuIcon} {
      background: ${(props) =>
        props.lowerMenuActive ? "#ffc400" : props.titleColor};

  }

  &:hover {
    & ${LowerMenuText} {
      color: #ffc400;
    }

    & ${LowerMenuIcon} {
      background: #ffc400;
    }
  }

  @media (max-width: 900px) {
    gap: 0rem; 
  }
`

const LowerMenu = styled.div`
  position: fixed;
  top: 50vh;
  right: 5vw;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 5;

  ${(props) =>
    props.lowerMenuActive &&
    `
    & ${LowerMenuText} {
      opacity: 1;
      transform: translateX(0);
  
      transition: 0.1s opacity, 0.1s color;

  
      transition-delay: 0.5s;

      z-index: 3;
    }
  
    & + .imageContainer {
      top: 0;
    }`}

  @media (max-width: 900px) {
    top: 17vw;
    flex-direction: row;
    left: 50vw;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);

    @media (max-height: 580px) {
      top: 9vh;
    }
  }

  @media (max-height: 450px) {
    display: none;
  }
`

const VideoContainer = styled(motion.div)`
  width: 17vw;
  height: 20vh;

  overflow: hidden;
  box-sizing: border-box;
  z-index: 2;
  position: fixed;
  left: 5vw;
  border: 4px solid ${(props) => props.background};

  @media (max-width: 1600px) {
    bottom: 1vh;
  }

  @media (min-width: 1600px) {
    bottom: 5vh;
  }

  @media (max-width: 1600px) {
    left: 3vw;
  }

  @media (max-width: 900px) {
    width: 30vw;
    height: 12vh;
    box-sizing: border-box;
    top: 51vh;
    left: 2vw;
    z-index: 3;
    border: none;

    @media (min-height: 900px) {
      top: 35vh;
    }
    @media (min-height: 930px) {
      top: 47vh;
      width: 30vw;
    }
  }

  @media (max-width: 600px) {
    width: 40vw;
    height: 12vh;
    box-sizing: border-box;
    top: 38.5vh;
    left: 2vw;
    z-index: 3;

    @media (min-height: 900px) {
      top: 35vh;
    }
    @media (min-height: 930px) {
      top: 47vh;
      width: 30vw;
    }
  }

  @media (max-width: 400px) {
    top: 43vh;

    @media (max-height: 580px) {
      height: 15vh;
      overflow: visible;
      top: 36vh;
    }
  }

  @media (max-height: 450px) {
    top: 50vh;
    left: 48vw;
    width: 50vw;
    height: 45vh;
  }
`

const ButtonContainer = styled(motion.div)`
  margin-top: 0vw;
`

const HeroButton = styled(motion.div)`
  width: 16vw;
  padding: 0.5208vw 0rem;
  font-size: 1vw;
  font-family: "SilkaRm";

  margin-top: 1vw;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 3px solid #004a85;
  border-radius: 20rem;

  cursor: pointer;

  transition: 0.3s transform;
  -webkit-transition: 0.3s transform;

  &.marginTop {
    margin-top: 14vw;
  }

  @media (max-width: 1600px) {
    &.marginTop {
      margin-top: 7vw;
    }

    @media (max-height: 1100px) {
      &.marginTop {
        margin-top: 3vw;
      }
    }
  }

  @media (max-width: 1600px) {
    font-size: 1.4vw;
  }

  @media (max-width: 1100px) {
    font-size: 1.4vw;
    width: 18vw;
  }

  @media (max-width: 900px) {
    font-size: 1.6rem;
    width: 53vw;
    padding: 2vw 0rem;
    margin-top: 2vw;

    @media (min-height: 930px) {
      font-size: 2.6vw;

      width: 40vw;
      padding: 1vw 0;
    }

    @media (max-height: 580px) {
      font-size: 1.4rem;
      line-height: 1.4rem;

      padding: 0.5rem 0;
      width: 45vw;
    }
  }

  @media (max-height: 450px) {
    width: 27vw;
  }
`

const HeroText = styled(motion.div)`
  font-size: 1.148vw;
  margin: 1rem 0;
  font-family: "SilkaRm";

  @media (max-width: 1600px) {
    font-size: 1.4vw;
  }

  @media (max-width: 1100px) {
    font-size: 1.7vw;
  }

  @media (max-width: 900px) {
    font-size: 1.6rem;
    margin-top: 2vw;

    @media (min-height: 930px) {
      font-size: 2.6vw;
    }

    @media (max-height: 580px) {
      font-size: 1.4rem;
      line-height: 1.4rem;
    }
  }
`

const HeroSubTitle = styled(motion.div)`
  font-family: "SilkaRm";
  font-size: 1.97916vw;
  margin-top: 2vh;

  color: ${(props) => (props.isMobile ? "#707070" : "#e6e6e6")};

  @media (max-width: 1600px) {
    font-sizee: 2.3vw;
  }

  @media (max-width: 1100px) {
    font-size: 2.5vw;
  }

  @media (max-width: 900px) {
    font-size: 2rem;
    margin-top: 0;

    @media (min-height: 930px) {
      font-size: 3.5vw;
    }

    @media (max-height: 580px) {
      font-size: 1.6rem;
      line-height: 1.6rem;
    }
  }
`

const HeroTitle = styled(motion.div)`
  font-family: "EskellNormal";
  font-size: 6.458vw;
  line-height: 6.51vw;

  @media (max-width: 1600px) {
    font-size: 7vw;
    line-height: 7vw;
  }

  @media (max-width: 1100px) {
    font-size: 9vw;
    line-height: 9vw;
  }

  @media (max-width: 900px) {
    font-size: 5rem;
    line-height: 5rem;

    @media (min-height: 930px) {
      font-size: 9vw;
      line-height: 9vw;
    }

    @media (max-height: 580px) {
      font-size: 3.5rem;
      line-height: 3.5rem;
    }
  }
`

const HeroMainContainer = styled.div`
  width: 40vw;
  margin-top: 3vw;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;

  @media (max-width: 900px) {
    width: 100%;
    position: fixed;
    top: 60vh;

    @media (min-height: 930px) {
      top: 58vh;
    }
  }

  @media (max-width: 400px) {
    top: 55vh;

    @media (max-height: 580px) {
      top: 50vh;
    }
  }

  @media (max-height: 450px) {
    top: 10vh;
  }
`

const Container = styled(motion.div)`
  width: 100vw;
  height: 100vh;

  padding: 0 5vw;
  z-index: 1;

  border-left: 1rem solid
    ${(props) => (props.data.titleColor ? props.data.titleColor : "#004a8c")};

  background-size: cover;
  overflow: hidden;

  position: relative;
  font-family: "Helvetica";
  max-height: 100vh;
  box-sizing: border-box;
  background: ${(props) =>
    props.data.background ? props.data.background : ""};

  transition: background 1s, border 1s;

  & .title {
    color: ${(props) =>
      props.data.titleColor ? props.data.titleColor : "#004a8c"};

    transition: color 0.01s 0.6s;
  }

  & .text {
    color: ${(props) => (props.data.textColor ? props.data.textColor : "#000")};

    transition: color 0.01s 0.6s;
  }

  & .button {
    color: ${(props) =>
      props.data.textColor ? props.data.textColor : "#004a8c"};

    font-weight: bold;

    border: 2px solid
      ${(props) => (props.data.titleColor ? props.data.titleColor : "#004a8c")};

    transition: color 0.01s 0.6s, border 0.01s 0.6s;
  }

  & .video {
    border: 6px solid
      ${(props) => (props.data.titleColor ? props.data.titleColor : "#004a8c")};
    transition: border 0.01s 0.6s;
  }

  & .menu {
    color: ${(props) =>
      props.data.textColor ? props.data.textColor : "#004a8c"};
  }

  @media (max-width: 1600px) {
    padding: 0 3vw;
  }

  @media (max-width: 900px) {
    padding: 0 1vw;
    border-left: 0;
    overflow: hidden;
  }
`

export default Home
