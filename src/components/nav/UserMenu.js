import React from "react"

export default function UserMenu({ setPage, loggedUserData, page, setLoggedUserData }) {
  // open the user menu options or
  // logout erasing the token and changing page if is necesary
  const handleOnClick = (event) => {
    if (event.target.id === "logout") {
      if (localStorage.token_el_cocinillas) localStorage.removeItem("token_el_cocinillas")
      if (page === "newRecipe" || page === "authorRecipes") setPage("recipes")
      setLoggedUserData(null)
    } else setPage(event.target.id)
  }
  return (
    <>
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {loggedUserData.author.split(" ")[0]}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a
              className={`dropdown-item ${loggedUserData.recipes.length ? null : "disabled"}`}
              href="#"
              id="authorRecipes"
              onClick={handleOnClick}
            >
              Recipes
            </a>
            <a className="dropdown-item" id="newRecipe" href="#" onClick={handleOnClick}>
              Create recipe
            </a>
            <a className="dropdown-item" id="logout" href="#" onClick={handleOnClick}>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </>
  )
}
