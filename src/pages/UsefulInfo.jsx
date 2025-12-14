import React, { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import ContentBox from "../components/ContentBox"

import SecondPageComponent from "../components/NewSecondPageComponent"
import Image from "../assets/SliderContrast9.JPG"
import Footer from "../components/Footer"
import InfoSection from "../components/InfoSection"
import TermsAndConditions from "./TermsAndConditions"
import Visa from "./Visa"
import Gears from "./Gears"
import MountaineeringRoyalty from "./MountaineeringRoyalty"
import TrekkingPermitFees from "./TrekkingPermitFees"
import useScrollPosition from "../hooks/useScrollPosition"

const UsefulInfo = () => {
  const [activeMenu, setActiveMenu] = useState(1)
  const scrollY = useScrollPosition()

  return (
    <motion.div exit={{ zIndex: 1, transition: { duration: 0.41, delay: 1 } }}>
      <SecondPageComponent data={{ title: "Useful Info", image: Image }}>
        <ContentBox>
          <InfoSection title="List of Useful Information" text="" />
          <MenuContainer scrollY={scrollY}>
            <MenuItem
              className={activeMenu === 0 && "active"}
              onClick={() => setActiveMenu(0)}
            >
              Terms and conditions
            </MenuItem>
            <MenuItem
              className={activeMenu === 1 && "active"}
              onClick={() => setActiveMenu(1)}
            >
              Visa
            </MenuItem>
            <MenuItem
              className={activeMenu === 2 && "active"}
              onClick={() => setActiveMenu(2)}
            >
              FAQ
            </MenuItem>
            <MenuItem
              className={activeMenu === 3 && "active"}
              onClick={() => setActiveMenu(3)}
            >
              Mountaineering royalty
            </MenuItem>
            <MenuItem
              className={activeMenu === 4 && "active"}
              onClick={() => setActiveMenu(4)}
            >
              Trekking permit fees
            </MenuItem>
          </MenuContainer>
          <TextContainer>
            {activeMenu === 0 && <TermsAndConditions />}
            {activeMenu === 1 && <Visa />}
            {activeMenu === 2 && <Gears />}
            {activeMenu === 3 && <MountaineeringRoyalty />}
            {activeMenu === 4 && <TrekkingPermitFees />}
          </TextContainer>
          <Footer />
        </ContentBox>
      </SecondPageComponent>
    </motion.div>
  )
}

const TextContainer = styled.div`
  max-width: 100vw;
  position: relative;

  @media (min-width: 900px) {
    margin-top: 10vh;
  }
`

const MenuItem = styled.div`
  position: relative;
  font-weight: bold;
  font-family: "MinionPro";
  width: 25%;

  cursor: pointer;
  padding: 1rem 4rem;

  display: flex;
  justify-content: center;

  &:before {
    content: "";
    position: absolute;

    top: 20%;
    bottom: 20%;
    left: 50%;
    right: 100%;
    background: #004a8c;
    z-index: 11;
  }

  &.active {
    background: #fff;

    &:before {
      position: relative;
    }
  }

  @media (max-width: 900px) {
    font-size: 1.6rem;
    text-align: left;
    padding: 2rem 0;

    width: 100vw;
  }
`

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #e6e6e6;
  z-index: 3;
  width: 100vw;

  transition: position 0.3s;

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: -20vw;
    right: -20vw;
    bottom: 0;
    background: #e6e6e6;
  }

  color: #707070;
  font-size: 1.6rem;
  margin-bottom: 4rem;

  @media (max-width: 900px) {
    width: 100vw;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border-top: 1px solid #e6e6e6;
    margin-bottom: 2rem;
  }

  @media (min-width: 900px) {
    position: ${(props) => (props.scrollY > 830 ? "fixed" : "absolute")};
    top: ${(props) => (props.scrollY > 830 ? 0 : "18vh")};
  }
`

export default UsefulInfo
