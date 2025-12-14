import React from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"

const Loading = ({
  showAnimation,
  showVideo,
  videoToShow,
  pageIndex,
  background,
}) => {
  return (
    <AnimatePresence>
      {showVideo && (
        <LoadingCover
          showVideo={showVideo}
          background={background}
          initial={{ x: 1, opacity: 0.5, zIndex: 1 }}
          animate={{ x: 0, opacity: 1, zIndex: 1 }}
          transition={{ duration: 0.5 }}
          exit={{
            opacity: 0.5,
            transition: {
              duration: 5,
              delay: 0.1,
              zIndex: -1,
            },
          }}
          key={pageIndex}
        >
          <VideoContainer src={videoToShow} autoPlay loop muted />
          <LoadingCoverOpacity
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            transition={showAnimation && { duration: 3 }}
          />
        </LoadingCover>
      )}
    </AnimatePresence>
  )
}

const VideoContainer = styled.video`
  min-width: 105vw;
  min-height: 108vh;
  margin-top: -2vh;
  overflow: hidden;
  object-fit: fill;

  @media (max-width: 600px) {
    object-fit: cover;
  }
`

const LoadingCoverOpacity = styled(motion.div)`
  position: fixed;

  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background: rgba(255, 255, 255);
`

const LoadingCover = styled(motion.div)`
  position: fixed;

  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background: url("${(props) =>
    props.background === "" ? "rgba(255, 255, 255, 0.5)" : props.background}");
  overflow: hidden;
  margin: 0;
  padding: 0;
  opacity: ${(props) => (props.showVideo ? 1 : 0)};
`
//   background: rgba(255, 255, 255, 0.5);
export default Loading
