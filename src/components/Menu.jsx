import { useState, useMemo } from "react"
import styled from "styled-components"
import { HashLink } from "react-router-hash-link"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"

import Image1 from "../assets/image1.jpg"
import WhiteLogo from "../assets/logo.png"

import Hamburger from "../assets/hamburger.svg"
import HamburgerWhite from "../assets/hamburgerWhite.svg"
import HamburgerBlack from "../assets/HamburgerBlack.svg"
import Search from "../assets/search.svg"

const Menu = ({
  changePageData,
  loadThirdPage,
  color,
  hideMenu,
  isHomePage,
}) => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [hoverMenu, setHoverMenu] = useState(0)
  const [menuQuery, setMenuQuery] = useState("")

  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate()

  // Search Functionality
  const [query, setQuery] = useState("")

  const filteredData = useMemo(() => {
    return data !== null
      ? data.filter((value, index) => {
          return value.name.toLowerCase().includes(query.toLowerCase())
        })
      : null
  }, [data, query])

  // Get data
  // useEffect(() => {
  //   const getAllPackageCall = async () => {
  //     const result = await getAllPackage()
  //     let preData = result.result
  //     preData = preData.sort(
  //       (value1, value2) => value1.packageNo - value2.packageNo
  //     )
  //     setData(preData)
  //   }

  //   getAllPackageCall()
  // }, [])

  const menuClicked = (e, index) => {
    if (!isHomePage) return
    e.preventDefault()
    changePageData(index)
  }

  return (
    <MenuContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      exit={{ opacity: 0 }}
    >
      <MenuLogo>
        <MenuLink to="/" className="logo" onClick={() => changePageData(0)}>
          <NewLogo src={WhiteLogo} />
        </MenuLink>
      </MenuLogo>
      <MenuLinks>
        {!hideMenu && (
          <MenuLink
            to="/"
            color={color}
            state={{ pageNumber: 0 }}
            onClick={(e) => menuClicked(e, 0)}
          >
            HOME
          </MenuLink>
        )}
        {!hideMenu && (
          <MenuLink
            to="/packages"
            color={color}
            state={{ pageNumber: 1 }}
            onMouseEnter={() => setHoverMenu(1)}
            onMouseLeave={() => setHoverMenu(0)}
          >
            EXPEDITIONS
            {hoverMenu === 1 ? (
              <SubLinks onMouseLeave={() => setMenuQuery("")}>
                <SubLink
                  to="/over8000m"
                  onMouseEnter={() => setMenuQuery("over8000m")}
                >
                  Over 8000m
                </SubLink>
                <SubLink
                  to="/over7000m"
                  onMouseEnter={() => setMenuQuery("over7000m")}
                >
                  Over 7000m
                </SubLink>
                <SubLink
                  to="/peakClimbing"
                  onMouseEnter={() => setMenuQuery("peakClimbing")}
                >
                  Peak Climbing
                </SubLink>
                {menuQuery === "over8000m" && (
                  <HoverLink>
                    {/**eslint- */}
                    {data !== null &&
                      data
                        .filter((value) => value.tags.includes("over8000m"))
                        .map((value, index) => {
                          return (
                            <SubLink
                              to={`/package/${value.route}`}
                              state={{
                                _id: value._id,
                                index: index,
                              }}
                            >
                              {value.name}
                            </SubLink>
                          )
                        })}
                  </HoverLink>
                )}
                {menuQuery === "over7000m" && (
                  <HoverLink>
                    {data !== null &&
                      data
                        .filter((value) => value.tags.includes("over7000m"))
                        .map((value, index) => {
                          return (
                            <SubLink
                              to={`/package/${value.route}`}
                              state={{
                                _id: value._id,
                                index: index,
                              }}
                            >
                              {value.name}
                            </SubLink>
                          )
                        })}
                  </HoverLink>
                )}
                {menuQuery === "peakClimbing" && (
                  <HoverLink>
                    {data !== null &&
                      data
                        .filter((value) => value.tages.includes("peakClimbing"))
                        .map((value, index) => {
                          return (
                            <SubLink
                              to={`/package/${value.route}`}
                              state={{
                                _id: value._id,
                                index: index,
                              }}
                            >
                              {value.name}
                            </SubLink>
                          )
                        })}
                  </HoverLink>
                )}
              </SubLinks>
            ) : (
              ""
            )}
          </MenuLink>
        )}
        {!hideMenu && (
          <MenuLink
            to="/trekkings"
            color={color}
            state={{ pageNumber: 2 }}
            onMouseEnter={() => setHoverMenu(2)}
            onMouseLeave={() => setHoverMenu(0)}
          >
            TREKKING
            {hoverMenu === 2 ? (
              <SubLinks>
                <SubLink to="/annapurna">Annapurna</SubLink>
                <SubLink to="/everest">Everest</SubLink>
                <SubLink to="/mustang">Mustang</SubLink>
                <SubLink to="/makalu">Makalu</SubLink>
                <SubLink to="/kanchanjunga">Kanchanjunga</SubLink>
                <SubLink to="/dhaulagiri">Dhaulagiri</SubLink>
                <SubLink to="/lantang">Lantang</SubLink>
                <SubLink to="/manaslu">Manaslu</SubLink>
              </SubLinks>
            ) : (
              ""
            )}
          </MenuLink>
        )}
        {!hideMenu && (
          <MenuLink
            to="/destinations"
            color={color}
            state={{ pageNumber: 3 }}
            onMouseEnter={() => setHoverMenu(4)}
            onMouseLeave={() => setHoverMenu(0)}
          >
            DESTINATION
            {hoverMenu === 4 ? (
              <SubLinks>
                <SubLink to="/nepal">Nepal</SubLink>
                <SubLink to="/pakistan">Pakistan</SubLink>
                <SubLink to="/india">India</SubLink>
                <SubLink to="/china">China</SubLink>
              </SubLinks>
            ) : (
              ""
            )}
          </MenuLink>
        )}
        {!hideMenu && (
          <MenuLink
            to="/events"
            color={color}
            state={{ pageNumber: 4 }}
            onClick={(e) => menuClicked(e, 4)}
          >
            EVENTS
          </MenuLink>
        )}
        {!hideMenu && (
          <MenuLink to="/usefulInfo" color={color} state={{ pageNumber: 5 }}>
            USEFUL INFO
          </MenuLink>
        )}
        {!hideMenu && (
          <MenuLink
            to="/about"
            onClick={() => loadThirdPage({ title: "ABOUT US", image: Image1 })}
            color={color}
            onMouseEnter={() => setHoverMenu(7)}
            onMouseLeave={() => setHoverMenu(0)}
          >
            ABOUT
            {hoverMenu === 7 ? (
              <SubLinks>
                <SubLink to="/about#content">Company Info</SubLink>
                <SubLink to="/about#ourTeam">Our Team</SubLink>
                <SubLink to="/about#responsibleTravel">
                  Responsible Travel
                </SubLink>
                <SubLink to="/about#coreValues">Core Values</SubLink>
                <SubLink to="/about#reviews">Reviews</SubLink>
              </SubLinks>
            ) : (
              ""
            )}
          </MenuLink>
        )}
        {!hideMenu && (
          <MenuLink2
            style={{ marginLeft: "auto" }}
            color={color}
            onMouseLeave={() => setHoverMenu(0)}
          >
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
            />
            <SearchIcon src={Search} />
            {query.length > 3 && (
              <SearchBox>
                {filteredData !== null &&
                  filteredData.map((value, index) => {
                    return (
                      <SubLink
                        to={`/package/${value.route}`}
                        state={{
                          _id: value._id,
                          index: index,
                        }}
                      >
                        {value.name}
                      </SubLink>
                    )
                  })}
              </SearchBox>
            )}
          </MenuLink2>
        )}
      </MenuLinks>
      <HamburgerIcon
        src={
          color === "#fff"
            ? HamburgerWhite
            : color === "#004a8c"
            ? Hamburger
            : HamburgerBlack
        }
        onClick={() => setToggleMenu(true)}
      />
      <AnimatePresence>
        {toggleMenu && (
          <HamburgerMenu
            closeMenu={() => setToggleMenu(false)}
            changePageData={changePageData}
            color={color}
            isHomePage={isHomePage}
          />
        )}
      </AnimatePresence>
    </MenuContainer>
  )
}

