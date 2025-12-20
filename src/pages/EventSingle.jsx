import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"

import { Slider } from "../components/Animations"
import Footer from "../components/Footer"
import ThirdPageComponent from "../components/NewSecondPageComponent"
import InfoSection from "../components/InfoSection"
import ImageCropper from "../components/ImageCrop/App"

import {
  getEvent,
  updateEvent,
  addPackageImage,
  apiImageLink,
} from "../api/expeditions"

const EventSingle = ({ isAdmin }) => {
  const { eventId } = useParams()
  const [data, setData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getEventCall = async () => {
      const result = await getEvent(eventId)

      setData(result.result)
    }

    getEventCall()
    window.scrollTo(0, 0)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [showDataPopup, setShowDataPopup] = useState(false)

  // Image handling
  // Image handling
  // Working with Image Cropper
  const [imageToCrop, setImageToCrop] = useState(undefined)
  const [croppedImage, setCroppedImage] = useState(undefined)

  //eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState(null)

  async function dataURLtoFile2(dataurl) {
    var arr2 = imageToCrop.split(","),
      mime = arr2[0].match(/:(.*?);/)[1]

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

    const result = await addPackageImage(formData, config)
    if (result.success) {
      data.images.push(result.filename)
      const response = await updateEvent(data)
      if (response.success) {
        navigate(0)
      }
    } else {
      alert("Something went wrong. Please try again")
    }
  }
  // const onFormSubmit = async (e) => {
  //   e.preventDefault()
  //   if (!file) return
  //   var formData = new FormData()
  //   formData.append("photo", file)
  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   }

  //   const result = await addPackageImage(formData, config)
  //   if (result.success) {
  //     data.images.push(result.filename)
  //     const response = await updateEvent(data)
  //     if (response.success) {
  //       navigate(0)
  //     }
  //   } else {
  //     alert("Something went wrong. Please try again")
  //   }
  // }

  // updating event for all not just content
  const updateEventContent = async (updatedData) => {
    const result = await updateEvent(updatedData)
    if (result.success) {
      setData({ ...updatedData })
    } else {
      alert("Something went wrong. Please try again later")
    }
  }

  const changeData = (field, value) => {
    const newData = data
    newData[`${field}`] = value
    setData({ ...newData })
  }

  const saveEvent = async () => {
    const result = await updateEvent(data)
    if (result.success) {
      alert("Successfully edited the data. Please refresh")
    }
  }

  const imageMoveUp = (index) => {
    const newData = data
    let oldValue = newData.images[index]
    newData.images[index] = newData.images[index - 1]
    newData.images[index - 1] = oldValue
    setData({ ...newData })
    updateEventContent(newData)
  }

  const removeImage = (index) => {
    let newData = data

    newData.images = newData.images.filter((value, i) => i !== index)
    setData({ ...newData })
    updateEventContent(newData)
  }
  console.log(data)

  return (
    <motion.div exit={{ zIndex: 1, transition: { duration: 0.41, delay: 1 } }}>
      {data && (
        <ThirdPageComponent
          data={{
            title: data.title,
            image: `${apiImageLink}${data.images[0]}`,
          }}
        >
          {/* Popup to edit the highlights data */}
          {showDataPopup && (
            <DataPopup>
              <SmallTitle>
                <span style={{ color: "#000" }}>Edit data</span>
              </SmallTitle>
              <label>Title</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => changeData("title", e.target.value)}
              />
              <label>Facebook Share Link</label>
              <input
                type="text"
                value={data.facebookShareLink}
                onChange={(e) =>
                  changeData("facebookShareLink", e.target.value)
                }
              />
              <label>Twitter Share Link</label>
              <input
                type="text"
                value={data.twitterShareLink}
                onChange={(e) => changeData("twitterShareLink", e.target.value)}
              />
              <label>Instagram Share Link</label>
              <input
                type="text"
                value={data.instagramShareLink}
                onChange={(e) =>
                  changeData("instagramShareLink", e.target.value)
                }
              />
              <label>Youtube Link</label>
              <input
                type="text"
                value={data.youtubeLink}
                onChange={(e) => changeData("youtubeLink", e.target.value)}
              />
              <label>Event No</label>
              <input
                type="text"
                value={data.eventNo}
                onChange={(e) => changeData("eventNo", e.target.value)}
              />
              <AddButton onClick={saveEvent} style={{ display: "block" }}>
                Save
              </AddButton>
              <AddButton
                onClick={() => setShowDataPopup(false)}
                style={{ position: "absolute", top: "0px", right: "20px" }}
              >
                Close
              </AddButton>
            </DataPopup>
          )}
          {isAdmin && (
            <OtherButton onClick={() => setShowDataPopup(true)}>
              Edit event details
            </OtherButton>
          )}

          {/* The section for the main text */}
          <InfoSection
            title={data.title}
            text={data.content}
            showEditor={true}
            data={data}
            id="content"
            updateData={updateEventContent}
            isExpeditionSinglePage={true}
            isAdmin={isAdmin}
          ></InfoSection>

          {/* The section for the carousel  */}
          <Carousel>
            {data.images.map((value, index) => {
              return (
                <CarouselImage
                  src={`${apiImageLink}${value}`}
                  key={index}
                  length={data.images.length}
                  loading="lazy"
                />
              )
            })}
          </Carousel>
          {isAdmin && (
            <>
              <form
                onSubmit={onFormSubmit}
                style={{ color: "#000", fontSize: "2rem", padding: "1vw 5vw" }}
              >
                <h3 style={{ color: "black" }}>Image Upload</h3>
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
          {isAdmin && (
            <>
              <div
                style={{ color: "#000", fontSize: "2rem", padding: "2vw 5vw" }}
              >
                <h3>Image Order</h3>
                {data.images.map((value, index) => (
                  <div>
                    <span>
                      {index + 1}. {value}
                    </span>{" "}
                    {index !== 0 && (
                      <>
                        <button onClick={() => imageMoveUp(index)}>
                          Move Up
                        </button>
                        <button onClick={() => removeImage(index)}>
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          <Footer />
        </ThirdPageComponent>
      )}
    </motion.div>
  )
}

const DataPopup = styled.div`
  position: absolute;
  top: 113vh;
  left: 25vw;
  right: 0;

  background: #e6e6e6;
  width: 50vw;
  height: 90vh;
  z-index: 11;
  padding: 0.3rem 2rem;

  box-shadow: 0px 0px 10px #f5f5f5;
`

const CarouselImage = styled.img`
  width: 50vw;
  animation: ${(props) => props.length * 7}s
    ${(props) => Slider(props.length - 2)} linear infinite;
`

const Carousel = styled.div`
  display: flex;
  width: 100vw;
  height: 70vh;
  gap: 2rem;
  flex-wrap: no-wrap;
  padding: 2vw 0;
  margin: 2vw 0;
  background: #e6e6e6;
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

const AddButton = styled.button`
  font-size: 2rem;
  padding: 1rem;
  color: #004a8c;
  background: none;
  margin-top: 5rem;
  margin-bottom: 5rem;
  cursor: pointer;
  font-weight: bold;

  @media (max-width: 600px) {
    display: none;
  }
`

const OtherButton = styled(AddButton)`
  position: absolute;
  top: 102vh;
  right: 6vw;
  z-index: 11;
  cursor: pointer;
`

export default EventSingle
