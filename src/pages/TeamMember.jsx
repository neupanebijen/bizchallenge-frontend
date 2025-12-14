import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import ContentBox from "../components/ContentBox"
import { useLocation, useNavigate } from "react-router-dom"

import ThirdPageComponent from "../components/NewSecondPageComponent"
import InfoSection from "../components/InfoSection"
import Image9 from "../assets/image9.jpg"
import Footer from "../components/Footer"

import ImageCropper from "../components/ImageCrop/App"

import Facebook from "../assets/facebook.svg"
import Instagram from "../assets/instagram.svg"
import Twitter from "../assets/twitter.svg"

import {
  editTeamMember,
  addPackageImage,
  apiImageLink,
} from "../api/expeditions"

const TeamMember = ({ isAdmin }) => {
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const location = useLocation()

  const [data, setData] = useState(
    location.state
      ? location.state
      : {
          name: "Loading.. ",
          image: Image9,
          information: "Loading..",
        }
  )

  // editing the team member data
  const [showDataPopup, setShowDataPopup] = useState(false)
  const [memberDetails, setMemberDetails] = useState({
    _id: data._id,
    name: data.name,
    role: data.role,
    image: data.image,
    information: data.information,
    tag: data.tag,
    certificates: data.certificates,
    facebook: data.facebook,
    twitter: data.twitter,
    instagram: data.instagram,
    phoneNo: data.phoneNo,
    email: data.email,
  })

  const editMemberDetails = (field, value) => {
    const newMemberDetails = memberDetails
    newMemberDetails[`${field}`] = value
    setMemberDetails({ ...newMemberDetails })
  }

  const saveMemberDetails = async () => {
    const result = await editTeamMember(memberDetails)
    console.log(result)
    if (result.success) {
      alert("Member Successfully added. Please refresh to see the changes")
    } else {
      alert("Something went wrong. Please try again later")
    }
  }

  // Image handling
  // Working with Image Cropper
  const [imageToCrop, setImageToCrop] = useState(undefined)
  const [croppedImage, setCroppedImage] = useState(undefined)

  const [file, setFile] = useState(null)

  async function dataURLtoFile2(dataurl) {
    var arr2 = imageToCrop.split(","),
      mime = arr2[0].match(/:(.*?);/)[1]

    // var arr = croppedImage.getAsFile().split(","),
    //   bstr = arr[1],
    //   n = bstr.length,
    //   u8arr = new Uint8Array(n)
    // while (n--) {
    //   u8arr[n] = bstr.charCodeAt(n)
    // }
    let convertedFile

    const toDataURL = (url) =>
      fetch(url)
        .then((response) => response.blob())
        .then(
          (blob) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader()
              reader.onloadend = () => resolve(reader.result)
              reader.onerror = reject
              reader.readAsDataURL(blob)
            })
        )

    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    }

    const result = await toDataURL(croppedImage).then((dataUrl) => {
      // console.log("Here is Base64 Url", dataUrl)
      let filename = `${Math.floor(Math.random() * 9 + 100000)}.${
        mime.split("/")[1]
      }`
      var fileData = dataURLtoFile(dataUrl, filename)
      // console.log("Here is JavaScript File Object", fileData)
      return fileData
    })

    return result
  }

  const onInputChange = async (e) => {
    setFile(e.target.files[0])

    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()

      reader.addEventListener("load", () => {
        const image = reader.result

        setImageToCrop(image)
        setCroppedImage(image)
      })

      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    if (!croppedImage) return
    var formData = new FormData()
    formData.append("photo", await dataURLtoFile2(croppedImage))
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }

    // console.log(formData)

    const result = await addPackageImage(formData, config)
    if (result.success) {
      console.log(memberDetails)
      let newMemberDetails = memberDetails
      newMemberDetails.image = result.filename
      const response = await editTeamMember(newMemberDetails)
      console.log(response)
      if (response.success) {
        alert("Success. Please refresh to see the changes")
      }
    } else {
      alert("Something went wrong. Please try again")
    }
  }

  const updateData = async ({ content }) => {
    let newMemberDetails = memberDetails
    newMemberDetails.information = content
    const result = await editTeamMember(newMemberDetails)
    if (!result.success) {
      alert("Something went wrong. Please try again later")
    }
  }

  return (
    <motion.div exit={{ zIndex: 1, transition: { duration: 0.41, delay: 1 } }}>
      {/* Edit the details */}
      {showDataPopup && (
        <DataPopup>
          <SmallTitle>
            <span style={{ color: "#000" }}>Add Team Member</span>
          </SmallTitle>
          <label>Name</label>
          <input
            type="text"
            value={memberDetails.name}
            onChange={(e) => editMemberDetails("name", e.target.value)}
          />

          <label>Role</label>
          <input
            type="text"
            value={memberDetails.role}
            onChange={(e) => editMemberDetails("role", e.target.value)}
          />

          <label>Facebook</label>
          <input
            type="text"
            value={memberDetails.facebook}
            onChange={(e) => editMemberDetails("facebook", e.target.value)}
          />
          <label>Twitter</label>
          <input
            type="text"
            value={memberDetails.twitter}
            onChange={(e) => editMemberDetails("twitter", e.target.value)}
          />
          <label>Instagram</label>
          <input
            type="text"
            value={memberDetails.instagram}
            onChange={(e) => editMemberDetails("instagram", e.target.value)}
          />
          <label>Phone No</label>
          <input
            type="text"
            value={memberDetails.phoneNo}
            onChange={(e) => editMemberDetails("phoneNo", e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            value={memberDetails.email}
            onChange={(e) => editMemberDetails("email", e.target.value)}
          />
          <label>Tag</label>
          <input
            type="text"
            value={memberDetails.tag}
            onChange={(e) => editMemberDetails("tag", e.target.value)}
          />

          <AddButton
            onClick={saveMemberDetails}
            style={{ display: "absolute", top: "700px", left: "20px" }}
          >
            Save
          </AddButton>
          <AddButton
            onClick={() => setShowDataPopup(false)}
            style={{ position: "absolute", top: "10px", right: "20px" }}
          >
            Close
          </AddButton>
        </DataPopup>
      )}
      {isAdmin && (
        <AddButton onClick={() => setShowDataPopup(true)}>
          Edit Member Details
        </AddButton>
      )}

      {/* Show The data */}
      <ThirdPageComponent
        data={{
          title: `Hi, I'm ${data.name}`,
          image: data.fromReview ? data.image : `${apiImageLink}${data.image}`,
        }}
        backLink="/about#team"
        donotScale={true}
      >
        {!data.fromReview && (
          <SocialsList>
            <IconLink href={data.facebook} target="_blank">
              <IconImage src={Facebook} width="40px" mtop="1rem" />
            </IconLink>
            <IconLink href={data.instagram} target="_blank">
              <IconImage src={Instagram} width="40px" mtop="1rem" />
            </IconLink>
            <IconLink href={data.twitter} target="_blank">
              <IconImage src={Twitter} width="40px" mtop="1rem" />
            </IconLink>
          </SocialsList>
        )}
        <ContentBox id="content" style={{ padding: "8vh 0" }}>
          <InfoSection
            title={`About ${data.name}`}
            text={data.information}
            showEditor={true}
            isAdmin={isAdmin}
            data={{ content: data.information }}
            updateData={updateData}
          />
        </ContentBox>

        {/* Image section */}
        {isAdmin && (
          <>
            <form onSubmit={onFormSubmit} style={{ padding: "0 6vw" }}>
              <h1 style={{ color: "black" }}>Image Upload</h1>
              <input
                style={{ color: "black" }}
                type="file"
                name="photo"
                onChange={onInputChange}
              />
              <input type="submit" />
            </form>
            <div className="app">
              <div>
                <ImageCropper
                  imageToCrop={imageToCrop}
                  onImageCropped={(croppedImage) =>
                    setCroppedImage(croppedImage)
                  }
                />
              </div>
              {croppedImage && (
                <div>
                  <h2>Cropped Image</h2>
                  <img alt="Cropped Img" src={croppedImage} />
                </div>
              )}
            </div>
          </>
        )}

        <Footer />
      </ThirdPageComponent>
    </motion.div>
  )
}

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
  top: 50vh;
  left: 25vw;
  right: 0;

  background: #e6e6e6;
  width: 50vw;
  height: 80vh;
  z-index: 11;
  padding: 1em 2rem;

  box-shadow: 0px 0px 10px #f5f5f5;
`

const AddButton = styled.button`
  font-size: 2rem;
  padding: 1rem;
  color: #6e6e6e;
  background: none;
  cursor: pointer;
  font-weight: bold;

  position: absolute;
  top: 100vh;

  right: 5.5vw;
  z-index: 11;
  cursor: pointer;

  @media (max-width: 600px) {
    display: none;
  }
`

const IconLink = styled.a`
  text-decoration: none;
  outline: none;

  cursor: pointer;
  z-index: 1;
`

const IconImage = styled.img`
  margin-top: ${(props) => (props.mtop ? props.mtop : "")};
  @media (max-width: 600px) {
    margin-top: 0;
    width: ${(props) => (props.widthX ? props.widthX : "1.8rem")};
  }
`

const SocialsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: absolute;
  top: -25vh;
  left: 0vw;
  padding: 0.3rem 2rem;
`

export default TeamMember
