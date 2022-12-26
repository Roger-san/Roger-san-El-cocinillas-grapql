import React from "react"
import { render } from "react-dom"
import App from "./App"

import "./scss.scss"
import "bootstrap/dist/js/bootstrap.min"
import "jquery/dist/jquery.min"

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const client = new ApolloClient({
  uri: `https://el-cocinillas-graphql-api-production.up.railway.app/`,
  cache: new InMemoryCache({
    addTypename: false
  })
})

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
