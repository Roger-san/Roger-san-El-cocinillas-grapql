import { useQuery, gql } from "@apollo/client"
import React, { useState, useEffect } from "react"
import FastAverageColor from "fast-average-color"

import RecipeCard from "../RecipeCard"
import emptyImage from "../../empty-image.jpg"

export default function Recipe({ actualRecipe, renderRecipe }) {
  // get the primary color of the img and sets the background color
  // of body
  const changeBackgroundColor = () => {
    const fac = new FastAverageColor()
    fac
      .getColorAsync(document.querySelector("img"))
      .then((color) => {
        color = color.rgba.replace(",1)", ",0.35)")
        document.body.style.backgroundColor = color
      })
      .catch((e) => {
        console.log(e)
      })
    fac.destroy()
  }
  const GET_AUTHOR_RECIPES = gql`
    query ($authorName: String!, $name: String!) {
      findAuthor(author: $authorName) {
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
      getImage(name: $name) {
        data
        name
      }
    }
  `
  const { loading, error, data } = useQuery(GET_AUTHOR_RECIPES, {
    variables: {
      authorName: actualRecipe.author,
      name: actualRecipe.frontImage
    }
  })
  if (!localStorage[actualRecipe.frontImage] && data && data.getImage) {
    localStorage[data.getImage.name] = data.getImage.data
  }

  useEffect(() => {
    changeBackgroundColor()
  })

  return (
    <>
      <div id="top-secction">
        <img
          className="recipe-image"
          src={localStorage[actualRecipe.frontImage] || (data && data.frontImage.data) || emptyImage}
          alt={actualRecipe.frontImage}
        ></img>
        <div id="name-description-container">
          <h2>{actualRecipe.recipeName}</h2>
          <h4>{actualRecipe.description}</h4>
        </div>
      </div>
      <div id="ingredients-container">
        <h4>Ingredients</h4>
        <ul>
          {actualRecipe.ingredients.map((ingredient, i) => (
            <li key={`ingredient-${i}`}>
              <span className="ingredients-span" key={`ingredient-qty-${i}`}>
                {ingredient.quantity}{" "}
              </span>
              <span className="ingredients-span" key={`ingredient-name-${i}`}>
                {ingredient.ingredient}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div id="steps-container">
        {actualRecipe.steps.map((step, i) => (
          <div className="step-div" key={`step-${i}`}>
            <span className="step-span">Step {i + 1}: </span>
            <span>{step}</span>
          </div>
        ))}
      </div>
      {/*
      if the user got more than 1 recipe 
      render the author recipes minus the actual recipe
      */}
      {data && data.findAuthor.recipes.length > 1 && (
        <div className="author-recipes-container">
          <h3>More author recipes:</h3>
          <div className="author-recipes">
            {data &&
              data.findAuthor.recipes
                .filter((recipe) => recipe.recipeName !== actualRecipe.recipeName)
                .map((recipe, i) => (
                  <RecipeCard key={`author-recipe-${i}`} position={i + 1} recipe={recipe} renderRecipe={renderRecipe} />
                ))}
          </div>
        </div>
      )}
    </>
  )
}
