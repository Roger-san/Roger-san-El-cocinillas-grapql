import { useQuery, gql } from "@apollo/client"
import React from "react"

import emptyImage from "../empty-image.jpg"

export default function RecipeCard({ recipe, renderRecipe }) {
  const getImage = (imageName) => {
    const GET_IMAGE = gql`
      query getImage($name: String!) {
        getImage(name: $name) {
          data
          name
        }
      }
    `
    const { loading, error, data } = useQuery(GET_IMAGE, {
      variables: {
        name: imageName
      }
    })
    if (loading || error) return emptyImage
    if (data) {
      localStorage[data.getImage.name] = data.getImage.data
      return data.getImage
    }
  }
  // call's the renderRecipe to render all the recipe info
  const handleClick = (event) => {
    event.preventDefault()
    renderRecipe(recipe)
  }
  return (
    <div className="card" onClick={handleClick}>
      <div className="img-wrapper">
        <img
          src={(getImage(recipe.frontImage) && getImage(recipe.frontImage).data) || emptyImage}
          className="card-img-top"
          alt={getImage(recipe.frontImage) && getImage(recipe.frontImage).name}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{recipe.recipeName}</h5>
        <p className="card-text">{recipe.description}</p>
        <p className="card-author">By {recipe.author}</p>
      </div>
    </div>
  )
}
