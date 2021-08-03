import React, { useState } from "react"
import Login from "./Login"
import Register from "./Register"

export default function MainModal({ sendUserData }) {
  const [loginPage, setLoginPage] = useState(true)

  return (
    <div className="modal fade" id="staticBackdrop" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          {loginPage ? (
            <Login setLoginPage={setLoginPage} sendUserData={sendUserData} />
          ) : (
            <Register setLoginPage={setLoginPage} sendUserData={sendUserData} />
          )}
        </div>
      </div>
    </div>
  )
}
