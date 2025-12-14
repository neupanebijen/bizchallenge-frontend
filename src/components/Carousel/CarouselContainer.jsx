import React, { useState, useMemo } from "react"
import cn from "classnames"
import styled, { keyframes } from "styled-components"
import { motion } from "framer-motion"
import "./styles.css"

import Image1 from "../../assets/Slider1.JPG"

import Slider1 from "../../assets/SliderContrast15.JPG"
import Slider3 from "../../assets/SliderContrast1.JPG"
import Slider2 from "../../assets/SliderContrast3.JPG"
import Slider4 from "../../assets/SliderContrast9.JPG"
import Slider5 from "../../assets/SliderContrast14.jpg"
import useWindowSize from "../../hooks/useWindowSize"

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-vertical-carousel-component-in-react
 */

let data = [
  {
    key: 1,
    content: Slider5,
  },
  {
    key: 2,
    content: Slider1,
  },
  {
    key: 3,
    content: Slider3,
  },
  {
    key: 4,
    content: Slider2,
  },
  {
    key: 5,
    content: Slider4,
  },
  {
    key: 6,
    content: Slider3,
  },
]

// const animateMainClipPath = keyframes`

//   100% {
//     clip-path: polygon(20% 0%, 80% 0, 90% 100%, 10% 100%);
//   }
// `

// const animateUpperClipPath = keyframes`

//   100% {
//     clip-path: polygon(10% 0%, 90% 0, 100% 100%, 0% 100%);
//   }
// `

// const animateLowerClipPath = keyframes`

//     clip-path: polygon(30% 0%, 70% 0, 80% 100%, 20% 100%);

// `
// saving width for later

const SlideCard = styled(motion.div)`
  position: relative;
  width: ${(props) => (props.lowerMenuActive ? "60vw" : "40vw")};
  padding: ${(props) => (props.lowerMenuActive ? "6rem 0" : "0")};

  height: 60vh;

  opacity: ${(props) => {
    if (props.index < 0 || props.index > 4) return "0"
  }};
  cursor: pointer;

  clip-path: ${(props) =>
    `polygon(
    15% 10%,
    25% 8%,
    35% 6.5%,
    45% 5%,
    55% 4%,
    65% 4%,
    70% 4.25%,
    75% 4.50%,
    80% 5%,
    85% 5.50%,
    90% 6%,
    95% 6.50%,
    100% 7%,
    90% 99%,
    75% 97.5%,
    60% 96.5%,
    50% 96.25%,
    40% 96.5%,
    25% 97.25%,
    10% 98.2%,
    0% 99%
  )`};

  transition: width 0.2s linear, padding 0.2s linear, clip-path 1s;
  will-change: width, padding;

  &.mainItem {
    clip-path: polygon(20% 0%, 80% 0, 90% 100%, 10% 100%);
  }
  &.upperItem {
    clip-path: polygon(10% 0%, 90% 0, 100% 100%, 0% 100%);
  }

  &.lowerItem {
    clip-path: polygon(30% 0%, 70% 0, 80% 100%, 20% 100%);
  }

  @media (max-width: 1500px) {
    height: 65vh;
    width: ${(props) => (props.lowerMenuActive ? "65vw" : "43vw")};
  }

  @media (max-width: 900px) {
    clip-path: none;
    width: 100vw;
    height: calc(90vw * 7 / 16);
    max-height: 37.5vh;
    z-index: 1;
    top: 0;

    @media (min-height: 900px) {
      height: calc(90vw * 8 / 16);
    }

    @media (max-height: 580px) {
      height: calc(70vw * 9 / 16);
    }
  }

  @media (max-width: 600px) {
    clip-path: none;
    width: 100vw;
    height: calc(90vw * 10 / 16);
    z-index: 1;
    top: 0;

    @media (min-height: 900px) {
      height: calc(90vw * 9 / 16);
    }

    @media (max-height: 580px) {
      height: calc(70vw * 9 / 16);
    }
  }
`

