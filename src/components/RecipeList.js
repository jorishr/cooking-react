import React, { useContext, useState } from 'react'
import Recipe from './Recipe'
import { RecipeContext } from './App'
/**
 * - Render recipe list (prop received from App.js)
 * - List consists of multiple Recipe components
 * - Search function conditions which items are shown
 * - User input triggers search state changes
 */
export default function RecipeList(props) {
  const { handleRecipeAdd } = useContext(RecipeContext)
  const { recipeList } = props
  //search state
  const [searchText, setSearchText] = useState()

  function handleRecipeSearch(usrInput){
    setSearchText(usrInput)
  }

  const filteredRecipes = 
    searchText != null ? 
    recipeList.filter(r => r.name.toLowerCase().includes(searchText))
    : recipeList

    return (
    <div className="recipe-list">
      <div className="search-box__container">
        <label htmlFor="search">Search a recipe</label>
        <input  type="text" name="search" placeholder="Search for a recipe..."
                onChange={(e) => handleRecipeSearch(e.target.value)}/>
      </div>
      <div>
        {filteredRecipes.map(recipe => {
          return (
            <Recipe key={recipe.id} {...recipe} />
          )
        })}
      </div>
      <div className="recipe-list__add-recipe-btn-container">
        <button
          className="btn btn--primary"
          onClick={handleRecipeAdd}
        >
          Add Recipe
        </button>
      </div>
    </div>
  )
}