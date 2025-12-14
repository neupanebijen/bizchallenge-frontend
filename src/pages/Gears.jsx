import React from "react"
import styled from "styled-components"
import Gears6000 from "../assets/6000gears.pdf"
import Gears7000 from "../assets/7000gears.pdf"
import Gears8000 from "../assets/8000gears.pdf"

const Gears = () => {
  return (
    <Container>
      <label>Gears for over 6000m</label>
      <a href={Gears6000} target="_blank">
        Download
      </a>
      <label>Gears for over 7000m</label>
      <a href={Gears7000} target="_blank">
        Download
      </a>
      <label>Gears for over 8000m</label>
      <a href={Gears8000} target="_blank">
        Download
      </a>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 5vw;
  font-size: 2rem;
  color: #707070;
  margin-bottom: 4rem;
`

export default Gears
