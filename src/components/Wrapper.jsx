import React from "react"
import styled from "styled-components"

import Image1 from "../assets/image1.jpg"
import SectionTitle from "./SectionTitle"

const WrapperComponent = ({ title, text, image }) => {
  return (
    <>
      <SectionTitle text={title} />
      <Wrapper>
        <TextBox>
          <p>
            Pioneer Adventure Pvt. Ltd. is a government registered company and a
            trusted brand in mountaineering, peak climbing, trekking and other
            forms of adventure activities in the Himalayas. This company is run
            by elite Sherpa mountaineers and professional guides. It is one of
            the very few companies in Nepal whose most of the guides are well
            trained in First Aid and Mountain Guide Course. The sole purpose of
            this company is to provide professional services to every individual
            and group in the Himalayas who loves to be thrilled with the beauty
            of nature and adventure activities.
          </p>
          <br />
          <p>
            This company is established as per Nepal government’s company Act
            2063, Company Reg. No. 143047/072/073 and tourism license No.
            2004/072 issued by Department of Tourism. The company is also
            legally authorized by Nepal Rastra Bank (NRB), the central bank of
            Nepal in dealing with foreign currency and transaction with
          </p>
        </TextBox>
        <ImageBox src={Image1} />
      </Wrapper>
    </>
  )
}

const ImageBox = styled.img`
  width: 47%;
  margin-left: auto;
  height: 50vh;
  background: #333;
`

const TextBox = styled.div`
  font-size: 1.25vw;
  width: 50%;
  color: #707070;
  font-family: "SegoeUI";
  text-align: justify;
`

const Wrapper = styled.div`
  display: flex;
  padding-top: 8vh;
  max-width: 90vw;
  min-height: 60vh;
  margin-left: auto;
  margin-right: auto;
`

export default WrapperComponent
