import React, { useState, useEffect, useRef, useCallback } from "react"
import { useInView } from "react-intersection-observer"
import { FadeInUpText, SlideRight } from "./Animations"

import styled from "styled-components"
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"

import SectionTitle from "./SectionTitle"
import InfoSection from "./InfoSection"
import ImageCropper from "./ImageCrop/App"

import Itinerary from "../assets/Itinerary.svg"
import Includes from "../assets/Includes.svg"
import Excludes from "../assets/Excludes.svg"

import StopWatch from "../assets/stopwatch.svg"
import MaxAltitude from "../assets/ImaxAltitude.svg"
import BestSeason from "../assets/IbestSeason.svg"
import Grade from "../assets/Igrade.svg"
import Facebook from "../assets/facebook.svg"
import Instagram from "../assets/instagram.svg"
import Twitter from "../assets/twitter.svg"
import Whatsapp from "../assets/whatsapp.svg"
import Logo from "../assets/logo.png"

import { addPackageImage, apiImageLink } from "../api/expeditions"
import useScrollPosition from "../hooks/useScrollPosition"
import { jsPDF } from "jspdf"

const MainComponent = ({ title, data, updatePackage, isAdmin }) => {
  const scrollY = useScrollPosition()
  const [isInView, setIsInView] = useState(false)
  const [inViewRef, inView] = useInView({
    threshold: window.innerWidth < 900 ? 1 : 1,
  })

  useEffect(() => {
    if (inView) {
      setIsInView(true)
    }
  }, [inView])

  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState(0)
  const text = data.content

  const [itineraryData, setItineraryData] = useState(data.itinerary)
  const [includesData, setIncludesData] = useState(data.includes)
  const [excludesData, setExcludesData] = useState(data.excludes)
  const [bookingData, setBookingData] = useState(data.fixedDepartures)

  const [otherData, setOtherData] = useState({
    duration: data.duration,
    bestSeason: data.bestSeason,
    grade: data.grade,
    maxAltitude: data.maxAltitude,
    videoLink: data.videoLink ? data.videoLink : "",
    facebookShareLink: data.facebookShareLink ? data.facebookShareLink : "",
    instagramShareLink: data.instagramShareLink ? data.instagramShareLink : "",
    twitterShareLink: data.twitterShareLink ? data.twitterShareLink : "",
    youtubeLink: data.youtubeLink ? data.youtubeLink : "",
    packageNo: data.packageNo ? data.packageNo : "",
    metaTags: data.metaTags ? data.metaTags : "",
    route: data.route ? data.route : "",
  })

  const [showDataPopup, setShowDataPopup] = useState(false)

  // Include and excludes section
  const addDay = (dayNo) => {
    let newItinerary = itineraryData
    newItinerary.push({
      day: `Day ${dayNo}`,
      details: [],
    })
    setItineraryData([...newItinerary])
  }

  const dayChange = (value, index) => {
    let newItinerary = itineraryData
    newItinerary[index].day = value
    setItineraryData([...newItinerary])
  }

  const titleChange = (value, index) => {
    let newItinerary = itineraryData
    newItinerary[index].title = value
    setItineraryData([...newItinerary])
  }

  const detailChange = (value, index) => {
    let newItinerary = itineraryData
    newItinerary[index].detail = value
    setItineraryData([...newItinerary])
  }

  const removeDay = (index) => {
    let newItinerary = itineraryData
    newItinerary = newItinerary.filter((value, i) => i !== index)
    setItineraryData([...newItinerary])
  }

  const saveItinerary = async () => {
    data.itinerary = itineraryData
    const result = await updatePackage(data)
    navigate(0)
  }

  const changeIncludes = (value, index) => {
    let newIncludes = includesData
    newIncludes[index] = value
    setIncludesData([...newIncludes])
  }

  const addIncludes = () => {
    setIncludesData([...includesData, "New Includes"])
  }

  const saveIncludes = async () => {
    data.includes = includesData
    const result = await updatePackage(data)
    navigate(0)
  }

  const removeIncludes = (index) => {
    setIncludesData([...includesData.filter((value, i) => i !== index)])
  }

  const changeExcludes = (value, index) => {
    let newExcludes = excludesData
    newExcludes[index] = value
    setExcludesData([...newExcludes])
  }

  const addExcludes = () => {
    setExcludesData([...excludesData, "New Excludes"])
  }

  const saveExcludes = async () => {
    data.excludes = excludesData
    const result = await updatePackage(data)
    navigate(0)
  }

  const removeExcludes = (index) => {
    setExcludesData([...excludesData.filter((value, i) => i !== index)])
  }

  const changeBooking = (value, field, index) => {
    const newBookingData = bookingData
    newBookingData[index][`${field}`] = value
    setBookingData([...newBookingData])
  }

  const addBooking = () => {
    setBookingData([...bookingData, { date: "", spaceAvailable: "" }])
  }

  const saveBooking = async () => {
    data.fixedDepartures = bookingData
    const result = await updatePackage(data)
    navigate(0)
  }

  const removeBooking = (index) => {
    setBookingData([...bookingData.filter((value, i) => i !== index)])
  }

  // Image handling
  // Working with Image Cropper
  const [imageToCrop, setImageToCrop] = useState(undefined)
  const [croppedImage, setCroppedImage] = useState(undefined)

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

  const onInputChange = (e) => {
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
      data.image.push(result.filename)
      const response = await updatePackage(data)
      if (response.success) {
        alert("Image Added Successfully")
        navigate(0)
      }
    } else {
      alert("Something went wrong. Please try again")
    }
  }

  // highlights Section
  const highlights = [
    { text: "Duration", value: data.duration, icon: StopWatch },
    { text: "Max Altitude", value: data.maxAltitude, icon: MaxAltitude },
    { text: "Best Season", value: data.bestSeason, icon: BestSeason },
    { text: "Grade", value: data.grade, icon: Grade },
  ]

  const highlightsComponents = (
    <HighlightsComponentContainer
      style={{ marginTop: "1.5vw" }}
      ref={inViewRef}
      className={isInView ? "animate" : ""}
    >
      <SmallTitle>Highlights</SmallTitle>
      <RightContainer>
        {highlights.map((value, index) => (
          <HighlightCard
            text={value.text}
            value={value.value}
            icon={value.icon}
            key={index}
          />
        ))}
      </RightContainer>
      <div style={{ marginTop: "2vw" }}></div>
      <SmallTitle>Share on Socials</SmallTitle>
      <RightContainerImg>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=http%3A//45.115.217.62/package/${data.route}`}
          target="_blank"
        >
          <img src={Facebook} alt="Facebook" width="40px" />
        </a>
        <a
          href="https://www.instagram.com/pioneer_expeditions/?"
          target="_blank"
        >
          <img src={Instagram} alt="Facebook" width="40px" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=Check%20out%20pioneer%20on%3A%20pioneeradventure.com/package/${data.route}`}
          target="_blank"
        >
          <img src={Twitter} alt="Facebook" width="40px" />
        </a>
      </RightContainerImg>
      <SmallTitle>Contact us</SmallTitle>
      <InquiryWrapper>
        <InquiryButton
          to={`/inquiry/${data.name}`}
          target="_blank"
          state={{
            packageName: data.name,
            type: "Inquiry",
          }}
        >
          Inquiry
        </InquiryButton>

        <InquiryButton
          to={`/inquiry/${data.name}`}
          target="_blank"
          state={{
            packageName: data.name,
            type: "Book Now",
          }}
        >
          Book Now
        </InquiryButton>
      </InquiryWrapper>

      <div style={{ marginTop: "4vw" }}></div>
      {data.youtubeLink && (
        <RightContainer>
          <IframeContainer
            src={data.youtubeLink}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
            allowfullscreen
          ></IframeContainer>
        </RightContainer>
      )}
    </HighlightsComponentContainer>
  )

  const changeOtherData = (field, value) => {
    const newOtherData = otherData
    newOtherData[`${field}`] = value
    setOtherData({ ...newOtherData })
  }

  const saveOtherData = async () => {
    data.duration = otherData.duration
    data.maxAltitude = otherData.maxAltitude
    data.bestSeason = otherData.bestSeason
    data.grade = otherData.grade
    data.facebookShareLink = otherData.facebookShareLink
    data.instagramShareLink = otherData.instagramShareLink
    data.twitterShareLink = otherData.twitterShareLink
    data.youtubeLink = otherData.youtubeLink
    data.packageNo = otherData.packageNo
    data.metaTags = otherData.metaTags
    data.route = otherData.route

    const result = await updatePackage(data)
    if (result.success) {
      navigate(0)
    } else {
      alert("Something went wrong. Please try again later")
    }
  }

  // Changing the order of images and removing them
  const imageMoveUp = async (index) => {
    const newData = data
    let oldValue = newData.image[index]
    newData.image[index] = newData.image[index - 1]
    newData.image[index - 1] = oldValue
    const result = await updatePackage(newData)
    if (result.success) {
      navigate(0)
    } else {
      alert("Something went wrong")
    }
  }

  const removeImage = async (index) => {
    let newData = data

    newData.image = newData.image.filter((value, i) => i !== index)
    const result = await updatePackage(newData)
    if (result.success) {
      navigate(0)
    } else {
      alert("Something went wrong")
    }
  }

  // Image to show for carousel
  const imageNumber = useRef(0)
  const [imageValue, setImageValue] = useState(0)
  const [resetInterval, setResetInterval] = useState(true)

  useEffect(() => {
    const imageInterval = setInterval(() => {
      if (data) {
        imageNumber.current =
          imageNumber.current < data.image.length - 1
            ? imageNumber.current + 1
            : 0

        setImageValue(imageNumber.current)
      }
    }, 3000)

    return () => clearInterval(imageInterval)
  }, [data, resetInterval])

  console.log("Logging data:  ", data)

  const pdfRef = useRef()

  const pdfGen = useCallback(() => {
    const jspdf = new jsPDF("p", "pt", "a4", true)
    let title = data.name.replace(/<\/?[^>]+(>|$)/g, "")
    let content = data.content.replace(/<\/?[^>]+(>|$)/g, "")

    const over6000m = `<div style="page-break-before: always;width: 100%; border: 1px solid black; text-align: center; min-height: auto; padding-bottom: 20px;">
    <div style="padding: 10px 0; font-size: 20px; color: #004a8c; font-weight: bold;">Climbing Equimpent for above 6000 meters Mountains</div>
    <div style="display: flex; border-top: 1px solid black;  ">
    <div style="flex: 1; border-right: 1px solid black;">
        <div style="margin: 0px 0 0 10px; font-size: 18px; color: #004a8c; font-weight: bold; text-align: left;">Upper Body</div>
        <ul style="text-align: left; margin-left: 15px;">
          <li>Short-Sleeved Shirts/T-shirts</li>
          <li>Lightweight Top / Thermo Coat</li>
          <li>Midweight Top</li>
          <li>Synthetic or Fleece Jacket</li>
          <li>Down Insulated Jacket</li>
          <li>Gore-Tex Jacket</li>
        </ul>
        
        <div style="padding: 10px 0 0 10px; font-size: 18px; color: #004a8c; font-weight: bold; text-align: left;">Lower Body</div>
        <ul style="text-align: left;margin-left: 15px;">
          <li>Lightweight Long Underpants</li>
          <li>Mid weight Long Underpants</li>
          <li>Trekking Pants</li>
          <li>Synthetic Insulated Pant</li>
          <li>Gore-Tex Pants</li>
          <li>Trekking & Climbing Socks (4 Pairs)</li>
          <li>Summit Socks (1 Pairs)</li>
        </ul>
        
        <div style="padding: 20px 0 0 30px; font-size: 18px; color: #004a8c; font-weight: bold; text-align: left;">Hand & Head</div>
        <ul style="text-align: left;margin-left: 15px;">
          <li>Lightweight Synthetic Liner Glove</li>
          <li>Wind Stopper Fleece Gloves</li>
          <li>Heavy Gloves (Mitten)</li>
          <li>Sun Cap</li>
          <li>Wool / Fleece Hat</li>
          <li>Balaclava</li>
          <li>Neck Gaiter / High Neck</li>
        </ul>
      </div>
      <div style="flex: 1; ">
        <div style="padding: 0 0 0 10px; font-size: 18px; color: #004a8c; font-weight: bold; text-align: left;">Technical Devices / Climbing Gears</div>
        <ul style="text-align: left; margin-left: 25px;">
          <li>Climbing Helmet</li>
          <li>Headlamp with Spare Batteries (Petzl / BD)</li>
          <li>Ice Axe Semi-technical</li>
          <li>Crampons</li>
          <li>Harness</li>
          <li>Carabineers (Both Lock & Unlock)</li>
          <li>Ascenders / Jumar</li>
          <li>Belay Device (ATC Guide/Figure of 8)</li>
          <li>Assistant Rope</li>
          <li>Tape Sling</li>
          <li>1 Sleeping Bag: -30 C</li>
          <li>Thermarest Cell Foam Mattress</li>
          <li>Sun/Glacier Glasses UV Protection</li>
          <li>Snow Goggle UV Protection</li>
          <li>Rucksacks (45 - 55 Ltr.)</li>
          <li>1 Duffel Bag</li>
          <li>Water Bottles</li>
          <li>Thermos / Flask</li>
          <li>1 Set Extendable Trekking Poles (BD Alpine Flz)</li>
          <li>Swiss Knife</li>
          <li>Alpine Boot / G2SM</li>
          <li>Sandals</li>
          <li>Lightweight Hiking/Trekking Boots</li>
        <ul>
      </div>
      
    </div>
  </div>`

    const over7000m = `<div style="page-break-before: always;width: 100%; border: 1px solid black; text-align: center; min-height: auto; padding-bottom: 20px;">
  <div style="padding: 10px 0; font-size: 20px; color: #004a8c; font-weight: bold;">Climbing Equimpent for above 7000 meters Mountains</div>
  <div style="display: flex; border-top: 1px solid black;  ">
  <div style="flex: 1; border-right: 1px solid black;">
      <div style="margin: 0px 0 0 10px; font-size: 18px; color: #004a8c; font-weight: bold; text-align: left;">Upper Body</div>
      <ul style="text-align: left; margin-left: 15px;">
        <li>Short-Sleeved Shirts/T-shirts</li>
        <li>Lightweight Top / Thermo Coat</li>
        <li>Midweight Top</li>
        <li>Synthetic or Fleece Jacket</li>
        <li>Down Insulated Jacket</li>
        <li>Windproof Jacket</li>
        <li>Sunscreen/ Lip Guard</li>
        <li>Gore-Tex Jacket</li>
      </ul>
      
      <div style="padding: 10px 0 0 10px; font-size: 18px; color: #004a8c; font-weight: bold; text-align: left;">Lower Body</div>
      <ul style="text-align: left;margin-left: 15px;">
        <li>Lightweight Long Underpants</li>
        <li>Mid weight Long Underpants</li>
        <li>Heavyweight Long Underpants</li>
        <li>Trekking Pants</li>
        <li>Synthetic Insulated Pant</li>
        <li>Down / Synthetic Insulated Pants</li>
        <li>Gore-Tex Pants</li>
        <li>Trekking & Climbing Socks (4 Pairs)</li>
        <li>Summit Socks (1 Pairs)</li>
      </ul>
      
      <div style="padding: 20px 0 0 30px; font-size: 18px; color: #004a8c; font-weight: bold; text-align: left;">Hand & Head</div>
      <ul style="text-align: left;margin-left: 15px;">
        <li>Lightweight Synthetic Liner Glove</li>
        <li>Wind Stopper Fleece Gloves</li>
        <li>Summit Gloves</li>
        <li>Heavy Gloves (Mitten)</li>
        <li>Sun Cap</li>
        <li>Wool / Fleece Hat</li>
        <li>Balaclava</li>
        <li>Hand Warmer</li>
        <li>Neck Gaiter / High Neck</li>
      </ul>
    </div>
    <div style="flex: 1; ">
      <div style="padding: 0 0 0 10px; font-size: 18px; color: #004a8c; font-weight: bold; text-align: left;">Technical Devices / Climbing Gears</div>
      <ul style="text-align: left; margin-left: 25px;">
        <li>Climbing Helmet</li>
        <li>Headlamp with Spare Batteries (Petzl / BD)</li>
        <li>Summit Down Suits (Kailas / Marmot / The North Face)</li>
        <li>Ice Axe Semi-technical</li>
        <li>Crampons</li>
        <li>Harness</li>
        <li>Carabineers (Both Lock & Unlock)</li>
        <li>Ascenders / Jumar</li>
        <li>Belay Device (ATC Guide/Figure of 8)</li>
        <li>Assistant Rope</li>
        <li>Tape Sling</li>
        <li>2 Sleeping Bag: -30 +C to -40 +C</li>
        <li>Thermarest Inflatable Mattress</li>
        <li>Thermarest Cell Foam Mattress</li>
        <li>Sun/Glacier Glasses UV Protection</li>
        <li>Snow Goggle UV Protection</li>
        <li>Rucksacks (45 - 55 Ltr.)</li>
        <li>2 Duffel Bag</li>
        <li>Water Bottles</li>
        <li>Thermos / Flask</li>
        <li>Pee Bottle</li>
        <li>1 Set Extendable Trekking Poles (BD Alpine Flz)</li>
        <li>Swiss Knife</li>
        <li>Mug, Plastic Bowl, Fork & Spoon</li>
        <li>Alpine Boot / G2SM</li>
        <li>Sandals</li>
        <li>Lightweight Hiking/Trekking Boots</li>
        <li>Camp Booties</li>
      <ul>
    </div>
    
  </div>
</div>`

    const over8000m = `<div style="page-break-before: always;width: 100%; border: 1px solid black; text-align: center; min-height: auto; padding-bottom: 20px;">
<div style="padding: 10px 0; font-size: 20px; color: #004a8c; font-weight: bold;">Climbing Equimpent for above 8000 meters Mountains</div>
<div style="display: flex; border-top: 1px solid black;  ">
<div style="flex: 1; border-right: 1px solid black;">
    <div style="margin: 0px 0 0 10px; font-size: 18px; color: #004a8c; font-weight: bold; text-align: left;">Upper Body</div>
    <ul style="text-align: left; margin-left: 15px;">
      <li>Short-Sleeved Shirts/T-shirts</li>
      <li>Lightweight Top / Thermo Coat - 2</li>
      <li>Midweight Top - 2</li>
      <li>Heavyweight Top</li>
      <li>Synthetic or Fleece Jacket</li>
      <li>Down Insulated Jacket</li>
      <li>Gore-Tex Jacket</li>
      <li>Sunscreen(-50spf)</li>
      <li>Lip Guard(-20/-50spf)</li>
    </ul>
    
    <div style="padding: 10px 0 0 10px; font-size: 18px; color: #004a8c; font-weight: bold; text-align: left;">Lower Body</div>
    <ul style="text-align: left;margin-left: 15px;">
      <li>Lightweight Long Underpants - 2</li>
      <li>Mid weight Long Underpants - 2</li>
      <li>Heavyweight Long Underpants</li>
      <li>Trekking Pants - 2</li>
      <li>Synthetic Insulated Pant</li>
      <li>Down / Synthetic Insulated Pants</li>
      <li>Gore-Tex Pants</li>
      <li>Trekking & Climbing Socks (5-7 Pairs)</li>
      <li>Summit Socks (3 Pairs)</li>
    </ul>
    
    <div style="padding: 20px 0 0 30px; font-size: 18px; color: #004a8c; font-weight: bold; text-align: left;">Hand & Head</div>
    <ul style="text-align: left;margin-left: 15px;">
      <li>Lightweight Synthetic Liner Glove</li>
      <li>Wind Stopper Fleece Gloves</li>
      <li>Summit Gloves</li>
      <li>Heavy Gloves (Mitten)</li>
      <li>Sun Cap</li>
      <li>Wool / Fleece Hat</li>
      <li>Balaclava</li>
      <li>Hand Warmer</li>
      <li>Neck Gaiter / High Neck</li>
    </ul>
  </div>
  <div style="flex: 1; ">
    <div style="padding: 0 0 0 10px; font-size: 18px; color: #004a8c; font-weight: bold; text-align: left;">Technical Devices / Climbing Gears</div>
    <ul style="text-align: left; margin-left: 25px;">
      <li>Climbing Helmet</li>
      <li>Headlamp with Spare Batteries (Petzl / BD)</li>
      <li>Summit Down Suits (Kailas / Marmot / The North Face)</li>
      <li>Ice Axe Semi-technical</li>
      <li>Crampons</li>
      <li>Harness</li>
      <li>Carabineers (Both Lock & Unlock)</li>
      <li>Ascenders / Jumar</li>
      <li>Belay Device (ATC Guide/Figure of 8)</li>
      <li>Assistant Rope</li>
      <li>Tape Sling</li>
      <li>2 Sleeping Bag: -30 +C to -40 +C</li>
      <li>Thermarest Inflatable Mattress</li>
      <li>Thermarest Cell Foam Mattress</li>
      <li>Sun/Glacier Glasses UV Protection</li>
      <li>Snow Goggle UV Protection</li>
      <li>Rucksacks (45 - 55 Ltr.)</li>
      <li>2 Duffel Bag</li>
      <li>Water Bottles</li>
      <li>Thermos / Flask</li>
      <li>Pee Bottle</li>
      <li>1 Set Extendable Trekking Poles (BD Alpine Flz)</li>
      <li>Swiss Knife</li>
      <li>Mug, Plastic Bowl, Fork & Spoon</li>
      <li>Alpine Boot / G2SM</li>
      <li>Sandals</li>
      <li>Lightweight Hiking/Trekking Boots</li>
      <li>Camp Booties</li>
    <ul>
  </div>
  
</div>
</div>`

    const trekking = `<div style="page-break-before: always;width: 100%; border: 1px solid black; text-align: center; min-height: auto; padding-bottom: 20px;">
<div style="padding: 10px 0; font-size: 20px; color: #004a8c; font-weight: bold;">Equipment for Trekking</div>

    <ul style="text-align: left; margin-left: 15px; border-top: 1px solid black">
      <li>A lightweight 800pro down jacket</li>
      <li>High neck/Hat/Lip guard/ Sun blog</li>
      <li>Gore-Tex Jacket &amp; Pants</li>
      <li>Shorts/T-shirts</li>
      <li>Thermal set</li>
      <li>Down vest and/or jacket (optional)</li>
      <li>Trekking/Hiking boots with spare laces &amp; sandals</li>
      <li>Trekking/Hiking poles</li>
      <li>Trekking socks (3 pairs)</li>
      <li>Head lamp with extra batteries</li>
      <li>Daypack (35 - 45L)</li>
      <li>Water bottles</li>
      <li>Small wash towel</li>
      <li>Sleeping bag rated to -15 – -20 (available in rent)</li>
      <li>Duffle bag</li>
    </ul> 
</div>`

    const requiredHTML = `<div style="padding: 0; margin:0; box-sizing: border-box;">
    <div style="box-sizing: border-box; padding: 0; margin:0; position: relative; height: ${jspdf.internal.pageSize.getHeight()}px; overflow: hidden;">
      <img src='${apiImageLink}${data.image[0]}' style="height: ${
      jspdf.internal.pageSize.getHeight() * 0.5
    }px; object-fit: cover; position: absolute; top: 0; " alt="Image"/>
      <div style="position: absolute; top: 46%; left: 0; background: #004aad; height: ${
        jspdf.internal.pageSize.getHeight() * 0.35
      }px; width: ${jspdf.internal.pageSize.getWidth() * 0.35}px;"></div>
      <h1 style="color: #fff; font-size: 32px; position: absolute; top: 55%; left: 10%; font-family: Arial; font-weight: normal;">${
        data.maxAltitude
      }</h1>
      <h1 style="color: #004aad; font-size: 32px; position: absolute; top: 55%; left: 37%; font-family: Arial; font-weight: normal; ">${
        data.duration
      }</h1>
      <h1 style="color: #000; font-size: 50px; position: absolute; top: 60%; left: 10%; font-family: Arial; font-weight: bold; max-width: 80%;">${title.toUpperCase()}</h1>
      
      <h1 style="color: #000; font-size: 32px; position: absolute; top: 85%; left: 10%; font-family: Arial; font-weight: normal; ">
        BEST TIME
      </h1>
      <h1 style="color: #000; font-size: 32px; position: absolute; top: 90%; left: 10%; font-family: Arial; font-weight: normal; ">${data.bestSeason.toUpperCase()}</h1>


      <div style="position: absolute; top: 54%; left: 7.5%; height: 18%; width: 3px; background: #000; "></div>
      <div style="position: absolute; top: 0; bottom: 0; right: 0; left: 97%; background:#004aad; z-index: 5; writing-mode: vertical-rl; text-orientation: mixed; "></div>
    </div>

      <div style="box-sizing: border-box; padding: 5% 7.5%; overflow: hidden; margin:0; position: relative; height: ${jspdf.internal.pageSize.getHeight()}px; overflow: hidden;">
      <div style="position: absolute; top: 10px; right: 7.5%; width: 80px ; height: 80px; " ><img src='${Logo}'/></div>
       
      <div style="text-align: justify; font-family: sans-serif; color: #333; font-size: 110%;margin-top: 20px; ">
          <p>
            ${content} 
          </p>
          <br />
          <h3>OUR TEAM</h3>
          <p>
            Extraordinary feats require extraordinary skills and preparation, and the safety and well-being of our
            expedition members is our principal concern. When you join our accomplished teams, you are in the most
            skillful and qualified hands in the mountains. Our real-world experience makes the crucial difference
            between a successful summit and an attempted one.
          </p>
          <br />
          <h3>OUR VALUES</h3>
          <p>  
            Buisness Challenges is managed by Sherpas with a combined mountaineering experience of 6
            decades. All our personnel are from the Mountain regions of Nepal and their care and safety is as
            important to us as our clients. We do not cut costs, but offer you competitive rates that does not affect or
            jeopardize the safety of the members of the expedition.
            We do not cater to mass tourism and are proud of expeditions we are committed to each year. We are
            unwavering in our obligations to provide our clients with a safe, comfortable, experiential experience they
            have invested so much in.
          </p>
        </div>
        <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; text-align: center; font-size: 60%; ">
            <div>Business Challenges., Kathmandu, Nepal.</div>
            <div>WhatsApp: 9863840616</div>
            <div>Email: neupanebijen@gmail.com, </div>
          </div>
      </div>
      
      <div style="font-size: 110%; box-sizing: border-box; padding: 5% 7.5%; overflow: hidden; margin:0; position: relative;  height: ${jspdf.internal.pageSize.getHeight()}px; overflow: hidden;">
          <h2 style="page-break-before: always;color:#333; text-align: center; ">Itinerary</h2>
          <table style="border-collapse: collapse; width: 100%; ">
            <tr style="background: #333; color: #fff;">
              <th>Days</th>
              <th>Agenda</th>
            </tr>
            ${data.itinerary
              .map((data, index) => {
                return `<tr style="border:none"><td style="border: none;background: ${
                  index % 2 === 1 ? "#fff" : "#ccc"
                };">${data.day}</td>  <td style="border: none; background: ${
                  index % 2 === 0 ? "#fff" : "#ccc"
                };"> ${data.title}</td></tr>`
              })
              .join("")}
          </table>
          <div style="position: absolute; top: 10px; right: 7.5%; width: 80px ; height: 80px; " ><img src='${Logo}'/></div>
          <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; text-align: center; font-size: 60%; ">
            <div>Business Challenges, Kathmandu, Nepal.</div>
            <div>WhatsApp: 9863840616,</div>
            <div>Email: neupanebijen@gmail.com</div>
          </div>
      </div>

      <div style="font-size: 110%; tex-align:left;  box-sizing: border-box; padding: 5% 7.5%; overflow: hidden; margin:0; position: relative; height: ${jspdf.internal.pageSize.getHeight()}px; overflow: hidden;">
      <h2 style="page-break-before: always;color:#333; text-align: center; ">Includes</h2>
        <div>${data.includes
          .map((data, index) => {
            return `<div style="position: relative;"><span style="width: 5px; height: 4px; border-radius: 50%; background: #004a8c;display: block; position: absolute; left:-10px; top: 5px; "></span> ${data}</div>`
          })
          .join("")}</div>
          <br />
          <br />
          <h2 style="page-break-before: always;color:#333; text-align: center; ">Excludes</h2>
          <div>${data.excludes
            .map((data, index) => {
              return `<div style="position: relative;"><span style="width: 5px; height: 4px; border-radius: 50%; background: #004a8c;display: block; position: absolute; left:-10px; top:5px; "></span> ${data}</div>`
            })
            .join("")}</div>
          <div style="position: absolute; top: 10px; right: 7.5%; width: 80px ; height: 80px; " ><img src='${Logo}'/></div>
          <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; text-align: center; font-size: 60%; ">
          <div>Business Challenges, Kathmandu, Nepal.</div>
            <div>WhatsApp: 9863840616,</div>
            <div>Email: neupanebijen@gmail.com</div>
        </div>
      </div>

      <div style="box-sizing: border-box; padding: 5% 7.5%; overflow: hidden; margin:0; position: relative; min-height: ${jspdf.internal.pageSize.getHeight()}px; overflow: hidden;">
        <div style="position: absolute; top: 10px; right: 7.5%; width: 80px ; height: 80px; " ><img src='${Logo}'/></div>
          
        ${
          data.tags.includes("over8000m")
            ? over8000m
            : data.tags.includes("over7000m")
            ? over7000m
            : data.tags.includes("over6000m")
            ? over6000m
            : trekking
        }
          <br /> 
          <br />
          <div>Business Challenges, Kathmandu, Nepal.</div>
            <div>WhatsApp: 9863840616,</div>
            <div>Email: neupanebijen@gmail.com</div>
        </div>
      </div>
      </div>
    `

    //     const requiredHTML = `<div>
    // ${pdfRef.current}
    // <div style="display: flex; justify-content: center; "><img src='${Logo}' style="width: 200px; transform: translateX(-10px);  " /></div>
    // <br />
    // <br />
    // <h1 style="color:#004a8c; text-align: center;">${title}</h1>
    // <div style="display: flex; justify-content: center; width: 100%; transform: translateX(-6px) translateY(-8px); "><div style="width: 152px; height: 2px; text-align: center; background: #004a8c"></div></div>
    // <br/>
    // <br/>
    // <div style="display: flex; justify-content: center; "><img src='${apiImageLink}${
    //   data.image[0]
    // }' style="width: 100%;border-radius: 50px;" alt="Image"/></div>
    // <br />
    //   <div style="text-align: left"><p>${content}</p></div>
    //   <br />
    //   <br />
    //   <h1 style="page-break-before: always;color:#004a8c">Itinerary</h1>

    //   <p>${data.itinerary
    //     .map((data) => {
    //       return `${data.day} :  ${data.title} <br />`
    //     })
    //     .join("")}</p>
    //   <br />
    //   <br />
    //   <h1 style="color:#004a8c">Includes</h1>
    // <p>${data.includes
    //   .map((data, index) => {
    //     return `${index + 1}. ${data} <br />`
    //   })
    //   .join("")}</p>
    //   <br />
    //   <br />
    //   <h1 style="color:#004a8c">Excludes</h1>
    // <p>${data.excludes
    //   .map((data, index) => {
    //     return `${index + 1}. ${data} <br />`
    //   })
    //   .join("")}</p>
    //   <br />
    //   <br />
    //   <br />
    //   ${
    //     data.tags.includes("over8000m")
    //       ? over8000m
    //       : data.tags.includes("over7000m")
    //       ? over7000m
    //       : data.tags.includes("over6000m")
    //       ? over6000m
    //       : trekking
    //   }
    //   <br />
    //   <br />
    //   <h2 style="color:#004a8c">Head Office</h2>
    // <p><b>Sagarmatha Chowk, Budhanilkantha 44600, Kathmandu</b></p>
    //   <p><b>Contact no</b>: 01-4811067</p>
    //   <p><b>Email</b>: pioneeradvent@gmail.com</p>
    //   </div>
    // `
    // Generate PDF
    const generatePDF = () => {
      console.log("logging Data from pdfgen", data)
      const datapdf = {
        callback: function (jspdf) {
          jspdf.save(`${data.name}.pdf`)
        },
        width: jspdf.internal.pageSize.getWidth(),
        windowWidth: jspdf.internal.pageSize.getWidth(),
        margin: [0, 0, 0, 0],
        autoPaging: "text",
      }

      jspdf.html(requiredHTML, datapdf)
    }

    generatePDF()
  }, [data])

  const innerMenuScrollTo = (scrollIndex) => {
    window.scrollTo(0, window.innerHeight * scrollIndex)
  }

  return (
    <>
      <OuterContainer>
        {isInView && scrollY > window.innerHeight * 0.82 && (
          <LowerMenu>
            <LowerMenuLink onClick={() => innerMenuScrollTo(0.91)}>
              Details
            </LowerMenuLink>
            <LowerMenuLink onClick={() => innerMenuScrollTo(1.97)}>
              Images
            </LowerMenuLink>
            <LowerMenuLink href="#itinerary" onClick={() => setActiveMenu(0)}>
              Itinerary
            </LowerMenuLink>
            <LowerMenuLink href="#itinerary" onClick={() => setActiveMenu(1)}>
              Includes
            </LowerMenuLink>
            <LowerMenuLink href="#itinerary" onClick={() => setActiveMenu(2)}>
              Excludes
            </LowerMenuLink>
            <LowerMenuLink href="#itinerary" onClick={() => setActiveMenu(3)}>
              Fixed Departure
            </LowerMenuLink>
          </LowerMenu>
        )}
        <SideBar>
          <a href={`https://www.facebook.com/`} target="_blank">
            <img src={Facebook} alt="Facebook" width="40px" />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <img src={Instagram} alt="Facebook" width="40px" />
          </a>
          <a
            href={`https://api.whatsapp.com/send/?phone=9863840616&text=Hello+i+am+Bijen&type=phone_number&app_absent=0`}
            target="_blank"
          >
            <img src={Whatsapp} alt="Facebook" width="40px" />
          </a>
        </SideBar>
        {/* Popup to edit the highlights data */}
        {showDataPopup && (
          <DataPopup>
            <SmallTitle>
              <span style={{ color: "#000" }}>Edit data</span>
            </SmallTitle>
            <label>Duration</label>
            <input
              type="text"
              value={otherData.duration}
              onChange={(e) => changeOtherData("duration", e.target.value)}
            />

            <label>Max Altitude</label>
            <input
              type="text"
              value={otherData.maxAltitude}
              onChange={(e) => changeOtherData("maxAltitude", e.target.value)}
            />

            <label>Best Season</label>
            <input
              type="text"
              value={otherData.bestSeason}
              onChange={(e) => changeOtherData("bestSeason", e.target.value)}
            />

            <label>Grade</label>
            <input
              type="text"
              value={otherData.grade}
              onChange={(e) => changeOtherData("grade", e.target.value)}
            />

            <label>Facebook Share Link</label>
            <input
              type="text"
              value={otherData.facebookShareLink}
              onChange={(e) =>
                changeOtherData("facebookShareLink", e.target.value)
              }
            />
            <label>Twitter Share Link</label>
            <input
              type="text"
              value={otherData.twitterShareLink}
              onChange={(e) =>
                changeOtherData("twitterShareLink", e.target.value)
              }
            />
            <label>Instagram Share Link</label>
            <input
              type="text"
              value={otherData.instagramShareLink}
              onChange={(e) =>
                changeOtherData("instagramShareLink", e.target.value)
              }
            />
            <label>Youtube Link</label>
            <input
              type="text"
              value={otherData.youtubeLink}
              onChange={(e) => changeOtherData("youtubeLink", e.target.value)}
            />
            <label>Package No</label>
            <input
              type="text"
              value={otherData.packageNo}
              onChange={(e) => changeOtherData("packageNo", e.target.value)}
            />
            <label>Meta Tags</label>
            <input
              type="text"
              value={otherData.metaTags}
              onChange={(e) => changeOtherData("metaTags", e.target.value)}
            />
            <label>Route</label>
            <input
              type="text"
              value={otherData.route}
              onChange={(e) => changeOtherData("route", e.target.value)}
            />
            <AddButton onClick={saveOtherData} style={{ display: "block" }}>
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
            Edit Other Info
          </OtherButton>
        )}

        {/* The section for the main text */}
        <InfoSection
          title={title}
          text={text}
          showEditor={true}
          data={data}
          ref={inViewRef}
          updateData={updatePackage}
          isExpeditionSinglePage={true}
          sideContent={highlightsComponents}
          isAdmin={isAdmin}
        ></InfoSection>

        {/* The section for the carousel  */}
        <Carousel id="images">
          <AnimatePresence>
            <CarouselImage
              src={`${apiImageLink}${data.image[imageValue]}`}
              length={data.image.length}
              loading="lazy"
            />
            <DotsContainer>
              {data.image.map((value, index) => (
                <Dots
                  key={index}
                  className={imageNumber.current === index ? "active" : ""}
                  onClick={() => {
                    imageNumber.current = index
                    setImageValue(imageNumber.current)
                    setResetInterval(!resetInterval)
                  }}
                />
              ))}
            </DotsContainer>
          </AnimatePresence>
        </Carousel>

        {isAdmin && (
          <>
            <form onSubmit={onFormSubmit} style={{ padding: "0 6vw" }}>
              <h1 style={{ color: "black" }}>
                Image Upload(Updating Image Crop soon)
              </h1>
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
              {data.image.map((value, index) => (
                <div>
                  <span>
                    {index + 1}. {value}
                  </span>{" "}
                  {index !== 0 && (
                    <>
                      <button onClick={() => imageMoveUp(index)}>
                        Move Up
                      </button>
                      <button onClick={() => removeImage(index)}>Remove</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* The section for itineraries */}
        <NewSectionTitle text="Trip Details" />
        <Container onClick={(e) => {}}>
          {/* The menu */}
          <MenuContainer id="itinerary">
            <MenuItem
              className={activeMenu === 0 && "active"}
              onClick={() => setActiveMenu(0)}
            >
              Itinerary
            </MenuItem>
            <MenuItem
              className={activeMenu === 1 && "active"}
              onClick={() => setActiveMenu(1)}
            >
              Includes
            </MenuItem>
            <MenuItem
              className={activeMenu === 2 && "active"}
              onClick={() => setActiveMenu(2)}
            >
              Excludes
            </MenuItem>
            <MenuItem
              className={activeMenu === 3 && "active"}
              onClick={() => setActiveMenu(3)}
            >
              Fixed Departure
            </MenuItem>
          </MenuContainer>

          {/* For showing the Data */}
          {activeMenu === 0 && (
            <InfoComponentItinerary list={data.itinerary} icon={Itinerary} />
          )}
          {activeMenu === 1 && (
            <InfoComponent list={data.includes} icon={Includes} />
          )}
          {activeMenu === 2 && (
            <InfoComponent list={data.excludes} icon={Excludes} />
          )}
          {activeMenu === 3 && <BookingComponent list={data.fixedDepartures} />}
          {/* {isAdmin && activeMenu !== 3 && (
          <AddButton onClick={() => setShowPopup(true)}>Edit</AddButton>
        )} */}

          {/* For Changing the data */}
          {isAdmin && (
            <PopupContainer onClick={(e) => e.stopPropagation()}>
              {activeMenu === 0 && (
                <>
                  {itineraryData.map((value, index) => (
                    <div key={`${value._id}${index}`}>
                      <input
                        value={value.day}
                        onChange={(e) => dayChange(e.target.value, index)}
                      />

                      <input
                        value={value.title}
                        placeholder="Title"
                        onChange={(e) => titleChange(e.target.value, index)}
                      />
                      <textarea
                        value={value.detail}
                        onChange={(e) => detailChange(e.target.value, index)}
                        placeholder="Detail"
                      />
                      <button onClick={() => removeDay(index)}>
                        Remove Day
                      </button>
                    </div>
                  ))}
                  <div>
                    <button onClick={() => addDay(itineraryData.length + 1)}>
                      Add Day
                    </button>
                  </div>
                  <div>
                    <button onClick={() => saveItinerary()}>Save</button>
                  </div>
                </>
              )}
              {activeMenu === 1 && (
                <>
                  {includesData.map((value, index) => {
                    return (
                      <div key={value._id ? value._id : index * 500}>
                        <input
                          value={includesData[index]}
                          onChange={(e) =>
                            changeIncludes(e.target.value, index)
                          }
                        />
                        <button onClick={() => removeIncludes(index)}>
                          Remove
                        </button>
                      </div>
                    )
                  })}
                  <div>
                    <button onClick={() => addIncludes()}>Add Includes</button>
                  </div>
                  <div>
                    <button onClick={() => saveIncludes()}>Save</button>
                  </div>
                </>
              )}
              {activeMenu === 2 && (
                <>
                  {excludesData.map((value, index) => {
                    return (
                      <div key={value._id ? value._id : index * 500}>
                        <input
                          value={excludesData[index]}
                          onChange={(e) =>
                            changeExcludes(e.target.value, index)
                          }
                        />
                        <button onClick={() => removeExcludes(index)}>
                          Remove
                        </button>
                      </div>
                    )
                  })}
                  <div>
                    <button onClick={() => addExcludes()}>Add Excludes</button>
                  </div>
                  <div>
                    <button onClick={() => saveExcludes()}>Save</button>
                  </div>
                </>
              )}
              {activeMenu === 3 && (
                <>
                  {bookingData.map((value, index) => {
                    return (
                      <div key={value._id ? value._id : index * 500}>
                        <input
                          value={bookingData[index].date}
                          onChange={(e) =>
                            changeBooking(e.target.value, "date", index)
                          }
                          placeholder="tripDate"
                        />
                        <input
                          value={bookingData[index].spaceAvailable}
                          onChange={(e) =>
                            changeBooking(
                              e.target.value,
                              "spaceAvailable",
                              index
                            )
                          }
                          placeholder="spaceAvailable"
                        />
                        <button onClick={() => removeBooking(index)}>
                          Remove
                        </button>
                      </div>
                    )
                  })}
                  <div>
                    <button onClick={() => addBooking()}>Add Booking</button>
                  </div>
                  <div>
                    <button onClick={() => saveBooking()}>Save</button>
                  </div>
                </>
              )}
            </PopupContainer>
          )}
        </Container>

        <NewSectionTitle text="Download PDF" />
        <InquiryButton2
          onClick={() => {
            pdfGen()
          }}
        >
          Download PDF
        </InquiryButton2>
      </OuterContainer>
    </>
  )
}

const SideBar = styled.div`
  position: fixed;
  top: 50%;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 11;
`

const InquiryWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 2rem;
`

const InquiryButton2 = styled.div`
  text-decoration: none;
  color: #004a8c;
  border-radius: 20rem;
  font-size: 2rem;
  padding: 1rem;
  background: none;
  border: 3px solid #004a8c;
  cursor: pointer;
  max-width: 20rem;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  margin-left: 5vw;
`

const InquiryButton = styled(Link)`
  text-decoration: none;
  color: #004a8c;
  border-radius: 20rem;
  font-size: 2rem;
  padding: 1rem;
  background: none;
  border: 3px solid #004a8c;
  cursor: pointer;
`

const LowerMenuLink = styled.a`
  text-decoration: none;
  color: #fff;
  cursor: pointer;
`

const LowerMenu = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 22px;
  color: #004a8c;
  padding: 2rem;

  position: fixed;
  top: 0;

  z-index: 11;
  width: 100%;

  background: #004a8c;
  transition: 0.1s all;

  @media (max-width: 900px) {
    display: none;
  }
`
const DataPopup = styled.div`
  position: absolute;
  top: 13vh;
  left: 25vw;
  right: 0;

  background: #e6e6e6;
  width: 50vw;
  height: 107vh;
  z-index: 11;
  padding: 0.3rem 2rem;

  box-shadow: 0px 0px 10px #f5f5f5;
`

const HighlightsComponentContainer = styled.div`
  opacity: 0;

  &.animate {
    animation: 0.3s ${FadeInUpText} ease forwards;
  }
`

const HighlightCard = ({ text, icon, value }) => (
  <HighlightCardContainer>
    <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
      <img src={icon} alt={text} width="20%" height="40px" />
      <div>
        <div style={{ fontWeight: "bold", marginBottom: ".2rem" }}>{text}:</div>
        <div>{value}</div>
      </div>
    </div>
  </HighlightCardContainer>
)

const Dots = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  background: transparent;
  border-radius: 50%;
  border: 2px solid #fff;
  cursor: pointer;

  &.active {
    background: #fff;
  }
`

const DotsContainer = styled.div`
  position: absolute;
  bottom: 6rem;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  gap: 1rem;
`

const CarouselImage = styled(motion.img)`
  width: 100vw;
  background: rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  @media (max-width: 900px) {
    width: 100vw;
    height: auto;
  }
`

const Carousel = styled.div`
  display: flex;
  width: 100vw;
  height: calc(100vw * 9 / 16);
  gap: 2rem;
  padding: 8rem 0 4rem 0;
  flex-wrap: no-wrap;
  position: relative;

  @media (max-width: 900px) {
    width: 100vw;
    height: calc(100vw);

    padding: 4rem 0 2rem 0;
  }
`

const IframeContainer = styled.iframe`
  width: 100%;
  height: 19vw;

  min-height: 30rem;

  @media (max-width: 900px) {
    min-height: 40rem;
  }

  @media (max-width: 600px) {
    min-height: 20rem;
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

  @media (max-width: 900px) {
    font-size: 2.6rem;
    margin-bottom: 0rem;
    margin-top: 2.5rem;
  }
`

const HighlightCardContainer = styled.div`
  padding: 2rem;
  width: 48%;
  max-height: 11rem;
  box-sizing: border-box;

  background: #e6e6e6;
  border-radius: 2rem;

  @media (max-width: 1400px) {
    width: 45%;
  }

  @media (max-width: 900px) {
    font-size: 1.6rem;
    padding: 1.5rem;
    width: 48%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`

const RightContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;

  font-size: 1vw;
  width: 100%;
  margin-top: 1vw;

  @media (max-width: 900px) {
    margin-top: 3rem;
  }
`

const RightContainerImg = styled(RightContainer)`
  justify-content: flex-start;
  gap: 5rem;

  @media (max-width: 900px) {
    margin-top: 1.8vh;
  }
`

const PopupContainer = styled.div`
  width: 100%;
  height: 90vh;

  background: #ddd;
  padding: 3rem;

  top: 5vh;
  left: 10vw;
  overflow: scroll;

  & input {
    padding: 0.5rem 1rem;
    font-size: 2rem;
    margin-top: 1rem; 
    width: 60%; 
  }

  & button {
    padding: 0.5rem; 1rem; 
    font-size: 2rem; 
    margin-top: 1rem; 
  }

  & .save {
    position: absolute; 
    background: #004a8c; 
    color: #fff; 
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
`

const NewSectionTitle = styled(SectionTitle)``

const InfoComponent = ({ list, icon }) => {
  return (
    <InfoContainer>
      {list.map((value, index) => (
        <GetInfoSnippet2 value={value} key={index} icon={icon} />
      ))}
    </InfoContainer>
  )
}

const InfoComponentItinerary = ({ list, icon }) => {
  return (
    <InfoContainer>
      {list.map((value, index) => {
        return <GetInfoSnippet value={value} key={index} />
      })}
    </InfoContainer>
  )
}

const GetInfoSnippet = ({ value }) => {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <InfoSnippet>
      <InfoDay>{value.day}</InfoDay>
      <InfoInside>
        <InfoTitle>{value.title}</InfoTitle>
        <ShowDetail
          onClick={() => {
            setShowDetail(!showDetail)
          }}
          isActive={showDetail}
        >
          {" "}
          <span style={{ color: "#004a8c" }}>{showDetail ? "-" : "+"} </span>
        </ShowDetail>
        {showDetail && (
          <InfoText initial={{ height: 0 }} animate={{ height: "100%" }}>
            {value.detail}
          </InfoText>
        )}
      </InfoInside>
    </InfoSnippet>
  )
}

const GetInfoSnippet2 = ({ value, icon }) => {
  return (
    <InfoSnippet>
      {/* for others */}
      <InfoIcon>
        <img src={icon} alt="Icon" />
      </InfoIcon>{" "}
      <InfoInside2>
        <InfoTitle>{typeof value === "string" && value}</InfoTitle>
      </InfoInside2>
    </InfoSnippet>
  )
}

const BookingComponent = ({ list }) => {
  console.log(list)
  return (
    <BookingContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          borderBottom: "1px solid #fff",
        }}
      >
        <BookingItem hideLine={true}>Trip Date</BookingItem>
        <BookingItem hideLine={true}>Space</BookingItem>
        <BookingItem hideLine={true}>Book Now</BookingItem>
      </div>
      {list.map((item, index) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <BookingItem>{item.date}</BookingItem>
          <BookingItem>{item.spaceAvailable}</BookingItem>
          <BookingItem>
            <BookButton
              href="http://45.115.217.25:81/enquiry?new=1"
              target="_blank"
            >
              Book Now
            </BookButton>
          </BookingItem>
        </div>
      ))}
    </BookingContainer>
  )
}

const BookingItem = styled(motion.div)`
  font-size: 2rem;
  font-weight: bold;
  color: #004a8c;

  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
  margin: 3rem 0;

  @media (max-width: 900px) {
    font-size: 1.4rem;
  }
`

const BookButton = styled.a`
  padding: 1rem;
  border-radius: 20rem;
  background: #004a8c;
  color: #fff;
  cursor: pointer;
  width: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s transform;
  font-size: 2.3rem;
  text-decoration: none;

  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 900px) {
    font-size: 1.4rem;
    width: 10rem;
    padding: 0.5rem;
  }
`

const BookingContainer = styled.div`
  margin-top: 5rem;
  width: 70%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 0 2rem;

  &.animate {
    animation: 0.5s ${SlideRight} ease-out forwards;
  }

  @media (max-width: 1100px) {
    width: 100%;
  }
`
const InfoInside2 = styled.div`
  position: relative;
  margin-left: 10rem;
`
const InfoInside = styled.div`
  position: relative;
  width: 100%;
`

const ShowDetail = styled(motion.div)`
  position: absolute;
  right: -2rem;
  cursor: pointer;
  top: 0.2rem;
  font-weight: bold;
  font-size: 2.5rem;
  color: #303030;

  @media (max-width: 900px) {
    top: 0;
  }
`
const InfoIcon = styled.div`
  position: absolute;
  left: 4rem;

  @media (max-width: 900px) {
    left: 2rem;
  }
`

const InfoText = styled.div`
  padding-top: 1rem;
`

const InfoDay = styled.div`
  font-weight: bold;
  font-family: "MinionPro";
  color: #303030;
  position: relative;
  margin-top: 0.3rem;
  max-width: 6rem;

  &:before {
    position: absolute;
    content: "";

    top: 0.4rem;
    left: 7.1rem;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #004a8c;
    z-index: 5;
  }

  @media (max-width: 900px) {
    font-size: 1.6rem;
    width: 7rem;

    &:before {
      width: 15px;
      height: 15px;
      left: 6.3rem;
    }
  }
`

const InfoTitle = styled.div`
  font-family: "MinionPro";
  font-size: 2.5rem;
  color: #303030;

  @media (max-width: 900px) {
    font-size: 1.8rem;
  }
`

const InfoSnippet = styled.div`
  padding: 2rem 2rem 0 2rem;
  font-size: 2rem;
  width: 100%;
  box-sizing: border-box;
  position: reative;

  display: flex;
  gap: 8rem;

  @media (max-width: 900px) {
    font-size: 1.6rem;
    padding: 0 1.5rem 0 0;
    gap: 4rem;
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  position: relative;
  color: #707070;

  &:before {
    position: absolute;
    content: "";

    top: 0;
    bottom: 0;
    width: 0.2rem;
    left: 10rem;
    background: #000;
    z-index: 3;
  }

  padding-top: 4rem;
  padding-bottom: 8rem;

  @media (max-width: 900px) {
    margin-top: 4rem;
    padding-top: 2rem;
    padding-bottom: 4rem;

    &:before {
      left: 7rem;
    }
  }
`

const MenuItem = styled.div`
  position: relative;
  font-weight: bold;
  font-family: "MinionPro";
  width: 25%;

  cursor: pointer;
  padding: 1rem 4rem;

  display: flex;
  justify-content: center;

  &:before {
    content: "";
    position: absolute;

    top: 20%;
    bottom: 20%;
    left: 50%;
    right: 100%;
    background: #004a8c;
    z-index: 11;
  }

  &.active {
    background: #fff;
  }

  @media (max-width: 900px) {
    font-size: 1.6rem;
    text-align: left;
    padding: 2rem 0;

    width: 100%;
  }
`

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #e6e6e6;
  opacity: 1;

  position: relative;

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: -20vw;
    right: -20vw;
    bottom: 0;
    background: #e6e6e6;
  }

  @media (max-width: 900px) {
    width: 100vw;
    margin-left: -5vw;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border-top: 1px solid #e6e6e6;
  }

  @media (min-width: 900px) {
    visibility: hidden;
  }
`

const Container = styled.div`
  margin-top: 5rem;
  padding: 0 5vw;
  background: #fff;
  font-size: 2.5rem;
  color: #004a8c;

  position: relative;
  padding-bottom: 5rem;
  transition: height 0.1s;

  @media (max-width: 900px) {
    min-height: 100%;
  }
`

const OuterContainer = styled.div`
  background: #fff;
  position: relative;
`

const OtherButton = styled(AddButton)`
  position: absolute;
  top: 0vh;
  right: 6vw;
  z-index: 11;
  cursor: pointer;
  @media (max-width: 1400px) {
    top: -2vh;
  }
`

export default MainComponent
