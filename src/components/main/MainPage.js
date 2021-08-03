import React from "react"

import Pagination from "../Pagination"
import RecipeCard from "../RecipeCard"
import Recipe from "./Recipe"
import NewRecipe from "./new recipe/NewRecipe"

export default function MainPage({
  state: { page, pagePosition, loggedUserData, actualRecipe, setPagePosition },
  functions: { renderRecipe },
  totalRecipes,
  findRecipesByPage,
  newLoggedUserData
}) {
  // render the main section of the page depending
  // on witch page is set
  switch (page) {
    case "newRecipe":
      return (
        <div className="container">
          {<NewRecipe loggedUserData={loggedUserData} newLoggedUserData={newLoggedUserData} />}
        </div>
      )
    case "authorRecipes":
      return (
        <div className="container">
          {loggedUserData.recipes.map((recipe, i) => (
            <RecipeCard key={`recipe-${i}`} recipe={recipe} renderRecipe={renderRecipe} />
          ))}
        </div>
      )
    case "recipes":
      return (
        <div className="container">
          {findRecipesByPage.map((recipe, i) => (
            <RecipeCard key={`recipe-${i}`} recipe={recipe} renderRecipe={renderRecipe} />
          ))}
          <Pagination totalRecipes={totalRecipes} setPagePosition={setPagePosition} pagePosition={pagePosition} />
        </div>
      )

    case "recipe":
      return (
        <div className="container recipe-pag">
          <Recipe actualRecipe={actualRecipe} renderRecipe={renderRecipe} />
        </div>
      )
  }
}
