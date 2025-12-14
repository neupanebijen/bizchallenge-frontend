import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"

import ContentBox from "../components/ContentBox"

import SecondPageComponent from "../components/NewSecondPageComponent"
import Image from "../assets/SliderContrast3.JPG"
import Footer from "../components/Footer"
import InfoSection from "../components/InfoSection"

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

import {
  addEvent,
  getAllEvents,
  removeEvent,
  apiImageLink,
} from "../api/expeditions"

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const Events = ({ isAdmin }) => {
  const navigate = useNavigate()
  // Load existing events
  const [eventsData, setEventsData] = useState(null)
  const [newsData, setNewsData] = useState(null)
  const [videoData, setVideoData] = useState(null)

  useEffect(() => {
    const getAllEventsCall = async () => {
      const result = await getAllEvents()
      setEventsData(result.result)
    }

    getAllEventsCall()
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let counter = 0
    let newsDataComponent =
      eventsData !== null &&
      eventsData.map((data, index) => {
        if (data.tag === "news") counter += 1

        return (
          data.tag === "news" && (
            <RemoveButton
              key={data._id}
              onClick={() => removeEventCall(data._id)}
            >
              Remove news {counter}
            </RemoveButton>
          )
        )
      })
    setNewsData(newsDataComponent)
  }, [eventsData])

  useEffect(() => {
    let counter = 0
    let videoDataComponent =
      eventsData !== null &&
      eventsData.map((data, index) => {
        if (data.tag === "video") counter += 1

        return (
          data.tag === "video" && (
            <RemoveButton
              key={data._id}
              onClick={() => removeEventCall(data._id)}
            >
              Remove news {counter}
            </RemoveButton>
          )
        )
      })
    setVideoData(videoDataComponent)
  }, [eventsData])

  // Add a new event
  const [showVideoDataPopup, setVideoDataPopup] = useState(false)
  const [showNewsDataPopup, setNewsDataPopup] = useState(false)
  const [eventDetails, setEventDetails] = useState({
    title: "",
    content: "<p>Content of the event</p>",
    images: [],
    tag: "",
    facebookShareLink: "",
    twitterShareLink: "",
    instagramShareLink: "",
    youtubeLink: "",
  })

  const editEventDetail = (field, tag, value) => {
    const newEventDetail = eventDetails
    newEventDetail[`${field}`] = value
    newEventDetail.tag = tag
    setEventDetails({ ...newEventDetail })
  }

  const saveEventDetails = async () => {
    const result = await addEvent(eventDetails)
    if (result.success) {
      navigate(0)
    } else {
      alert("Something went wrong. Please try again later")
    }
  }

  const removeEventCall = async (id) => {
    const result = await removeEvent(id)
    if (result.success) {
      alert("Event removed")
      navigate(0)
    } else {
      alert("Something went wrong. Please try again later")
    }
  }

  // Counter

  return (
    <motion.div exit={{ zIndex: 1, transition: { duration: 0.41, delay: 1 } }}>
      {/* Add a team member */}
      {showVideoDataPopup && (
        <DataPopup>
          <SmallTitle>
            <span style={{ color: "#000" }}>Add Video</span>
          </SmallTitle>
          {eventsData !== null &&
            eventsData.map((data, index) => {
              let counter = 0
              if (data.tag === "video") {
                counter = counter + 1
              }
              return (
                data.tag === "video" && (
                  <RemoveButton
                    key={data._id}
                    onClick={() => removeEventCall(data._id)}
                  >
                    Remove video {counter}
                  </RemoveButton>
                )
              )
            })}
          <label>Video link</label>
          <input
            type="text"
            value={eventDetails.youtubeLink}
            onChange={(e) =>
              editEventDetail("youtubeLink", "video", e.target.value)
            }
          />

          <AddButton2 onClick={saveEventDetails}>Save</AddButton2>
          <AddButton
            onClick={() => setVideoDataPopup(false)}
            style={{ position: "absolute", top: "10px", right: "20px" }}
          >
            Close
          </AddButton>
        </DataPopup>
      )}
      {/* News add */}
      {showNewsDataPopup && (
        <NewsDataPopup>
          <SmallTitle>
            <span style={{ color: "#000" }}>Add news</span>
          </SmallTitle>

          {newsData}

          <label>News Title</label>
          <input
            type="text"
            value={eventDetails.title}
            onChange={(e) => editEventDetail("title", "news", e.target.value)}
          />

          <AddButton2 onClick={saveEventDetails}>Save</AddButton2>
          <AddButton
            onClick={() => setNewsDataPopup(false)}
            style={{ position: "absolute", top: "10px", right: "20px" }}
          >
            Close
          </AddButton>
        </NewsDataPopup>
      )}
      {/* Buttons */}
      {isAdmin && (
        <AddButton onClick={() => setVideoDataPopup(true)}>
          Add An Video
        </AddButton>
      )}

      {isAdmin && (
        <AddNewsButton onClick={() => setNewsDataPopup(true)}>
          Add An News
        </AddNewsButton>
      )}

      {/* Show the events */}
      <SecondPageComponent data={{ title: "Events", image: Image }}>
        <ContentBox>
          {/* Video section */}
          <InfoSection title="Videos" text="" />
          <Carousel responsive={responsive}>
            {eventsData !== null &&
              eventsData.map(
                (data, index) =>
                  data.tag === "video" && (
                    <CarouselItem key={data._id}>
                      <IframeContainer
                        src={data.youtubeLink}
                        title="YouTube video player"
                        frameborder="0"
                        height="70vh"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
                        allowfullscreen
                      ></IframeContainer>
                    </CarouselItem>
                  )
              )}
          </Carousel>

          {/* News section */}
          <InfoSection title="News" text="" />
          <EventsContainer>
            {eventsData !== null &&
              eventsData.map((value, index) => {
                return (
                  value.tag === "news" && (
                    <ContainerDiv key={value._id}>
                      <EventLink
                        id={value._id}
                        title={value.title}
                        content={value.content}
                        image={
                          value.images[0]
                            ? `${apiImageLink}${value.images[0]}`
                            : Image
                        }
                        removeEvent={() => removeEventCall(value._id)}
                        isAdmin={isAdmin}
                      />
                    </ContainerDiv>
                  )
                )
              })}
          </EventsContainer>
          <Footer />
        </ContentBox>
      </SecondPageComponent>
    </motion.div>
  )
}