const VerticalCarousel = ({
  activeIndex,
  navigatePage,
  changePageData,
  lowerMenuActive,
  size,
}) => {
  // Usd to determine the height/spacing of each item
  const itemHeight = window.innerHeight * 0.58
  const itemWidth = window.innerWidth * 1
  // Used to determine which items should be visible. this prevents the "ghosting" animation
  const visibleStyleThreshold = 50

  const determinePlacement = (itemIndex) => {
    // If these match, the item is active
    if (activeIndex === itemIndex) return 0

    return size.width > 900
      ? size.width > 1500
        ? (itemIndex - activeIndex) * itemHeight
        : (itemIndex - activeIndex) * (itemHeight + itemHeight * 0.1)
      : (itemIndex - activeIndex) * (itemWidth - itemWidth * 0)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="carousel"
    >
      <div className="slides">
        <div className="carousel-inner">
          {data.map((item, i) => (
            <CardComponent
              data={data}
              activeIndex={activeIndex}
              i={i}
              item={item}
              determinePlacement={determinePlacement}
              lowerMenuActive={lowerMenuActive}
              changePageData={changePageData}
              visibleStyleThreshold={visibleStyleThreshold}
              size={size}
              navigatePage={navigatePage}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const CardComponent = ({
  data,
  activeIndex,
  i,
  determinePlacement,
  item,
  lowerMenuActive,
  changePageData,
  visibleStyleThreshold,
  size,
  navigatePage,
}) => {
  const cardAnimationY = useMemo(() => {
    let arr = [25, -10]
    for (let i = 0; i < 10; i++) {
      arr = [...arr, 25, -10]
    }
    return arr
  }, [])

  const imageAnimationY = useMemo(() => {
    let arr = [-25, 10]
    for (let i = 0; i < 10; i++) {
      arr = [...arr, -25, 10]
    }
    return arr
  }, [])

  const getClassName = (activeIndex, i) => {
    if (activeIndex === i) {
      return "mainItem"
    } else if (activeIndex < i) {
      return "upperItem"
    } else if (activeIndex > i) {
      return "lowerItem"
    }

    return ""
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (i === activeIndex) {
          navigatePage(i)
          return
        }
        if (i === data.length - 1 && activeIndex === 0) return
        if (i === 0 && activeIndex === data.length - 1) return
        changePageData(i)
      }}
      className={cn("carousel-item", {
        active: activeIndex === i,
        visible: Math.abs(determinePlacement(i)) <= visibleStyleThreshold,
      })}
      key={item.id}
      style={
        size.width > 900
          ? {
              transform: `translateY(${determinePlacement(i)}px) translateX(${
                lowerMenuActive
                  ? -30
                  : activeIndex - i === 0
                  ? 0
                  : activeIndex - i > 0
                  ? 5
                  : -7
              }vw) scale(${lowerMenuActive ? 1 : activeIndex === i ? 1 : 0.8})`,
              opacity: `${
                i === 0
                  ? 0
                  : activeIndex === i
                  ? 1
                  : activeIndex - i === 1
                  ? 0.3
                  : activeIndex - i === -1
                  ? 0.3
                  : 0.3
              }`,
            }
          : {
              transform: `translateX(${determinePlacement(i)}px)`,
              opacity: `${
                activeIndex === i
                  ? 1
                  : activeIndex - i === 1
                  ? 1
                  : activeIndex - i === -1
                  ? 1
                  : 1
              }`,
            }
      }
    >
      <SlideCard
        lowerMenuActive={lowerMenuActive}
        className={lowerMenuActive && getClassName(activeIndex, i)}
        i={i}
        activeIndex={activeIndex}
        animate={{ y: cardAnimationY }}
        transition={{
          type: "linear",
          repeat: "Infinity",
          duration: 70,
        }}
      >
        <motion.img
          src={item.content}
          style={{
            height: "117%",
            width: "100%",
            minWidth: "100%",
            opacity: 1,
          }}
          animate={{
            y: imageAnimationY,
          }}
          transition={{
            type: "linear",
            repeat: "Infinity",
            duration: 70,
          }}
        />
      </SlideCard>
    </button>
  )
}

const Image = styled(motion.img)``

// }translateX(${i > activeIndex ? 200 : 100}px)

export default VerticalCarousel
