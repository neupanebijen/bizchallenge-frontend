import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { getCode, sendNewPassword } from "../api/expeditions"

const Authenticate = ({ authenticateUser, logout, isAdmin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const buttonClick = () => {
    authenticateUser(username, password)
    setUsername("")
    setPassword("")
  }

  return (
    <Container>
      {!isAdmin ? (
        <>
          <h3>Login</h3>
          <Input
            label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
          <Input
            type="password"
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <Button onClick={buttonClick}>Login</Button>
        </>
      ) : (
        <div>
          <h3>Logout</h3>
          <Button onClick={logout}>Logout</Button>
        </div>
      )}
      <LinkStyled to="/">Back to site</LinkStyled>
      <ResetPasswordComponent />
    </Container>
  )
}

const ResetPasswordComponent = () => {
  const [resetPassword, setResetPassword] = useState(false)
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordAgain, setNewPasswordAgain] = useState("")

  const formSubmitted = async (e) => {
    e.preventDefault()
    if (newPassword.length < 8) {
      alert("Password length must be more than 8 characters")
      return
    }

    if (newPassword !== newPasswordAgain) {
      alert("Passwords do not match")
      return
    }

    const result = await sendNewPassword(newPassword, code)
    console.log(result)
    if (result.success) {
      alert("Password reset successful")
      window.location.reload()
    } else {
      alert(
        result.message
          ? result.message
          : "Something went wrong. Contact support."
      )
    }
  }

  const getCodeFn = async () => {
    const result = await getCode()
    if (result.success) {
      setCode(result.code)
      alert("Please check the mail for the code")
    } else {
      alert("Something went wrong. Contact support. ")
    }
  }

  return (
    <div>
      <Button
        onClick={() => setResetPassword(!resetPassword)}
        style={{ display: "block" }}
      >
        Reset Password
      </Button>
      {resetPassword && <Button onClick={getCodeFn}>Get Code</Button>}
      {resetPassword && (
        <form onSubmit={formSubmitted}>
          <Info>Password length must be more than 8 characters.</Info>
          <label>New Password</label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label>New Password Again</label>
          <Input
            type="password"
            value={newPasswordAgain}
            onChange={(e) => setNewPasswordAgain(e.target.value)}
          />
          <label>Enter Code</label>
          <Input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button as="input" type="submit" value="Submit" />
        </form>
      )}
    </div>
  )
}

const Info = styled.div`
  font-size: 14px;
  color: red;
  margin-top: 15px;
`

const Button = styled.button`
  font-size: 2rem;
  padding: 1rem;
  margin: 1rem 0;
  width: 20rem;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  font-size: 200%;
  padding: 2rem 2rem;
  position: relative;
`

const LinkStyled = styled(Link)`
  position: absolute;
  top: 2rem;
  right: 2rem;
`

const Input = styled.input`
  width: 20rem;
`

export default Authenticate
