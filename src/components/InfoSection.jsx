import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import SectionTitle from "./SectionTitle"
import { FadeInUpText } from "./Animations"

import DraftEditor from "./DraftJs/App"

const InfoSection = ({
  title,
  text,
  children,
  data,
  updateData,
  showEditor = true,
  isExpeditionSinglePage = false,
  sideContent = "",
  isAdmin = false,
  fromAbout = false,
}) => {
  const [isInView, setIsInView] = useState(false)
  const [inViewRef, inView] = useInView({
    threshold: window.innerWidth < 900 ? 0.2 : 0.5,
  })
  useEffect(() => {
    if (inView) {
      setIsInView(true)
    }
  }, [inView])

  const [editContent, setEditContent] = useState(false)
  const [contentHTML, setContentHTML] = useState(text)
  const [editorOpen, setEditorOpen] = useState(false)

  const saveContent = async () => {
    data.content = contentHTML
    const result = await updateData(data)
  }

  const [isReadMore, setIsReadMore] = useState(false)

  return (
    <Container id="detail">
      <FirstContainer isExpeditionSinglePage={isExpeditionSinglePage}>
        <TextContainer isExpeditionSinglePage={isExpeditionSinglePage}>
          <SectionTitle text={title} />
          {isAdmin && showEditor && (
            <AddButton
              onClick={() => {
                setEditContent(!editContent)
                setEditorOpen(!editorOpen)
                editorOpen && saveContent()
              }}
            >
              {editorOpen ? "Save" : "Edit"}
            </AddButton>
          )}
          {editContent ? (
            <DraftEditor
              oldContent={contentHTML}
              setContentHTML={(value) => setContentHTML(value)}
            />
          ) : (
            <>
              <SectionText
                ref={inViewRef}
                className={isInView ? "animate" : ""}
                isReadMore={isReadMore}
                fromAbout={fromAbout}
              >
                <div dangerouslySetInnerHTML={{ __html: contentHTML }}></div>
              </SectionText>
              {isExpeditionSinglePage ? (
                isReadMore ? (
                  <ExtraText onClick={() => setIsReadMore(!isReadMore)}>
                    Show Less
                  </ExtraText>
                ) : (
                  <ExtraText onClick={() => setIsReadMore(!isReadMore)}>
                    Read More...
                  </ExtraText>
                )
              ) : (
                ""
              )}
            </>
          )}
        </TextContainer>
        <SideContentContainer isExpeditionSinglePage={isExpeditionSinglePage}>
          {sideContent}
        </SideContentContainer>
      </FirstContainer>
      {children}
    </Container>
  )
}

const ExtraText = styled.div`
  color: #004a8c;
  font-size: 1.4rem;
  cursor: pointer;
  margin-top: 1rem;
`

const SideContentContainer = styled.div`
  width: ${(props) => (props.isExpeditionSinglePage ? "40%" : "0%")};

  @media (max-width: 900px) {
    width: 100%;
  }
`

const TextContainer = styled.div`
  width: ${(props) => (props.isExpeditionSinglePage ? "60%" : "100%")};
  text-align: justify;

  @media (max-width: 900px) {
    width: 100%;
  }
`

const FirstContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${(props) => (props.isExpeditionSinglePage ? "3vw" : "0")};

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const AddButton = styled.button`
  font-size: 1.041vw;
  padding: 1rem;
  color: black;
  background: none;
  margin-top: 5rem;
  cursor: pointer;
  font-weight: bold;
`

const SectionText = styled.div`
  font-family: "SegoeUI";
  font-size: 1.25vw;
  margin-top: 2%;
  max-height: ${(props) =>
    props.fromAbout ? "auto" : props.isReadMore ? "auto" : "50vh"};
  overflow: hidden;

  & .addMargin {
    margin-top: 3rem;
  }

  @media (max-width: 1300px) {
    font-size: 1.5vw;
  }

  @media (max-width: 900px) {
    font-size: 1.6rem;
    margin-top: 2rem;
  }

  opacity: 0;
  &.animate {
    animation: 0.5s ${FadeInUpText} ease-out forwards;
  }
`

const Container = styled.div`
  padding: 0vh 5vw;
  color: #707070;
`

export default InfoSection
