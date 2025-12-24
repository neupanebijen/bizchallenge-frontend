import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { HashLink as Link } from "react-router-hash-link"

import TeamMember1 from "../assets/teamMember_3.jpeg"
import InfoSection from "./InfoSection"
import useScrollPosition from "../hooks/useScrollPosition"

import {
  addTeamMember,
  removeTeamMember,
  getAllTeamMembers,
  apiImageLink,
} from "../api/expeditions"

const Team = ({ isAdmin }) => {
  const scrollY = useScrollPosition()
  // Get the data
  const [allMembersData, setAllMembersData] = useState(null)

  useEffect(() => {
    const getAllTeamMembersCall = async () => {
      const result = await getAllTeamMembers()
      setAllMembersData(result.result)
    }

    getAllTeamMembersCall()
  }, [])

  const [showDataPopup, setShowDataPopup] = useState(false)
  const [memberDetails, setMemberDetails] = useState({
    name: "",
    role: "",
    image: "",
    information: "Information about the member",
    tag: "",
    certificates: [],
    facebook: "",
    twitter: "",
    instagram: "",
    phoneNo: "",
    email: "",
  })

  const addMember = () => {
    setShowDataPopup(true)
  }

  const editMemberDetails = (field, value) => {
    const newMemberDetails = memberDetails
    newMemberDetails[`${field}`] = value
    setMemberDetails({ ...newMemberDetails })
  }

  const saveMemberDetails = async () => {
    const result = await addTeamMember(memberDetails)
    console.log(result)
    if (result.success) {
      alert("Member Successfully added. Please refresh to see the changes")
    } else {
      alert("Something went wrong. Please try again later")
    }
  }

  // For active display of core members or others
  const [displayCore, setDisplayCore] = useState("core")

  const removeMember = async (index) => {
    const result = await removeTeamMember(allMembersData[index])
    if (result.success) {
      const newMemberData = allMembersData.filter((value, i) => i !== value)
      setAllMembersData([...newMemberData])
      alert("Member removed.")
      window.location.reload()
    }
  }

  return (
    <div
      style={{
        background: "#ddd",
        position: "relative",
        padding: "6vh 0",
        marginTop: "6vh",
      }}
    >
      <p>
        There is an issue with api calls here. Api calls are fine, but it needs
        to to go back to about us page and reload to see the affeteced changes.
        Soln: State/API re-calls after data submission/update.{" "}
      </p>
      {/* Add a team member */}
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
            style={{
              position: "relative",
              display: "block",
              left: "20px",
              marginTop: "10px",
            }}
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
      {isAdmin && <AddButton onClick={addMember}>Add a team Member</AddButton>}

      {/* Show information about members */}
      <InfoSection title="Our Team" text="">
        <ButtonContainer>
          <Button onClick={() => setDisplayCore("core")}>Administration</Button>
          <Button onClick={() => setDisplayCore("")}>Office</Button>
          <Button onClick={() => setDisplayCore("")}>Guides</Button>
        </ButtonContainer>

        <ScrollingMembers
          allMembersData={allMembersData}
          isAdmin={isAdmin}
          scrollY={scrollY}
          removeMember={removeMember}
          displayCore={displayCore}
        />
      </InfoSection>
    </div>
  )
}

