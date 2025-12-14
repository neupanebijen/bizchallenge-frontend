import React from "react"
import { FadeInUpText } from "./Animations"
import styled from "styled-components"

const SectionTitleContainer = ({ text }) => {
  return (
    <SectionTitle>
      {text.split(" ").map((value, index) =>
        index === 0 ? (
          <span key={index} className="underline">
            {value}{" "}
          </span>
        ) : (
          <span key={index}>{value} </span>
        )
      )}
    </SectionTitle>
  )
}

const SectionTitle = styled.h2`
  font-family: "MinionPro";
  max-width: 90vw;
  margin: 0 auto;
  font-size: 3.4375vw;
  @media (max-width: 900px) {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  color: #707070;

  & .underline {
    position: relative;
    &:before {
      content: "";
      position: absolute;
      top: 100%;
      bottom: -0.35rem;
      left: 0;
      right: 10%;
      background: #004a8c;
    }
  }

  &.animate {
    animation: 0.5s ${FadeInUpText} ease-out forwards;
  }

  @media (max-width: 600px) {
    font-size: 3rem;

    & .underline {
      &:before {
        top: 90%;
        bottom: 5%;
      }
    }
  }
`

export default SectionTitleContainer
