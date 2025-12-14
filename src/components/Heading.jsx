import React from "react"
import styled from "styled-components"

const Heading = styled.div`
  width: 100%;
  font-family: "SegoeUI";
  font-size: 5.3rem;
  color: #808080;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  font-weight: bold;

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  @media (max-width: 600px) {
    font-size: 4.6rem;
  }
`

const HeadingText = styled.div``

const BlueText = styled.span`
  color: rgba(0, 73, 135);
`

const IconImage = styled.img`
  @media (max-width: 600px) {
    width: 10rem;
  }
`

const HeadingComponent = ({ Icon, altImage, whiteText, blueText }) => {
  return (
    <Heading>
      <IconImage src={Icon} alt={altImage} />
      <HeadingText>
        {whiteText} <BlueText>{blueText}</BlueText>
      </HeadingText>
    </Heading>
  )
}

export default HeadingComponent