const ScrollingMembers = ({
  allMembersData,
  isAdmin,
  scrollY,
  removeMember,
  displayCore,
}) => {
  // Setting the components of scroll Container. Later handel the condition where there are less than three data
  let scrollElements = []
  let i = 0
  do {
    if (allMembersData === null) {
      break
    }
    let index = i * 3
    let membersPack = []

    for (let j = 0; j < 3; j++) {
      if (allMembersData[index + j]) {
        membersPack = [...membersPack, allMembersData[index + j]]
      } else {
        break
      }
    }
    scrollElements = [...scrollElements, membersPack]
    i++
  } while (allMembersData[i * 3])

  return (
    <div>
      {scrollElements.map((data, index) => (
        <ScrollContainer
          key={index}
          className={index % 2 === 0 ? "scrollRight" : "scrollLeft"}
          scrollY={scrollY}
        >
          {data.map((value, index) => {
            console.log(value.tag, " : ", value.name)
            return value.tag === displayCore ? (
              <MemberSnippetContainer
                scrollDirection={Math.floor(index / 3) % 2 === 0 ? true : false}
                scrollY={scrollY}
              >
                {isAdmin && (
                  <button onClick={() => removeMember(index)}>Remove</button>
                )}
                <HeroImageCircle2
                  as={Link}
                  to={`/teamMember/${value._id}`}
                  state={{
                    _id: value._id,
                    name: value.name,
                    image: value.image ? `${value.image}` : TeamMember1,
                    certificates: value.certificates ? value.certificates : [],
                    tag: value.tag,
                    role: value.role,
                    information: value.information,
                    facebook: value.facebook,
                    instagram: value.instagram,
                    twitter: value.twitter,
                    phoneNo: value.phoneNo,
                    email: value.email,
                  }}
                  key={index}
                >
                  <img
                    src={
                      value.image
                        ? `${apiImageLink}${value.image}`
                        : TeamMember1
                    }
                    width="100%"
                    height="100%"
                    alt="Team Member"
                  />
                </HeroImageCircle2>
                <div>
                  <h1>{value.name}</h1>
                  <h3>{value.role}</h3>
                </div>
              </MemberSnippetContainer>
            ) : (
              value.tag !== "core" && displayCore !== "core" && (
                <MemberSnippetContainer
                  scrollDirection={
                    Math.floor(index / 3) % 2 === 0 ? true : false
                  }
                  scrollY={scrollY}
                >
                  {isAdmin && (
                    <button onClick={() => removeMember(index)}>Remove</button>
                  )}
                  <HeroImageCircle
                    as={Link}
                    to="/teamMember"
                    state={{
                      _id: value._id,
                      name: value.name,
                      image: value.image ? `${value.image}` : TeamMember1,
                      certificates: value.certificates
                        ? value.certificates
                        : [],
                      tag: value.tag,
                      role: value.role,
                      information: value.information,
                      facebook: value.facebook,
                      instagram: value.instagram,
                      twitter: value.twitter,
                      phoneNo: value.phoneNo,
                      email: value.email,
                    }}
                    key={index}
                  >
                    <img
                      src={
                        value.image
                          ? `${apiImageLink}${value.image}`
                          : TeamMember1
                      }
                      width="100%"
                      height="100%"
                      alt="Team Member"
                    />
                  </HeroImageCircle>
                  <div>
                    <h1>{value.name}</h1>
                    <h3>{value.role}</h3>
                  </div>
                </MemberSnippetContainer>
              )
            )
          })}
        </ScrollContainer>
      ))}
    </div>
  )
}

const ButtonContainer = styled.div`
  display: flex;
`

const Button = styled.div`
  font-size: 1.6rem;
  padding: 1rem;
  background: none;
  border: none;
  cursor: pointer;
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
  top: -10vh;
  left: 25vw;
  right: 0;

  background: #e6e6e6;
  width: 50vw;
  min-height: 70vh;
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
  right: 3vw;
  z-index: 11;
  cursor: pointer;

  @media (max-width: 600px) {
    display: none;
  }
`

const ScrollContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: no-wrap;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const MemberSnippetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
  max-width: 100vh;
  flex-wrap: wrap;
  overflow: hidden;
`

const HeroImageCircle = styled(motion.div)`
  width: 28vw;
  height: calc(${(28 * 9) / 16}vw);

  overflow: hidden;
  margin-top: 2vh;
  cursor: pointer;
  border: 1px solid transparent;
  outline: 1px solid transparent;
  transform: translateY(0);

  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 600px) {
    width: 90vw;
    height: calc(90vw * 9 / 16);
  }
`

const HeroImageCircle2 = styled(motion.div)`
  width: 40vw;
  height: calc(${(28 * 9) / 16}vw);

  overflow: hidden;
  margin-top: 2vh;
  cursor: pointer;
  border: 1px solid transparent;
  outline: 1px solid transparent;
  transform: translateY(0);

  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 600px) {
    width: 90vw;
    height: calc(90vw * 9 / 16);
  }
`

export default Team
