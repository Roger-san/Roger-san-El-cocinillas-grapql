import { useQuery, gql } from "@apollo/client"
import React, { useState, useEffect } from "react"

import Nav from "./components/nav/Nav"
import MainPage from "./components/main/MainPage"
import Footer from "./components/Footer"
import MainModal from "./components/modal/MainModal"

const GET_RECIPE = gql`
  query ($page: Int!, $token: String, $isToken: Boolean!) {
    getTotalRecipes {
      qty
      optionList {
        recipeName
      }
    }
    findRecipesByPage(page: $page) {
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
    loginByToken(token: $token) @include(if: $isToken) {
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
`

export default function App() {
  const [page, setPage] = useState("recipes")
  const [loggedUserData, setLoggedUserData] = useState(null)
  const [actualRecipe, setActualRecipe] = useState(null)
  const [pagePosition, setPagePosition] = useState(0)

  document.body.style.backgroundColor = "rgba(221, 219, 219, 0.5)"

  const newLoggedUserData = (data) => {
    setLoggedUserData(data)
  }
  const sendUserData = (data) => setLoggedUserData(data)
  // render the clicked recipe page
  const renderRecipe = (data) => {
    document.location.href = "#nav"
    setPage("recipe")
    setActualRecipe(data)
  }
  const isToken = localStorage["token_el_cocinillas"] ? true : false
  // load multiples of 12 recipes, all the names of the recipes
  // for the options of the searcher
  // and loads the user if exist a token
  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: {
      page: pagePosition,
      token: localStorage["token_el_cocinillas"],
      isToken
    }
  })
  useEffect(() => {
    if (data) {
      function Table(Page, pagePosition, loggedUserData, actualRecipe) {
        this.Page = Page
        this.pagePosition = pagePosition
        this.loggedUserData = loggedUserData
        this.actualRecipe = actualRecipe
      }
      const table = new Table(page, pagePosition, loggedUserData, actualRecipe)
      console.table(table)
    }
  })

  if (loading) return null
  if (error) return `${error}`
  if (data) {
    if (data.loginByToken && data.loginByToken !== loggedUserData) {
      setLoggedUserData(data.loginByToken)
    }
    return (
      <>
        <div id="body">
          <Nav
            state={{
              loggedUserData,
              setPagePosition,
              setPage,
              setActualRecipe,
              page,
              setLoggedUserData
            }}
            optionList={data.getTotalRecipes.optionList}
          />
          <MainPage
            state={{ page, pagePosition, loggedUserData, actualRecipe, setPagePosition }}
            functions={{ renderRecipe }}
            totalRecipes={data.getTotalRecipes.qty}
            findRecipesByPage={data.findRecipesByPage}
            newLoggedUserData={newLoggedUserData}
          />
          <Footer />
          {/* puede que falle si al final implemento la opcion de no usar tokens */}
          {!data.loginByToken && !loggedUserData && (
            <MainModal setLoggedUserData={setLoggedUserData} sendUserData={sendUserData} />
          )}
        </div>
      </>
    )
  }
}
