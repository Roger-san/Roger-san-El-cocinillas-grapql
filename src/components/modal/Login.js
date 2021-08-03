import { useLazyQuery, gql } from "@apollo/client"
import React, { useState, useEffect } from "react"

const GET_USER = gql`
  query loginWhithPassword($email: String!, $password: String!) {
    loginWhithPassword(email: $email, password: $password) {
      token
      user {
        id
        author
        recipes {
          author
          recipeName
          description
          ingredients {
            quantity
            ingredient
          }
          steps
          frontImage
        }
      }
    }
  }
`

export default function Login({ setLoginPage, sendUserData }) {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [message, setMessage] = useState(null)

  // post the form data if is a success closes the modal
  // else show a error message to the user
  const handleOnChange = (event) => {
    const { id, value } = event.target
    if (id === "email") setEmail(value)
    if (id === "password") setPassword(value)
  }
  // changes to the register modal or
  // close and reset all the Login values and states
  const handleClick = (event) => {
    if (event.target.id === "register") setLoginPage(false)
    if (event.target.id === "close") {
      document.getElementById("email").value = ""
      document.getElementById("password").value = ""
      setEmail("")
      setPassword("")
    }
  }
  const modal = [...document.getElementsByClassName("modal-backdrop")]
  const divErrorMesssage = document.getElementById("error-message")

  const [getUser, { error, data }] = useLazyQuery(GET_USER)
  useEffect(() => {
    if (data) {
      // if the data is null shows a error message
      if (data.loginWhithPassword == null && divErrorMesssage.classList.length === 0) {
        divErrorMesssage.classList.toggle("display")
        setMessage(" Email or password incorrect")
      }
      // if everything is ok hidde the error message if is on
      // and closes the modal, then saves the token and the user data
      else {
        if (divErrorMesssage.classList.length !== 0) divErrorMesssage.classList.toggle("display")
        console.log("User looged:", data.loginWhithPassword)
        localStorage.token_el_cocinillas = data.loginWhithPassword.token
        modal.forEach((modal) => (modal.style.display = "none"))
        document.body.style.overflow = "auto"
        sendUserData(data.loginWhithPassword.authors)
      }
    }
    if (error) {
      // show a error message if the query fails
      if (divErrorMesssage.classList.length === 0) {
        divErrorMesssage.classList.toggle("display")
        setMessage("User or password are incorrect ")
      } else setMessage("User or password are incorrect ")
    }
  })

  return (
    <>
      <div className="modal-header">
        <h1>Login</h1>
      </div>
      <form>
        <label>
          Email:
          <input
            type="email"
            name="email"
            id="email"
            max="40"
            className="form-control"
            onChange={handleOnChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            id="password"
            minLength="6"
            maxLength="16"
            className="form-control"
            onChange={handleOnChange}
            required
          />
        </label>
        <div id="error-message">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#D9212C" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"></path>
          </svg>
          {message}
        </div>
        <a onClick={handleClick} id="register" href="#">
          Register
        </a>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              getUser({
                variables: {
                  email,
                  password
                }
              })
            }
          >
            Send
          </button>
          <button id="close" onClick={handleClick} type="button" className="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </form>
    </>
  )
}
