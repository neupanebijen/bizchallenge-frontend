import React from "react"
import { FadeUp } from "./Animations.jsx"
import { Link } from "react-router-dom"
import styled from "styled-components"

import InfoSection from "./InfoSection"
import ExpeditionDetailsCard from "./ExpeditionDetailsCard"
import Image1 from "../assets/over7000m.JPG"
import Image2 from "../assets/peakClimbing.HEIC"
import Image3 from "../assets/over8000m.JPG"
import Image4 from "../assets/trekking.JPG"
import Everest from "../assets/Everest.jpeg"
import Makalu from "../assets/Makalu.jpeg"
import Dhaulagiri from "../assets/Dahulagiri.jpeg"
import Manaslu from "../assets/Manaslu.jpeg"
import DestinationNepal from "../assets/destinationNepal.jpeg"
import DestinationChina from "../assets/destinationChina.jpeg"
import DestinationIndia from "../assets/destinationIndia.jpeg"
import DestinationPakistan from "../assets/destinationPakistan.jpeg"
import { updatePage } from "../api/expeditions"

const ExpeditionDetails = ({ data, ...props }) => {
  const currentChildExpeditions = (
    <ExpeditionCardContainer>
      <LinkContainer to="/over8000m">
        <ExpeditionDetailsCard
          title="Expeditions Over 8000m"
          image={Image3}
          {...props}
        />
      </LinkContainer>
      <LinkContainer to="/over7000m">
        <ExpeditionDetailsCard
          title="Expeditions Over 7000m"
          image={Image1}
          {...props}
        />
      </LinkContainer>
      <LinkContainer to="/peakClimbing" state={{ title: "Peak Climbing" }}>
        <ExpeditionDetailsCard
          title="Peak Climbing"
          image={Image2}
          {...props}
        />
      </LinkContainer>
    </ExpeditionCardContainer>
  )

  const currentChildDestinations = (
    <ExpeditionCardContainer>
      <LinkContainer to="/nepal" state={{ title: "Nepal" }}>
        <ExpeditionDetailsCard
          title="Nepal"
          image={DestinationNepal}
          {...props}
        />
      </LinkContainer>
      <LinkContainer to="/india" state={{ title: "India" }}>
        <ExpeditionDetailsCard
          title="India"
          image={DestinationIndia}
          {...props}
        />
      </LinkContainer>
      <LinkContainer to="/pakistan" state={{ title: "Pakistan" }}>
        <ExpeditionDetailsCard
          title="Pakistan"
          image={DestinationPakistan}
          {...props}
        />
      </LinkContainer>
      <LinkContainer to="/china" state={{ title: "China" }}>
        <ExpeditionDetailsCard
          title="Tibet(China)"
          image={DestinationChina}
          {...props}
        />
      </LinkContainer>
    </ExpeditionCardContainer>
  )

  const currentChildTrekkings = (
    <ExpeditionCardContainer isTrekkings={true}>
      <LinkContainer to="/everest">
        <ExpeditionDetailsCard title="Everest " image={Everest} {...props} />
      </LinkContainer>
      <LinkContainer to="/annapurna">
        <ExpeditionDetailsCard title="Annapurna" image={Image1} {...props} />
      </LinkContainer>
      <LinkContainer to="/mustang" state={{ title: "Peak Climbing" }}>
        <ExpeditionDetailsCard title="Mustang" image={Image2} {...props} />
      </LinkContainer>
      <LinkContainer to="/makalu" state={{ title: "Peak Climbing" }}>
        <ExpeditionDetailsCard title="Makalu" image={Makalu} {...props} />
      </LinkContainer>
      <LinkContainer to="/lantang" state={{ title: "Peak Climbing" }}>
        <ExpeditionDetailsCard title="Lantang" image={Image3} {...props} />
      </LinkContainer>
      <LinkContainer to="/dhaulagiri" state={{ title: "Peak Climbing" }}>
        <ExpeditionDetailsCard
          title="Dhaulagiri"
          image={Dhaulagiri}
          {...props}
        />
      </LinkContainer>
      <LinkContainer to="/manaslu" state={{ title: "Peak Climbing" }}>
        <ExpeditionDetailsCard title="Manaslu" image={Manaslu} {...props} />
      </LinkContainer>
      <LinkContainer to="/kanchanjunga" state={{ title: "Peak Climbing" }}>
        <ExpeditionDetailsCard title="Kanchanjunga" image={Image2} {...props} />
      </LinkContainer>
    </ExpeditionCardContainer>
  )

  const updatePageCall = async (data) => {
    const result = await updatePage(data)
    if (result.success) {
      navigator(0)
    } else {
      alert("An error has occured")
    }
  }

  return (
    <>
      <InfoSection
        title={data.title}
        text={data.content}
        data={data}
        showEditor={true}
        updateData={(data) => updatePageCall(data)}
      >
        {props.isTrekkings
          ? currentChildTrekkings
          : props.isDestinations
          ? currentChildDestinations
          : currentChildExpeditions}
      </InfoSection>
      <div style={{ paddingBottom: "5vh" }} />
    </>
  )
}

const LinkContainer = styled(Link)`
  width: 28%;
  margin-top: 0rem;
  text-decoration: none;

  @media (max-width: 600px) {
    width: 100%;
    margin-top: 0rem;
  }
`

const ExpeditionCardContainer = styled.div`
  display: flex;
  justify-content: ${(props) => !props.isTrekkings && "space-between"};
  gap: ${(props) => (!props.isTrekkings ? "0.5rem" : "2.5%")};
  flex-wrap: ${(props) => props.isTrekkings && "wrap"};

  &.animate {
    animation: 0.5s ${FadeUp} ease-out forwards;
    animation-delay: 0.3s;
  }

  & ${LinkContainer} {
    width: ${(props) => props.isTrekkings && "23%"};
  }

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    gap: 2.5%;
    flex-wrap: ${(props) => props.isTrekkings && "wrap"};
    width: 100%;

    & ${LinkContainer} {
      width: 100%;
    }
  }
`
export default ExpeditionDetails
