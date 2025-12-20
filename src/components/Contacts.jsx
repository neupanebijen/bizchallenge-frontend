import React, { useState } from "react"
import styled from "styled-components"

import { sendMail } from "../api/expeditions"
import { useParams } from "react-router-dom"

import Heading from "./Heading"
import Menu from "./Menu"

const WidthContainer = styled.div`
  max-width: 85vw;

  @media (max-width: 1300px) {
    max-width: 90vw;
  }
`

const OuterContainer = styled.div`
  position: relative;
  padding-bottom: 10rem;
  margin-top: 10rem;

  @media (max-width: 600px) {
    margin-top: 0;
  }
`
const Container = styled(WidthContainer)`
  width: 80%;
  margin: 0 auto 0 auto;
  padding: 5rem 10rem;

  box-shadow: 1px 1px 50px rgba(16, 63, 65, 0.15);
  position: relative;
  z-index: 1;
  background: #fff;
  overflow: visible;

  @media (max-width: 600px) {
    width: 100%;
    padding: 5rem 2rem;
  }
`

const Background = styled.div`
  position: absolute;

  top: 50vh;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-color: #004a8c;
`

const FormContainer = styled.form`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const InputStyled = styled.input`
  border: none;
  border: 1px solid #707070;
  border-radius: 0.5rem;

  padding: 2rem 1rem;
  font-size: 2rem;
  color: #000;

  width: 45%;
  margin-top: 5rem;

  outline: none;
  font-family: "SegoeUI";

  @media (max-width: 600px) {
    width: 100%;
  }
`

const MessageBox = styled.textarea`
  width: 100%;
  border: none;
  border: 1px solid #707070;
  border-radius: 0.5rem;
  margin-top: 4rem;

  min-height: 25rem;

  position: relative;

  font-family: "SegoeUI"; 
  color: #808080; 
  font-size: 2rem; 
  outline: none; 
}
`

const Button = styled.div`
  border-radius: 3rem;
  padding: 0.45rem 2rem 0.7rem 2rem;
  font-size: 2rem;
  cursor: pointer;
  width: 8rem;
  margin-top: 5rem;
  background: #004a8c;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "SegoeUI";
`

const InputTitle = styled.h1`
  width: 100%;
  margin-top: 5%;
`

const MenuWithWidth = styled.div`
  width: 90vw;
  margin: 0 auto;
`

const ContactForm = () => {
  const data = useParams()
  console.log(data)

  // Edit this into a single state
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  // eslint-disable-next-line no-unused-vars
  const [packageName, setPackageName] = useState(data.packageName)
  //eslint-disable-next-line no-unused-vars
  const [type, setType] = useState(data.type)
  const [noOfPeople, setNoOfPeople] = useState("")
  const [address, setAddress] = useState("")
  const [country, setCountry] = useState("")
  const [arrival, setArrival] = useState("")
  const [departure, setDeparture] = useState("")

  const onSubmit = async () => {
    const data = {
      packageName: packageName,
      noOfPeople: noOfPeople,
      country: country,
      address: address,
      arrival: arrival,
      departure: departure,
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      subject: subject,
      message: message,
    }

    const result = await sendMail(data, "contact")

    if (result.success) {
      setName("")
      setPhoneNumber("")
      setEmail("")
      setSubject("")
      setMessage("")
      window.alert("Sucesss")
    } else {
      window.alert("Something went wrong. Please try again")
    }
  }

  return (
    <>
      <MenuWithWidth>
        <Menu color="#004a8c" />
      </MenuWithWidth>
      <OuterContainer>
        <Background />
        <Container id="Contact">
          <Heading whiteText={type ? type : "Inquiry"} />
          <FormContainer>
            <InputTitle>Trip Details</InputTitle>
            <InputStyled
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              placeholder="Package Name"
              disabled
            />
            <InputStyled
              value={noOfPeople}
              onChange={(e) => setNoOfPeople(e.target.value)}
              placeholder="Number of People"
            />
            <InputTitle>Your Details</InputTitle>
            <InputStyled
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
            <InputStyled
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              type="tel"
            />
            <InputStyled
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              type="email"
              pattern="[^ @]*@[^ @]*"
            />
            <InputStyled
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
            <InputStyled
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
            <InputTitle>Arrival Details</InputTitle>
            <InputStyled
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              placeholder="Arrival"
            />
            <InputStyled
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              placeholder="Departure"
            />
            <InputStyled
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
            />

            <InputTitle>Message</InputTitle>
            <MessageBox
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
            />
          </FormContainer>
          <Button onClick={() => onSubmit()}>SEND</Button>
        </Container>
      </OuterContainer>
    </>
  )
}

export default ContactForm
