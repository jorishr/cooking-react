  
import React from 'react'
import Recipe from './Recipe'

export default function RecipeList({ recipes }) {
  return (
    <div className="recipe-list">
    {/*Each time you loop over an array and create components, make 
    sure they have a unique key. If not react will complain as it needs
    to know which component to update*/}
      <div>
        {recipes.map(recipe => {
          return (
            <Recipe key={recipe.id} {...recipe} />
          )
        })}
      </div>
      <div className="recipe-list__add-recipe-btn-container">
        <button className="btn btn--primary">Add Recipe</button>
      </div>
    </div>
  )
}

