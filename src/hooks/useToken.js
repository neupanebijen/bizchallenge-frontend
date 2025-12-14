import { useState } from "react"

const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem("token")
    const userToken = JSON.parse(tokenString)
    return userToken
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken))
    setToken(JSON.parse(localStorage.token))
  }

  const clearToken = () => {
    localStorage.clear()
    setToken(undefined)
  }

  return {
    setToken: saveToken,
    clearToken,
    token,
  }
}

export default useToken
