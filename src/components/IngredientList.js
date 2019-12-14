import React from 'react'
import Ingredient from './Ingredient'

export default function IngredientList({ ingredients }) {
  //for each of the ingredients in the arr create a component defined in Ingredient.js
  const ingredientElements = ingredients.map(ingredient => {
    return <Ingredient key={ingredient.id} {...ingredient} />
  })
  return (
    <div className="ingredient-grid">
      {ingredientElements}
    </div>
  )
}