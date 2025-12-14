import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import ContentBox from "../components/ContentBox"
import { useParams, useLocation, Link } from "react-router-dom"

import ThirdPageComponent from "../components/NewThirdPageComponent"
import ExpeditionIndividual from "../components/ExpeditionIndividualInfo"
import Image from "../assets/image2.jpg"
import Footer from "../components/Footer"

import { getPackage, updatePackage, apiImageLink } from "../api/expeditions"
import InfoSection from "../components/InfoSection"

const ExpeditionSingle = ({ isAdmin }) => {
  const { packageId } = useParams()
  const { state } = useLocation()

  // Setting the related packages
  const [relatedPackages, setRelatedPackages] = useState(null)
  useEffect(
    () => setRelatedPackages(state ? state.relatedPackage : null),
    [state]
  )

  const [data, setData] = useState(null)

  useEffect(() => {
    const getPackageDataCall = async () => {
      const result = await getPackage(packageId)
      setData(result.result)
    }

    getPackageDataCall()
    window.scrollTo(0, 0)
  }, [])

  const updatePackageCall = async (value) => {
    const result = await updatePackage(value)
    return result
  }

  // update the related Package
  const getRelatedPackage = (index) => {
    console.log(index)
    let newRelatedPackage = relatedPackages
    newRelatedPackage[index] = data
    return newRelatedPackage
  }

  return (
    <motion.div exit={{ zIndex: 1, transition: { duration: 0.41, delay: 1 } }}>
      <ThirdPageComponent
        data={{
          title: data && data.name,
          image: data ? data.image && `${apiImageLink}${data.image[0]}` : Image,
        }}
      >
        {data && (
          <ContentBox style={{ paddingBottom: 0 }}>
            <ExpeditionIndividual
              title="About the expedition"
              data={data}
              updatePackage={(data) => updatePackageCall(data)}
              isAdmin={isAdmin}
            />
            {relatedPackages && relatedPackages[0] !== null && (
              <>
                <InfoSection title="Related Packages">
                  <OuterRelatedPackageContainer>
                    {console.log(relatedPackages)}
                    {relatedPackages.map((value, i) =>
                      value !== null ? (
                        <RelatedPackageContainer
                          key={i}
                          to={`/package/${value.route}`}
                          state={{
                            _id: value._id,
                            index: i,
                            relatedPackage: relatedPackages,
                          }}
                        >
                          <img
                            src={`${apiImageLink}${value.image[0]}`}
                            style={{
                              borderRadius: "50%",
                              height: "6rem",
                              width: "6rem",
                            }}
                          />
                          <h3>{value.name}</h3>
                        </RelatedPackageContainer>
                      ) : null
                    )}
                  </OuterRelatedPackageContainer>
                </InfoSection>
              </>
            )}
            <Footer />
          </ContentBox>
        )}
      </ThirdPageComponent>
    </motion.div>
  )
}

const OuterRelatedPackageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem 0;
  gap: 2rem;
`

const RelatedPackageContainer = styled(Link)`
  height: 9rem;
  display: flex;
  align-items: center;
  gap: 2rem;

  padding: 0rem 3rem 0rem 2rem;
  text-decoration: none;
  border-radius: 20rem;
  background: #e6e6e6;
  color: #707070;
  font-size: 1.8rem;
`

const Button = styled.a`
  border: 0.18229vw solid white;
  border-radius: 20rem;
  color: #fff;
  font-size: 1.041vw;
  font-family: "SilkaRm";
  text-decoration: none;

  padding: 0.52vw 1.041vw;
  cursor: pointer;

  position: absolute;
  top: 17vh;
  right: ${(props) => props.right};
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 600px) {
    font-size: 1.4rem;
    border: 0.2rem solid white;
    padding: 0.5rem 0.8rem;
    top: 5.5vh;
    right: ${(props) => props.second && "28vw"};
  }
`

export default ExpeditionSingle

{
  /* <Button
              href="http://45.115.217.25:81/enquiry?new=1"
              target="_blank"
              right="7vw"
            >
              Inquire
            </Button>
            <Button
              href="http://45.115.217.25:81/enquiry?new=1"
              target="_blank"
              right="14vw"
              second={true}
            >
              Book Now
            </Button> */
}
