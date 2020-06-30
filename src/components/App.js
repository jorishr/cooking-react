import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList'
import '../css/app.css'
import uuidv4 from 'uuid/v4'
import RecipeEdit from './RecipeEdit';
import { defaultRecipes } from './default_samples';

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'react-cooking.recipes'

/**
 * #############
 * State & props
 * #############
 * - state for editing: only id is required, it has no default state
 * - default state for list of recipes is the imported defaultRecipes array 
 * - store the selectedRecipe in a variable that is passed as a prop to the
 * recipeEdit component
 */
function App() {
  //states
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipeList, setRecipeList] = useState(defaultRecipes)
  const selectedRecipe = recipeList.find(recipe => recipe.id === selectedRecipeId)
  //effect hooks to get and set local storage data
  useEffect(() => {
    const recipesJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(recipesJSON != null) {setRecipeList(JSON.parse(recipesJSON))} 
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipeList))
  }, [recipeList])
  //context api object to pass handler functions
  const recipeContextVal = { 
    handleRecipeAdd, 
    handleRecipeDelete, 
    handleRecipeSelect, 
    handleRecipeChange 
  }
  /*
  #################
  Handler functions
  #################
  - select recipe
  - add recipe
  - edit recipe
  - delete recipe

  #############
  Select recipe
  #############
  - default state is undefined, none selected
  */
  function handleRecipeSelect(id) { 
    setSelectedRecipeId(id)
  }
  /* 
  ##########
  Add recipe
  ##########
  - Display the newRecipe default values in the edit screen upon 
  'add recipe' btn click. 
  - Adding a recipe is to set a new state: old arr (spreaded out default 
  values), plus the newRecipe values added by user.*/
  function handleRecipeAdd() {
    //default values
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: uuidv4(), name: '', amount: '' }
      ]
    }
    setSelectedRecipeId(newRecipe.id)
    setRecipeList([...recipeList, newRecipe])
  }
  /**
   * ###########
   * Edit recipe
   * ###########
   * - Collect all current recipes and find recipe to update with id.
   * - Updating the array of recipes with updatedRecipe is setting a new state 
   * for the recipes array
   */
  function handleRecipeChange(id, updatedRecipe){
    const currentRecipeList  = [...recipeList]
    const index = currentRecipeList.findIndex(r => r.id === id) 
    currentRecipeList[index] = updatedRecipe
    setRecipeList(currentRecipeList)
  }
  /**
   * ######
   * Delete 
   * ######
   * - update the state of the recipe list by filtering out the item to delete
   * - item is selected based on its id
   * - update the state of the selected item to undefined
   */
  function handleRecipeDelete(id) {
    //remove the id from the app
    if(selectedRecipeId !== null && selectedRecipeId === id){
      setSelectedRecipeId(undefined)
    }
    setRecipeList(recipeList.filter(recipe => recipe.id !== id))
  }
  //if no selectedRecipe (undefined), the recipeEdit screen should not be rendered
  return (
    <RecipeContext.Provider value={recipeContextVal}>
      <RecipeList recipeList={recipeList} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  )
}
export default App;