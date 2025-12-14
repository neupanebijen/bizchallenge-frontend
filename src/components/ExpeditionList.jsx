import React, { useCallback, useMemo } from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import styled from "styled-components"
import InfoSection from "./InfoSection"
import SingleExpeditionCard from "./ExpeditionListCard"
import Image1 from "../assets/image2.jpg"

import {
  getAllPackage,
  createPackage,
  removePackage,
  apiImageLink,
} from "../api/expeditions"

const ExpeditionList = (props) => {
  const [data, setData] = useState(null)
  const navigate = useNavigate()

  // Search Functionality
  const [query, setQuery] = useState("")

  const filteredData = useMemo(() => {
    return data !== null
      ? data.filter((value, index) => {
          return (
            value.name.toLowerCase().includes(query.toLowerCase()) &&
            value.tags.includes(props.tag)
          )
        })
      : null
  }, [data, query])

  const [packageName, setPackageName] = useState("")
  const [packageDuration, setPackageDuration] = useState("")
  const [packageBestSeason, setPackageBestSeason] = useState("")
  const [packageAccomodation, setPackageAccomodation] = useState("")
  const [packageGrade, setPackageGrade] = useState("")
  const [packageMaxAltitude, setPackageMaxAltitude] = useState("")
  const [expeditionClass, setExpeditionClass] = useState("over8000m")
  const [packageDestination, setPackageDestination] = useState("Nepal")
  const [packageRoute, setPackageRoute] = useState("")

  const classOptions = useMemo(
    () => [
      "over8000m",
      "over7000m",
      "peakClimbing",
      "everest",
      "annapurna",
      "mustang",
      "makalu",
      "lantang",
      "dhaulagiri",
      "manaslu",
      "kanchanjunga",
    ],
    []
  )

  const destinationOption = useMemo(() => [
    "Nepal",
    "India",
    "China",
    "Pakistan",
  ])

  useEffect(() => {
    const getAllPackageCall = async () => {
      const result = await getAllPackage()
      let preData = result.result
      preData = preData.sort(
        (value1, value2) => value1.packageNo - value2.packageNo
      )
      setData(preData)
    }

    getAllPackageCall()
  }, [])

  const removePackageCall = async (id) => {
    const result = await removePackage(id)
    if (result.success) {
      alert("Package Removed")
      navigate(0)
    } else {
      alert("Something went wrong")
    }
  }

  // Get the related package object to display
  const getRelatedPackage = useCallback(
    (index) => {
      let relatedPackages = []

      // send previouse three packages, if first three packages, send next packages
      for (let i = 1; i < 4; i++) {
        let tracker = index - i
        if (tracker < 0) {
          tracker = index + i
        }
        relatedPackages.push(
          filteredData[tracker] ? filteredData[tracker] : null
        )
      }

      return relatedPackages
    },
    [filteredData]
  )

  const currentChild = (
    <ExpeditionCardContainer>
      {filteredData !== null &&
        filteredData.map((value, index) => {
          if (!value.tags.includes(props.tag)) return null
          return (
            <OuterContainer key={value._id}>
              <LinkContainer
                to={`/package/${value.route}`}
                state={{
                  _id: value._id,
                  index: index,
                  relatedPackage: getRelatedPackage(index),
                }}
              >
                <SingleExpeditionCard
                  title={value.name}
                  value={value}
                  duration={value.duration}
                  image={
                    value.image ? `${apiImageLink}${value.image[0]}` : Image1
                  }
                  index={index}
                  {...props}
                />
                {props.isAdmin && (
                  <RemoveButton
                    onClick={(e) => {
                      console.log(removePackageCall(value._id))
                    }}
                  >
                    Remove
                  </RemoveButton>
                )}
              </LinkContainer>
            </OuterContainer>
          )
        })}
    </ExpeditionCardContainer>
  )

  const submitPackage = async () => {
    if (
      expeditionClass === "" ||
      packageDestination === "" ||
      packageRoute === "" ||
      packageName === ""
    ) {
      alert("Must have name, expedition class, destination and route")
      return
    }
    const result = await createPackage({
      name: packageName,
      image: [],
      content: "Add the content",
      duration: packageDuration,
      bestSeason: packageBestSeason,
      accomodation: packageAccomodation,
      grade: packageGrade,
      maxAltitude: packageMaxAltitude,
      itinerary: [
        { day: "Day 1", details: ["Add to itinerary", "Add a second value"] },
      ],
      includes: ["includes 1", "includes 2"],
      excludes: ["excludes 1", "excludes 2"],
      fixedDepartures: [
        { date: "Date of departure", bookings: 10, maxBookings: 20 },
      ],
      tags: [expeditionClass, packageDestination],
      metaTags: "",
      route: packageRoute,
    })

    if (result.success) {
      setPackageName("")
      setPackageDuration("")
      setPackageBestSeason("")
      setPackageAccomodation("")
      setPackageGrade("")
      setPackageMaxAltitude("")
      setExpeditionClass("")
      setPackageDestination("")

      alert("Package Added successfully")
      navigate(0)
    } else {
      alert("something went wrong")
    }
  }

  return (
    <Container>
      <InfoSection
        title={props.title}
        text={props.text}
        id="content"
        data={props.data}
        updateData={props.updatePage}
        isAdmin={props.isAdmin}
      >
        <SearchInput
          type="text"
          placeholder="Search packages"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ChildContainer>{currentChild}</ChildContainer>
        {props.isAdmin && (
          <>
            <PackageHeader>Add A Package</PackageHeader>
            <PackageDetails>
              <PackageInput
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                placeholder={`Package Name`}
              />
              <PackageInput
                value={packageDuration}
                onChange={(e) => setPackageDuration(e.target.value)}
                placeholder={`Duration`}
              />
              <PackageInput
                value={packageBestSeason}
                onChange={(e) => setPackageBestSeason(e.target.value)}
                placeholder={`Best Season`}
              />
              <PackageInput
                value={packageAccomodation}
                onChange={(e) => setPackageAccomodation(e.target.value)}
                placeholder={`Accomodation`}
              />
              <PackageInput
                value={packageGrade}
                onChange={(e) => setPackageGrade(e.target.value)}
                placeholder={`Grade`}
              />
              <PackageInput
                value={packageMaxAltitude}
                onChange={(e) => setPackageMaxAltitude(e.target.value)}
                placeholder={`Max Altitude`}
              />
              <label>Expedition Class</label>
              <select
                value={expeditionClass}
                onChange={(e) => setExpeditionClass(e.target.value)}
                style={{ width: "150px", fontSize: "20px", padding: "10px" }}
              >
                {classOptions.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <label>Destination</label>
              <select
                value={packageDestination}
                onChange={(e) => setPackageDestination(e.target.value)}
                style={{ width: "150px", fontSize: "20px", padding: "10px" }}
              >
                {destinationOption.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <PackageInput
                value={packageRoute}
                onChange={(e) => setPackageRoute(e.target.value)}
                placeholder={`Route`}
              />
              <SubmitButton onClick={() => submitPackage()}>
                Add the package
              </SubmitButton>
            </PackageDetails>
          </>
        )}
      </InfoSection>
    </Container>
  )
}

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  font-size: 2rem;
  min-width: 10rem;
  width: 20%;
  border-radius: 20rem;
  margin-top: 4rem;

  @media (max-width: 900px) {
    width: 100%;
  }
`

const OuterContainer = styled.div`
  width: 32%;
  box-sizing: border-box;
  overflow: hidden;
  margin-top: 2rem;

  @media (max-width: 600px) {
    width: 100%;
    margin-top: 2rem;
  }
`

const RemoveButton = styled.button`
  border-radius: 20rem;
  font-size: 2rem;
  top: 20px;
  z-index: 3;
  position: absolute;
  translate: transformX(-50%);
  padding: 0.5rem 1rem;

  @media (max-width: 600px) {
    display: none;
  }
`

const PackageInput = styled.input`
  border-radius: 20rem;
  width: 30%;
  font-size: 2rem;

  padding: 1rem 1.5rem;
`

const PackageHeader = styled.h2`
  margin-top: 5rem;
  font-size: 3rem;

  @media (max-width: 600px) {
    display: none;
  }
`

const PackageDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;

  @media (max-width: 1100px) {
    display: none;
  }
`

const SubmitButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  width: 15%;
  background: #fff;
  border: 2px solid #999;
  cursor: pointer;
  padding: 2rem;
`

const LinkContainer = styled(Link)`
  text-decoration: none;
  position: relative;
`

const ChildContainer = styled.div`
  margin-top: 1rem;
`

const Container = styled.div`
  background: #fff;
  padding: 0vh 0;
  padding-bottom: 5vh;
  position: relative;
`

const ExpeditionCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

export default ExpeditionList