const HamburgerMenu = ({ closeMenu, changePageData, color, isHomePage }) => {
  const menuClicked = (e, index) => {
    if (!isHomePage) return
    e.preventDefault()
    changePageData(index)
    closeMenu()
  }

  return (
    <HMenuContainer
      as={motion.div}
      animate={{ y: 0 }}
      initial={{ y: -1000 }}
      exit={{ y: -1000 }}
      transition={{ duration: 0.3 }}
    >
      <CloseMenu onClick={closeMenu}>
        <span style={{ color: "white", fontSize: "200%" }}>X</span>
      </CloseMenu>
      <HInnerMenu>
        <MenuLink to="/">
          <MenuProfileIcon src={WhiteLogo} alt="Profile Icon" />
        </MenuLink>
        <LinkHamburger
          to="/"
          color="black"
          state={{ pageNumber: 0 }}
          onClick={(e) => menuClicked(e, 0)}
        >
          Home
        </LinkHamburger>
        <LinkHamburger to="/packages" color="black" state={{ pageNumber: 1 }}>
          Expeditions
        </LinkHamburger>
        <LinkHamburger to="/trekkings" color="black" state={{ pageNumber: 2 }}>
          Trekking
        </LinkHamburger>
        <LinkHamburger
          to="/destinationa"
          color="black"
          state={{ pageNumber: 3 }}
        >
          Destinations
        </LinkHamburger>
        <LinkHamburger to="/events" color="black" state={{ pageNumber: 4 }}>
          Events
        </LinkHamburger>
        <LinkHamburger to="/usefulInfo" color="black" state={{ pageNumber: 5 }}>
          Useful Info
        </LinkHamburger>

        <LinkHamburger to="/about" color="black" state={{ pageNumber: 6 }}>
          About Us
        </LinkHamburger>
      </HInnerMenu>
    </HMenuContainer>
  )
}

