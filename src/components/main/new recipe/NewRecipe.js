import { useMutation, gql } from "@apollo/client"
import React, { useState } from "react"

import Steps from "./Steps"
import Ingredients from "./Ingredients"

const CREATE_RECIPE = gql`
  mutation createRecipe(
    $userData: Author!
    $author: String!
    $recipeName: String!
    $description: String!
    $ingredients: [Ingredient!]
    $steps: [String!]
    $image: Image
  ) {
    createRecipe(
      userData: $userData
      author: $author
      recipeName: $recipeName
      description: $description
      ingredients: $ingredients
      steps: $steps
      image: $image
    ) {
      id
      author
      recipes {
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
`
export default function NewRecipe(userData, newLoggedUserData) {
  const [author, setAuthor] = useState(userData.loggedUserData.author)
  const [recipeName, setRecipeName] = useState(null)
  const [description, setDescription] = useState(null)
  const [ingredients, setIngredients] = useState([
    { ingredient: "", quantity: "" },
    { ingredient: "", quantity: "" }
  ])
  const [steps, setSteps] = useState(["", ""])
  const [frontImage, setFrontImage] = useState(null)

  console.log(userData.loggedUserData.id, author)
  const [createRecipe] = useMutation(CREATE_RECIPE)
  // adds and deletes the li of steps and ingrdients
  const changeListQuantity = (event, position) => {
    switch (event.target.className) {
      case "add-ingredient":
        const newIngredients = [...ingredients]
        newIngredients.push({ ingredient: "", quantity: "" })
        setIngredients(newIngredients)
        break
      case "delete-ingredient":
        if (ingredients.length !== 1) {
          const newIngredients = [...ingredients]
          newIngredients.splice(position, 1)
          setIngredients(newIngredients)
        }
        break
      case "add-step":
        const newSteps = [...steps]
        newSteps.push("")
        setSteps(newSteps)
        break
      case "delete-step":
        if (steps.length !== 1) {
          let newSteps = [...steps]
          newSteps.splice(position, 1)
          setSteps(newSteps)
        }
        break
    }
  }
  // send a POST with the img data and another with the
  // user and state data
  const handleOnSubmit = (event) => {
    event.preventDefault()
    if (document.querySelector("input[type=file]").files[0]) {
      const file = document.querySelector("input[type=file]").files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const image = { data: reader.result, frontImage }
        console.log(userData)
        console.log({ author, recipeName, description, ingredients, steps, image, data: reader.result })
        createRecipe({
          variables: {
            userData: userData.loggedUserData,
            author,
            recipeName,
            description,
            ingredients,
            steps,
            image
          }
        }).then((NewUserData) => {
          newLoggedUserData(NewUserData)
          document.location.href = "/"
        })
      }
    }
  }
  // saves the data into the state
  // if is a img calls renderImage() too
  const handleOnChange = (event) => {
    const { id, value } = event.target
    if (id === "frontImage" && document.querySelector("input[type=file]").files[0]) {
      renderImage()
      setFrontImage(document.querySelector("input[type=file]").files[0].name)
    } else {
      switch (id) {
        case "recipeName":
          setRecipeName(value)
          break
        case "description":
          setDescription(value)
          break
      }
    }
  }
  // saves the data of steps and ingrdients
  //  into the state
  const saveListChanges = (type, data) => {
    if (type === "ingredients") setIngredients(data)
    if (type === "steps") setSteps(data)
  }
  // shows the loaded img on top of the page
  const renderImage = () => {
    const preview = document.getElementById("preview")
    const file = document.querySelector("input[type=file]").files[0]
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      preview.src = reader.result
      if (!preview.classList.contains("width")) {
        preview.classList.toggle("width")
      }
    }
  }
  return (
    <form id="new-recipe-form" onSubmit={handleOnSubmit}>
      <div id="top-form">
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          id="preview"
          alt="preview"
        ></img>
        <div id="top-div">
          <input
            type="text"
            name="recipeName"
            id="recipeName"
            onChange={handleOnChange}
            placeholder="Recipe name"
            minLength="3"
            maxLength="40"
            required
          />
          <textarea
            placeholder="Description"
            id="description"
            name="description"
            rows="5"
            onChange={handleOnChange}
            maxLength="150"
          ></textarea>
        </div>
      </div>
      <div id="ingredients-container">
        {ingredients.map((values, i) => (
          <Ingredients
            values={values}
            position={i}
            key={`ingredient-${i}`}
            changeListQuantity={changeListQuantity}
            saveListChanges={saveListChanges}
          />
        ))}
      </div>
      <div id="steps-container">
        {steps.map((value, i) => (
          <Steps
            value={value}
            position={i}
            key={`step-${i}`}
            changeListQuantity={changeListQuantity}
            saveListChanges={saveListChanges}
          />
        ))}
      </div>
      <div id="form-bottom">
        <label id="file-button">
          Add image
          <input type="file" accept="image/*" id="frontImage" name="image" onChange={handleOnChange} />
        </label>
        <button id="form-button" type="submit">
          Send
        </button>
      </div>
    </form>
  )
}
