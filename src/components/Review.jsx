import styled from "styled-components"
import TestimonialIcon from "../assets/Testimonial1.jpeg"
import TestimonialIcon2 from "../assets/Testimonial2.jpeg"
import TestimonialIcon3 from "../assets/Testimonial3.jpeg"
import { Link } from "react-router-dom"

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

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

const CardImage = styled.img`
  border-radius: 50%;
  overflow: hidden;

  width: 30%;
  height: 30%;
  min-height: 10rem;

  background: #fff;
  box-shadow: 5px 6px 10px rgba(0, 73, 135, 0.16);
  margin-top: 2rem;

  @media (max-width: 900px) {
    width: 70%;

    display: flex;
    margin: 0 auto;
  }
`

const CardInfo = styled.div`
  font-size: 1.6rem;
  font-family: "SegoeUI";

  margin-top: 2rem;
  width: 70%;
  heigth: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 100%;
  }

  @media (max-width: 450px) {
    font-size: 1.6rem;
  }
`

const CardName = styled.div`
  font-size: 2rem;
  color: #04b5ff;
  position: absolute;
  bottom: 1rem;

  @media (max-width: 900px) {
    position: relative;
    margin-top: 4rem;
  }

  @media (max-width: 450px) {
    position: relative;
    font-size: 1.6rem;
    margin-top: 4rem;
  }
`

const CardText = styled.div`
  text-decoration: none;
`

const CardStyle = styled.div`
  position: relative;
  width: 80%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: default;
  color: #706c6c;
  background: #ddd;

  box-shadow: 2px 5px 10px rgba(0, 73, 135, 0.16);

  transition: 0.3s transform;
  text-decoration: none;

  &:hover {
    transform: scale(1.01);
    background-color: #b3e9ff;
    transition: 0.15s transform;
    cursor: pointer;
  }

  @media (max-width: 900px) {
    flex-direction: column;
  }

  @media (max-width: 600px) {
    flex-direction: row;
    width: 100%;
    margin-top: 4rem;

    min-height: 15rem;
  }
`

const Card = ({ Image, name, text }) => {
  return (
    <CardStyle
      as={Link}
      to="/teamMember"
      state={{
        _id: "",
        name: name,
        image: Image,
        certificates: "",
        tag: "",
        role: "",
        information: text,
        facebook: "",
        instagram: "",
        twitter: "",
        phoneNo: "",
        email: "",
        fromReview: true,
      }}
    >
      <CardImage src={Image} altText="Image" />
      <CardInfo>
        <CardText>
          {text.split("").map((value, index) => index < 100 && value)}...
        </CardText>
        <CardName>{name}</CardName>
      </CardInfo>
    </CardStyle>
  )
}

const Review = () => {
  const cardData = [
    {
      Image: TestimonialIcon,
      name: "Jolana Krulova",
      text: "I would like to express my gratitude and grateful thanks for the fantastic experience with an extremely. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      Image: TestimonialIcon2,
      name: "Dr. Hitendra Mahajan",
      text: "My success of climbing world’s highest mountain Mt. Everest is just because of Pioneer Adventure. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      Image: TestimonialIcon3,
      name: "Milind Raskar",
      text: "Dear Pioneer Team,It is unavoidable to control my gratitude feeling about my experience while Everest expedition 2019 with you team. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      Image: TestimonialIcon,
      name: "Jolana Krulova",
      text: "I would like to express my gratitude and grateful thanks for the fantastic experience with an extremely.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ]

  return (
    <>
      <Carousel responsive={responsive}>
        {cardData.map((value, index) => {
          return (
            <Card
              key={index}
              Image={value.Image}
              name={value.name}
              text={value.text}
            />
          )
        })}
      </Carousel>
    </>
  )
}

export default Review
