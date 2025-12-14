import React, { useState, useEffect } from "react"
import "./App.css"
import Home from "./pages/Home"
import About from "./pages/About"
import Expedition from "./pages/Expedition"
import Over8000 from "./pages/Over8000"
import ExpeditionSingle from "./pages/ExpeditionSingle"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import Events from "./pages/Events"
import EventSingle from "./pages/EventSingle"
import UsefulInfo from "./pages/UsefulInfo"
import Destinations from "./pages/Destinations"
import HowToClimbAMountain from "./pages/HowToClimbAMountain"
import ContactUs from "./pages/ContactUs"
import Inquiry from "./components/Inquiry"
import Over7000 from "./pages/Over7000"
import TAnnapurna from "./pages/TAnnapurna"
import TEverest from "./pages/TEverest"
import TMakalu from "./pages/TMakalu"
import TManaslu from "./pages/TManaslu"
import TKanchanjunga from "./pages/TKanchanjunga"
import TDhaulagiri from "./pages/TDhaulagiri"
import TMustang from "./pages/TMustang"
import TLantang from "./pages/TLantang"
import PeakClimbing from "./pages/PeakClimbing"
import TeamMember from "./pages/TeamMember"
import DestinationNepal from "./pages/DestinationNepal"
import DestinationIndia from "./pages/DestinationIndia"
import DestinationPakistan from "./pages/DestinationPakistan"
import DestinationChina from "./pages/DestinationChina"
import { AnimatePresence } from "framer-motion"
import Trekkings from "./pages/Trekkings"
import Admin from "./pages/Admin"

import PageChangeAnimation from "./components/PageChangeAnimation"

import useToken from "./hooks/useToken"

import { loginUser } from "./api/expeditions"

function App() {
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  const [pageChangeColor, setPageChangeColor] = useState("#004a8c")

  const { token, setToken, clearToken } = useToken()

  const [isAdmin, setIsAdmin] = useState(() =>
    token !== null ? (token.value === "admin" ? true : false) : false
  )

  // const [isAdmin, setIsAdmin] = useState(true)

  const authenticateUser = async (username, password) => {
    const result = await loginUser(username, password)
    if (result.success) {
      setToken({ value: "admin" })
      navigate(0)
      return
    } else {
      alert(
        "Something went wrong. Please make sure you enter valid username and password"
      )
    }
  }

  const logout = () => {
    clearToken()
    setIsAdmin(false)
    navigate(0)
  }

  return (
    <div className="App">
      <ShowAnimation
        pageChangeColor={pageChangeColor}
        isFirstLoad={isFirstLoad}
        setIsFirstLoad={() => setIsFirstLoad(false)}
      />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route
            index
            element={
              <Home
                isAdmin={isAdmin}
                setPageChangeColor={(color) => setPageChangeColor(color)}
              />
            }
          />
          <Route
            path="admin"
            element={
              <Admin
                authenticateUser={authenticateUser}
                logout={logout}
                isAdmin={isAdmin}
              />
            }
          />
          <Route
            path="packages"
            element={
              <Expedition
                isAdmin={isAdmin}
                setIsAdmin={() => setIsAdmin(!setIsAdmin)}
              />
            }
          ></Route>
          <Route path="about" element={<About isAdmin={isAdmin} />}></Route>
          <Route path="over8000m" element={<Over8000 isAdmin={isAdmin} />} />
          <Route path="over7000m" element={<Over7000 isAdmin={isAdmin} />} />
          <Route path="annapurna" element={<TAnnapurna isAdmin={isAdmin} />} />
          <Route path="lantang" element={<TLantang isAdmin={isAdmin} />} />
          <Route path="everest" element={<TEverest isAdmin={isAdmin} />} />
          <Route
            path="dhaulagiri"
            element={<TDhaulagiri isAdmin={isAdmin} />}
          />
          <Route path="mustang" element={<TMustang isAdmin={isAdmin} />} />
          <Route
            path="kanchanjunga"
            element={<TKanchanjunga isAdmin={isAdmin} />}
          />
          <Route path="makalu" element={<TMakalu isAdmin={isAdmin} />} />
          <Route path="manaslu" element={<TManaslu isAdmin={isAdmin} />} />
          <Route path="trekkings" element={<Trekkings isAdmin={isAdmin} />} />
          <Route
            path="peakClimbing"
            element={<PeakClimbing isAdmin={isAdmin} />}
          />
          <Route
            path="expeditionSingle"
            element={<ExpeditionSingle isAdmin={isAdmin} />}
          />
          <Route
            path="/package/:packageId"
            element={<ExpeditionSingle isAdmin={isAdmin} />}
          />
          <Route path="events" element={<Events isAdmin={isAdmin} />} />
          <Route
            path="events/:eventId"
            element={<EventSingle isAdmin={isAdmin} />}
          />
          <Route path="usefulInfo" element={<UsefulInfo isAdmin={isAdmin} />} />
          <Route
            path="destinations"
            element={<Destinations isAdmin={isAdmin} />}
          />
          <Route
            path="howToClimbAMountain"
            element={<HowToClimbAMountain />}
            isAdmin={isAdmin}
          />
          <Route
            path="inquiry/:packageName"
            element={<ContactUs isAdmin={isAdmin} />}
          />
          <Route path="contactUs" element={<Inquiry isAdmin={isAdmin} />} />
          <Route path="teamMember" element={<TeamMember isAdmin={isAdmin} />} />
          <Route
            path="nepal"
            element={<DestinationNepal isAdmin={isAdmin} />}
          />
          <Route
            path="india"
            element={<DestinationIndia isAdmin={isAdmin} />}
          />
          <Route
            path="pakistan"
            element={<DestinationPakistan isAdmin={isAdmin} />}
          />
          <Route
            path="china"
            element={<DestinationChina isAdmin={isAdmin} />}
          />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

function ShowAnimation({ pageChangeColor, isFirstLoad, setIsFirstLoad }) {
  const { pathname } = useLocation()
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad()
      return
    }
    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
    }, 1500)
  }, [pathname])

  return (
    <AnimatePresence>
      <PageChangeAnimation
        animation={showAnimation}
        pageChangeColor={pageChangeColor}
      />
    </AnimatePresence>
  )
}

export default App
