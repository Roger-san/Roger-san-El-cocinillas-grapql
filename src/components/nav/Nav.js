import React from "react"

import Searcher from "./Searcher"
import UserMenu from "./UserMenu"

export default function Nav({
  state: { loggedUserData, setPage, setPagePosition, setActualRecipe, page, setLoggedUserData },
  optionList
}) {
  // sends to the initial page (Recipes page 0)
  const handleClick = (event) => {
    event.preventDefault()
    document.body.style.backgroundColor = "rgba(221, 219, 219, 0.5)"
    setPage("recipes")
    setPagePosition(0)
  }
  if (loggedUserData && loggedUserData.length > 0) console.log("user:", loggedUserData)

  return (
    <nav id="nav" className="navbar navbar-expand-lg navbar-light">
      <div>
        <a className="navbar-brand" id="logo" href="#" onClick={handleClick}>
          El cocinillas
        </a>
      </div>

      <Searcher optionList={optionList} setPage={setPage} setActualRecipe={setActualRecipe} />

      {loggedUserData ? (
        <UserMenu loggedUserData={loggedUserData} setPage={setPage} page={page} setLoggedUserData={setLoggedUserData} />
      ) : (
        <a id="login" data-toggle="modal" data-target="#staticBackdrop" href="#staticBackdrop">
          Login
        </a>
      )}
    </nav>
  )
}