const CarouselItem = styled.div`
  width: 100%;
  height: 70vh;
`

const EventLink = ({ id, title, content, image, removeEvent, isAdmin }) => {
  return (
    <EventLinkContainer>
      {isAdmin && (
        <button
          onClick={removeEvent}
          style={{ position: "absolute", zIndex: "9" }}
        >
          Remove
        </button>
      )}
      <LinkContainer to={`/events/${id}`}>
        <div class="card">
          <div class="card-side front">
            <EventImage src={image} />
          </div>
          <div class="card-side back">
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </div>
      </LinkContainer>
    </EventLinkContainer>
  )
}

const RemoveButton = styled.button`
  display: block;
  padding: 1rem 2rem;
  margin-top: 1rem;

  font-weigght: bold;
  font-size: 1.6rem;
`
const IframeContainer = styled.iframe`
  width: 95%;
  height: 95%;
  margin-left: 5vw;

  min-height: 30rem;

  @media (max-width: 900px) {
    min-height: 40rem;
  }

  @media (max-width: 600px) {
    min-height: 20rem;
  }
`

const ContainerDiv = styled.div`
  position: relative;
  width: 33%;

  @media (max-width: 900px) {
    width: 49%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`

const EventLinkContainer = styled.div`
  width: 100%;
`
const EventImage = styled.img`
  width: 100%;
  height: 100%;
`

const LinkContainer = styled(Link)`
  text-decoration: none;
  color: #707070;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`

const EventsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 5vw;

  @media (max-width: 900px) {
    padding: 0 1vw;
    justify-content: space-between;
  }
`

const SmallTitle = styled.h4`
  font-size: 2vw;
  width: 100%;

  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 102%;
    bottom: -4%;
    left: 0;
    right: 70%;
    background: #004a8c;
  }
`

const DataPopup = styled.div`
  position: absolute;
  top: 90vh;
  left: 25vw;
  right: 0;

  background: #e6e6e6;
  width: 50vw;
  min-height: 25vh;
  z-index: 11;
  padding: 1em 2rem;

  box-shadow: 0px 0px 10px #f5f5f5;
`
const NewsDataPopup = styled.div`
  position: absolute;
  top: 90vh;
  left: 25vw;
  right: 0;

  background: #e6e6e6;
  width: 50vw;
  min-height: 40vh;
  z-index: 11;
  padding: 1em 2rem;

  box-shadow: 0px 0px 10px #f5f5f5;
`

const AddButton2 = styled.button`
  font-size: 2rem;
  padding: 1rem;
  color: #6e6e6e;
  background: none;
  cursor: pointer;
  font-weight: bold;
  display: block;
  margin-top: 2rem;

  cursor: pointer;

  @media (max-width: 600px) {
    display: none;
  }
`

const AddButton = styled.button`
  font-size: 2rem;
  padding: 1rem;
  color: #6e6e6e;
  background: none;
  cursor: pointer;
  font-weight: bold;

  position: absolute;
  top: 102vh;
  right: 3vw;
  z-index: 11;
  cursor: pointer;

  @media (max-width: 600px) {
    display: none;
  }
`

const AddNewsButton = styled.button`
  font-size: 2rem;
  padding: 1rem;
  color: #6e6e6e;
  background: none;
  cursor: pointer;
  font-weight: bold;

  position: absolute;
  top: 102vh;
  right: 15vw;
  z-index: 11;
  cursor: pointer;

  @media (max-width: 600px) {
    display: none;
  }
`

export default Events