const NewLogo = styled.img`
  width: 150px;
`

const HoverLink = styled.div`
  position: absolute;
  left: 100%;
  top: 0;
  width: 100%;

  background: #004a8c;
  width: 200%;

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10% 5% 5% 5%;
`

const SearchBox = styled.div`
  position: absolute;
  right: 0;
  top: 105%;
  display: flex;
  flex-direction: column;
  background: #004a8c;
  width: 100%;
  gap: 5px;
  padding: 2% 5%;
`

const SearchInput = styled.input`
  min-width: 100%;
  border: 1px solid #004a8c;
  background: none;
  margin-left: auto;
  color: #004a8c;
`

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 2%; ;
`

const MenuProfileIcon = styled.img`
  @media (max-width: 1300px) {
    transform: scale(0.8);
  }
`

const HamburgerIcon = styled.img`
  width: 3rem;
  position: absolute;
  right: 3vw;

  @media (min-width: 900.1px) {
    visibility: hidden;
  }
`

const HMenuContainer = styled.div`
  position: fixed;

  width: 100vw;
  height: 100vh;
  z-index: 90;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(0, 73, 135);

  display: flex;
  justify-content: center;
`

const CloseMenu = styled.button`
  border: none;
  background: none;
  color: #000;

  font-size: 20px;
  padding: 20px;

  position: fixed;
  right: 10%;
  top: 2%;
`

const HInnerMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 10%;

  @media (max-width: 1100px) {
    margin-top: 40%;
  }

  @media (max-height: 500px) {
    margin-top: 10%;
  }
`

const SubLink = styled(HashLink)`
  text-decoration: none;
  font-size: 1vw;
  font-family: "Arial";
  outline: none;
  cursor: pointer;
  color: #fff;

  color: ${(props) => props.color};

  position: relative;

  &:before {
    content: "";
    position: absolute;

    right: 100%;
    transition: 0.3s right;
  }

  &:hover:before {
    content: "";
    position: absolute;
    left: -0.2rem;
    right: 0;
    top: 102%;
    bottom: -0.35rem;
    background: #ffffff;

    transition: 0.3s right;
  }
`

const SubLinks = styled.div`
  position: absolute;
  top: 110%;
  transform: translateX(-1vw);
  background: rgba(0, 74, 140);
  padding: 15px 15px;

  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  width: 260%;
  max-width: 10vw;

  z-index: 11;
`

const MenuLink = styled(Link)`
  text-decoration: none;
  font-size: 0.9vw;
  font-family: "Arial";
  outline: none;
  cursor: pointer;

  position: relative;

  color: ${(props) => props.color};
  position: relative;

  display: flex;
  align-items: center;
  transition: color 0.6s;

  &:before {
    content: "";
    position: absolute;

    right: 100%;
    transition: 0.3s right;
  }

  &:hover:before {
    content: "";
    position: absolute;
    left: -0.2rem;
    right: 0;
    top: 105%;
    bottom: -0.35rem;
    background: #004a85;

    transition: 0.3s right;
  }

  &.logo:before {
    opacity: 0;
  }

  @media (max-width: 1600px) {
    font-size: 1vw;
  }

  @media (max-width: 1100px) {
    font-size: 1.7vw;
  }
`

const MenuLink2 = styled(Link)`
  text-decoration: none;
  font-size: 0.9vw;
  font-family: "Arial";
  outline: none;
  cursor: pointer;

  position: relative;

  color: ${(props) => props.color};
  position: relative;

  display: flex;
  align-items: center;
  transition: color 0.6s;

  &:before {
    content: "";
    position: absolute;

    right: 100%;
    transition: 0.3s right;
  }

  &.logo:before {
    opacity: 0;
  }

  @media (max-width: 1600px) {
    font-size: 1vw;
  }

  @media (max-width: 1100px) {
    font-size: 1.7vw;
  }
`

const LinkHamburger = styled(MenuLink)`
  display: block;
  font-size: 4rem;
  color: #fff;

  animation: none;
  transition: none;

  @media (max-width: 1100px) {
    font-size: 2rem;
  }
`

const MenuLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 4vw;
  flex: 1;
  margin-top: 1rem;

  position: relative;
  @media (max-width: 900px) {
    visibility: hidden;
  }
`

const MenuLogo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const MenuContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 5vw;

  height: 15vh;
  width: 100%;
  background: transparent;
  z-index: 3;

  @media (max-width: 1300px) {
    height: 12vh;
  }

  @media (max-width: 900px) {
    height: 7vh;
    position: fixed;
    padding-top: 1rem;
    padding: 2vw;
    top: 0;
    z-index: 8;
  }
`

export default Menu
