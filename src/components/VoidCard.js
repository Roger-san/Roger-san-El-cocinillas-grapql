import React, { Component } from "react"
import emptyImage from "../empty-image.jpg"

export default class VoidCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="img-wrapper">
          <img src={emptyImage} className="card-img-top" alt="recipe img" />
        </div>
        <div className="card-body">
          <h5 className="card-title">"Card title"</h5>
          <p className="card-text">
            "Some quick example text to build on the card title and make up the bulk of
            the card's content."
          </p>
        </div>
      </div>
    )
  }
}
