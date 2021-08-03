import React from "react"

export default function Steps({ changeListQuantity, position, saveListChanges, value }) {
  // calls the handleListsQuantityChange to add or delete a li
  const handleClick = (event) => {
    changeListQuantity(event, position)
  }
  // saves all the steps data and sends it to the NewRecipe state
  const handleChange = () => {
    const allSteps = Array.from(document.getElementsByClassName("step")).map((x) => x.value)
    saveListChanges("steps", allSteps)
  }
  return (
    <div className="step-container">
      <label className="step-label">{`Step ${position + 1}:  `}</label>
      <input
        type="text"
        name={`step-${position + 1}`}
        className="step"
        onChange={handleChange}
        value={value}
        minLength="5"
        maxLength="300"
        required
      />
      <button onClick={handleClick} className="add-step">
        +
      </button>
      <button onClick={handleClick} className="delete-step">
        -
      </button>
    </div>
  )
}
