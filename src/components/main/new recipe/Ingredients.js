import React from "react"

export default function Ingredients({ changeListQuantity, position, values, saveListChanges }) {
  // calls the changeListQuantity to add or delete a li
  const handleClick = (event) => {
    changeListQuantity(event, position)
  }
  // saves all the ingredients data and sends it to the NewRecipe state
  const handleChange = () => {
    const allIngredients = [...document.getElementsByClassName("ingredient-name")].map((x) => x.value)
    const allQuantity = [...document.getElementsByClassName("quantity")].map((x) => x.value)
    const allIngredientsCuantity = allIngredients.map((ingredient, i) => ({
      ingredient: ingredient,
      quantity: allQuantity[i]
    }))
    saveListChanges("ingredients", allIngredientsCuantity)
  }
  return (
    <div className="ingredient-container">
      <div className="ingredient">
        <input
          type="text"
          name={`ingredient-${position + 1}`}
          value={values.ingredient}
          className="ingredient-name"
          onChange={handleChange}
          placeholder="Ingredient"
          minLength="3"
          maxLength="30"
          required
        />
        <input
          type="text"
          name={`quantity-${position + 1}`}
          value={values.quantity}
          className="quantity"
          onChange={handleChange}
          placeholder="Quantity"
        />
      </div>
      <button onClick={handleClick} className="add-ingredient">
        +
      </button>
      <button onClick={handleClick} className="delete-ingredient">
        -
      </button>
    </div>
  )
}
