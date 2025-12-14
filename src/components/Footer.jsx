import React from "react"
import styled from "styled-components"
import { HashLink as Link } from "react-router-hash-link"

import Location from "../assets/location.svg"
import Phone from "../assets/phone.svg"
import Email from "../assets/email.svg"
import Facebook from "../assets/facebook.svg"
import Instagram from "../assets/instagram.svg"
import Twitter from "../assets/twitter.svg"
import Whatsapp from "../assets/whatsapp.svg"
import Tripadvisor from "../assets/tripadvisor.svg"
import FooterImg from "../assets/footer.jpg"

const WidthContainer = styled.div`
  max-width: 90vw;

  @media (max-width: 1300px) {
    max-width: 90vw;
  }
`

const OuterContainer = styled.div`
  position: relative;

  z-index: 1;
  padding-top: 2vh;
`

// With background
// const OuterContainer = styled.div`
//   position: relative;

//   z-index: 1;
//   padding-top: 2vh;
//   height: 55vh;

//   &:before {
//     position: absolute;
//     content: "";

//     width: 100%;
//     height: 100%;
//     top: 0;
//     left: 0;
//     background: url("${FooterImg}");
//     background-size: 100% auto;
//     z-index: -1;
//   }
//   &:after {
//     position: absolute;
//     content: "";

//     width: 100%;
//     height: 100%;
//     top: 0;
//     left: 0;
//     background: rgba(255, 255, 255, 0.5);
//     z-index: -1;
//   }
// `

const Container = styled(WidthContainer)`
  padding: 0 0 5vh 0;
  margin: 0 auto;
  font-family: "SegoeUI";

  position: relative;

  display: flex;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 30%;

  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 5rem;
  }
`

const UsefulLinks = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  align-items: flex-start;
  padding-left: 5%;

  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 5rem;
    padding-left: 0;
  }
`

const Map = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 900px) {
    width: 100%;
  }
`

const HeadingText = styled.div`
  color: #2a5ca5;
  font-size: 3rem;
  padding-bottom: 1rem;
  margin-bottom: 2rem;

  position: relative;
  font-weight: bold;

  &:before {
    content: "";
    position: absolute;

    left: 0%;
    top: 100%;
    bottom: -5%;
    right: ${(props) => props.length};

    background: #706c6c;
  }

  @media (max-width: 600px) {
    font-size: 2.6rem;
    margin-bottom: 0;
  }
`

const IconText = styled.div`
  font-size: 2rem;
  display: flex;
  gap: 2rem;
  align-items: center;
  color: #004a8c;

  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`

const IconLink = styled.a`
  text-decoration: none;
  outline: none;

  cursor: pointer;
  z-index: 1;
`

const IconTextLinks = styled(Link)`
  text-decoration: none;
  color: rgba(0, 73, 135);
  font-size: 2rem;

  cursor: pointer;
  transition: 0.3s transform;

  &:hover {
    transform: scale(1.1);
    transition: 0.3s transform;
  }

  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`

const MapImage = styled.iframe`
  border: none;
  box-shadow: 1px 1px 50px rgba(0, 73, 135, 0.16);
`

const CenterText = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 900px) {
    justify-content: start;
  }
`

const Credentials = styled.div`
  position: absolute;

  font-size: 1.2rem;
  color: rgba(0, 73, 135);

  bottom: 5%;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 900px) {
    bottom: 2%;
  }
  @media (max-width: 600px) {
    font-size: 1rem;

    flex-direction: column;
    bottom: 2%;
  }
`

const IconImage = styled.img`
  margin-top: ${(props) => (props.mtop ? props.mtop : "")};
  @media (max-width: 600px) {
    margin-top: 0;
    width: ${(props) => (props.widthX ? props.widthX : "1.8rem")};
  }
`

const IconImage2 = styled.img`
  margin-top: ${(props) => (props.mtop ? props.mtop : "")};
  @media (max-width: 600px) {
    margin-top: 0;
    width: 50%;
  }
`

const Footer = () => {
  return (
    <OuterContainer>
      <Container>
        <Contacts>
          <HeadingText length="68%">Head Office</HeadingText>
          <IconText>
            <IconImage src={Location} />
            Kathmandu
          </IconText>
          <IconText>
            <IconImage src={Phone} /> 01-4444444
          </IconText>
          <IconText>
            <IconImage src={Email} /> info@business.com
          </IconText>
          <IconText style={{ marginTop: "1rem", gap: "3rem" }}>
            <IconLink href="https://www.facebook.com/" target="_blank">
              <IconImage src={Facebook} width="40px" mtop="1rem" />
            </IconLink>
            <IconLink href="https://www.Instagram.com/" target="_blank">
              <IconImage src={Instagram} width="40px" mtop="1rem" />
            </IconLink>
            <IconLink
              href="https://api.whatsapp.com/send/?phone=9863840616&text=Hi, I'm Bijen. Contact Me.&type=phone_number&app_absent=0"
              target="_blank"
            >
              <IconImage src={Whatsapp} width="40px" mtop="1rem" />
            </IconLink>
          </IconText>
          <IconLink href="https://www.tripadvisor.com/" target="_blank">
            <IconImage2 src={Tripadvisor} width="200px" mtop="1rem" />
          </IconLink>
        </Contacts>
        <UsefulLinks>
          <HeadingText length="0">Useful Links</HeadingText>
          <IconTextLinks to="/expedition">Expeditions</IconTextLinks>
          <IconTextLinks to="/Trekkings">Trekking</IconTextLinks>
          <IconTextLinks to="/destinations">Destinations</IconTextLinks>
          <IconTextLinks to="/events">Events</IconTextLinks>
          <IconTextLinks to="/">
            <Link
              href="/contactUs"
              target="_blank"
              style={{ textDecoration: "none", color: "#004a8c" }}
            >
              Contact Us
            </Link>
          </IconTextLinks>
          <IconTextLinks to="/usefulInfo">Useful Information</IconTextLinks>
        </UsefulLinks>
        <Map>
          <CenterText>
            <HeadingText length="0">Find Us on Google Maps</HeadingText>
          </CenterText>
          <MapImage
            src="https://www.google.com/maps?q=Kathmandu,Nepal&output=embed"
            width="100%"
            height="100%"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></MapImage>
        </Map>
        <Credentials>
          <div>Copyright &copy; 2025 Business Name. All rights reserved.</div>
        </Credentials>
      </Container>
    </OuterContainer>
  )
}

export default Footer
