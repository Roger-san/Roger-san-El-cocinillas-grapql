import { useMutation, gql } from "@apollo/client"
import React, { useState } from "react"

const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
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
export default function Register({ setLoginPage, sendUserData }) {
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [message, setMessage] = useState(null)

  const handleOnChange = (event) => {
    const { id, value } = event.target
    if (id === "name") setName(value)
    if (id === "email") setEmail(value)
    if (id === "password") setPassword(value)
    if (id === "message") setMessage(value)
  }
  const [createUser] = useMutation(CREATE_USER)
  const divErrorMesssage = document.getElementById("error-message")
  const modal = document.querySelector(".modal-backdrop")

  const handleSubmit = (event) => {
    event.preventDefault()
    createUser({
      variables: {
        name,
        email,
        password
      }
    }).then(({ data, error }) => {
      if (error) {
        // show a error message if the query fails
        if (divErrorMesssage.classList.length === 0) {
          divErrorMesssage.classList.toggle("display")
          setMessage(error)
        } else setMessage(error)
      }
      if (data) {
        // if the data is null shows a error message
        if (data.createUser == null && divErrorMesssage.classList.length === 0) {
          setMessage(" The name or the email is already in use")
          divErrorMesssage.classList.toggle("display")
        }
        // if everything is ok hidde the error message if is on
        // and closes the modal, then saves the token and the user data
        if (data.createUser != null) {
          if (divErrorMesssage.classList.length !== 0) divErrorMesssage.classList.toggle("display")
          console.log("User created:", data.createUser)
          localStorage.token_el_cocinillas = data.createUser.token
          modal.style.display = "none"
          sendUserData(data.createUser.authors)
        }
      }
    })
  }
  // reset everything and change the page to Login
  const handleClick = () => {
    document.getElementById("email").value = ""
    document.getElementById("password").value = ""
    document.getElementById("name").value = ""
    setEmail("")
    setPassword("")
    setName("")
    setLoginPage(true)
    if (divErrorMesssage.classList.length !== 0) divErrorMesssage.classList.toggle("display")
  }

  return (
    <>
      <div className="modal-header">
        <h1>Register</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            id="name"
            max="20"
            className="form-control"
            onChange={handleOnChange}
            required
          />
        </label>
        <label>
          {" "}
          Email:
          <input
            type="email"
            name="email"
            id="email"
            max="40"
            placeholder="No need of a real Email"
            className="form-control"
            onChange={handleOnChange}
            required
          />
        </label>
        <label>
          Password:{" "}
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
        <div className="modal-footer register-modal-footer">
          <button type="submit" className="btn btn-primary">
            Send
          </button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClick}>
            Close
          </button>
        </div>
      </form>
    </>
  )
}
