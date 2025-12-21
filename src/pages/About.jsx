import React, { useEffect } from "react"
import { motion } from "framer-motion"
import styled from "styled-components"

import SecondPageComponent from "../components/NewSecondPageComponent"
import ContentBox from "../components/ContentBox"
import Image from "../assets/AboutPhoto.jpeg"
import Team from "../components/Team"
import InfoSection from "../components/InfoSection"
import Footer from "../components/Footer"
import Review from "../components/Review"

const responsibleTravelsContent = `
<p><b>Biz Challenges </b> is fully committed to conserving natural resources, protecting local cultural heritage and making positive impacts in the communities. We firmly believe in giving back to society and working with local charities to support community development. Normally we combine most of our touring programs with community works at some of Nepal’s remote places where transportation is still not accessible. Our clients are encouraged to participate in the rural community-based projects to protect and preserve the natural environment by planting the trees along the trekking trails.</p>
<br /><p>At all our destinations, we aim to ensure that the benefits of tourism reach the right places, by employing local tour leaders and wherever possible use only locally owned lodges along the trails. We employ only local guides not just for their local knowledge but also to generate local employment. We believe that the local community should be economically benefited from our tours and treks. This is why we always encourage our clients to be responsible and support the local community and the areas where we visit.</p>
<br /><p><b>Biz Challenges </b> ensures that we act responsibly at all times – financially, environmentally and socially. We operate small group of adventurers just to minimize the impact on the local environment and trekking trails. In most of our trips in the Himalayan regions, we try to keep the minimum use of vehicles and transport to avoid carbon output. Our office policies include the use of recycled and sustainably sourced paper, minimizing energy and water use, encouraging the use of public transport and cycling/walking to work and using eco-friendly cleaning products.</p>
<br /><p> Our operational policies include: Using local staff, suppliers, leaders, accommodation, and transport so maximum benefit accrues to the local economy. Minimizing environmental impact by visiting sustainable destinations, using established paths and designing trips to be low carbon. Using suppliers and accommodation that have responsible and green policies in place. We support community projects in the areas we operate the tours and wherever possible make our clients aware of and encourage them to visit the projects where we have been supporting.</p>
<br /><p>We negotiate fair prices and build long term relationships with our local suppliers so that they can sustain their businesses in the longer term.</p>
`

const coreValueContent = `<h2>Safety and Security</h2> <p>It is one of the very few companies in Nepal whose most of the guides are well trained in First Aid and Mountain Guide Course to ensure the clients safety. Also, most of our guides have been involved in many rescue operations and saved the lives of many people. Clients safety and security is our first priority.&nbsp;</p>
 <p><br></p> <h2>Love, cheerfulness and healthy relationships</h2> <p>We &nbsp;ever want to treat our clients and partners with love, cheerfulness and &nbsp;in a healthy relationship on a solid underlying friendship. We know a &nbsp;key part of being successful in business is a healthy work, trust and &nbsp;cultivating a healthy relationship with them. Every deal in business &nbsp;will be on trust and mutual benefit. It is, therefore, extremely &nbsp;important for us to embrace and practice this concept in our corporate &nbsp;culture.<br></p>
 <br /><h2>A &nbsp;model of excellence</h2> <p>Biz Challenges &nbsp; is a model of excellence in the world of trekking and &nbsp;climbing expeditions. We are truly committed to offering the best &nbsp;service and price to travel destinations in Nepal, Tibet (China), India &nbsp;and Pakistan wherever we operate our trips. We want our clients to &nbsp;realize our personalized services at every step of the trip that we &nbsp;organize.<br></p> 
 <br /><h2>Right time service</h2> <p>We &nbsp;want Biz Challenges  to be the best  travel company to work &nbsp;with in Nepal. &nbsp;We want to execute our business in a professional and &nbsp;ethical manner keeping the interests and expectations of our clients. To &nbsp;fulfill any travel expectation and needs of the clients and agents we &nbsp;have our dedicated travel experts to respond to any queries and share &nbsp;the knowledge of expeditions at any time. Also, our operation team on &nbsp;the ground is available 24 hrs a day 7 days a week and 365 days a year.</p> 
 <p><br></p> <h2>Strive to travel responsibly</h2><p>We &nbsp;carefully research the experiences that we provide to our guests. We &nbsp;want to make a symbiotic relationship with the places and local &nbsp;community where we operate the trips. We do not want those places we &nbsp;step foot on and activities we offer to the clients benefit us only &nbsp;financially. Rather, we want our travelers to return home with a better &nbsp;understanding of those places and come up with some innovative idea to &nbsp;do something for the community on their next visit.<br></p>`

const aboutContent = `<p>Biz Challenges  is a government registered company and a trusted brand in mountaineering, peak climbing, trekking and other forms of  activities in the Himalayas. This company is run by elite Sherpa mountaineers and professional guides. It is one of the very few companies in Nepal whose most of the guides are well trained in First Aid and Mountain Guide Course. The sole purpose of this company is to provide professional services to every individual and group in the Himalayas who loves to be thrilled with the beauty of nature and  activities.</p><br />
<p>
      `
const About = ({ isAdmin }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <motion.div exit={{ zIndex: 1, transition: { duration: 0.41, delay: 1 } }}>
      <SecondPageComponent data={{ title: "About Us", image: Image }}>
        <ContentBox id="content">
          <InfoSection
            title="About Biz Challenges "
            text={aboutContent}
            image=""
          />
          <div id="ourTeam"></div>
          <Team isAdmin={isAdmin} />
          <PaddingWrapper>
            <div id="responsibleTravel"></div>
            <InfoSection
              title="Responsible Travels"
              text={responsibleTravelsContent}
              fromAbout={true}
            />
          </PaddingWrapper>

          <PaddingWrapper style={{ background: "#ddd" }}>
            <div id="coreValues"></div>
            <InfoSection
              title="Our Core Values"
              text={coreValueContent}
              fromAbout={true}
            />
          </PaddingWrapper>
          <PaddingWrapper>
            <div id="reviews"></div>
            <InfoSection title="Reviews" text={""}>
              <Review />
            </InfoSection>
          </PaddingWrapper>
          <Footer />
        </ContentBox>
      </SecondPageComponent>
    </motion.div>
  )
}

const PaddingWrapper = styled.div`
  padding: 5vh 3vh;

  & h2 {
    color: #004a8d;
  }
`

export default About
