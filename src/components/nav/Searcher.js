import { useQuery, gql } from "@apollo/client"
import React, { useState } from "react"

export default function Searcher({ optionList, setPage, setActualRecipe }) {
  const [inputValue, setInputValue] = useState("")
  const [sendQuery, setSendQuery] = useState(false)

  // saves the input data into the state
  // if the input have the error class is deleted
  const handleChange = (event) => {
    setInputValue(event.target.value)
    console.log(optionList, inputValue)
    if ([...document.getElementById("searchInput").classList].includes("error"))
      document.getElementById("searchInput").classList.toggle("error")
  }

  // looks for the searched recipe if doesnt get a recipe
  // toogles the error class in the input
  const GET_RECIPE = gql`
    query findRecipeByName($recipeName: String, $sendQuery: Boolean!) {
      findRecipeByName(recipeName: $recipeName) @skip(if: $sendQuery) {
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
  `
  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: {
      recipeName: inputValue,
      sendQuery
    }
  })
  if (error) {
    if (sendQuery && ![...document.getElementById("searchInput").classList].includes("error")) {
      document.getElementById("searchInput").classList.toggle("error")
    }
  }
  if (data && Object.keys(data).length !== 0) {
    document.getElementById("searchInput").value = ""
    setInputValue("")
    setSendQuery(false)
    setPage("recipe")
    setActualRecipe(data.findRecipeByName)
  }
  // toogles the sendQuery state to true letting GET_RECIPE to find the recipe
  const hadleSubmit = (event) => {
    event.preventDefault()
    setSendQuery(true)
  }
  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={hadleSubmit}>
      <input
        className="form-control mr-sm-2"
        type="search"
        list="search"
        name="search"
        id="searchInput"
        autoComplete="false"
        autoSave="false"
        placeholder="Search"
        onChange={handleChange}
      ></input>
      <datalist id="search">
        {inputValue.length >= 2 &&
          optionList.map((recipe, index) => <option key={index} value={recipe.recipeName}></option>)}
      </datalist>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  )
}
