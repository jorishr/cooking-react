import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList'
import '../css/app.css'
import uuidv4 from 'uuid/v4'
import RecipeEdit from './RecipeEdit';

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'react-cooking.recipes'

function App() {
  //state for editing: only id is required, it has no default state
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  //default state for recipes(list) is the sampleRecipes arr defined below
  const [recipes, setRecipes] = useState(sampleRecipes)
  //the selectedRecipe is either undefined or the one with an id corresponding 
  //to the one selected by the user (by clickning edit, see Recipe.js)
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)
  
  useEffect(() => {
    const recipesJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(recipesJSON != null) {setRecipes(JSON.parse(recipesJSON))} 
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  //context api value
  const recipeContextVal = { handleRecipeAdd, handleRecipeDelete, handleRecipeSelect, handleRecipeChange }
  
  function handleRecipeSelect(id) { 
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: 'Instr.',
      ingredients: [
        { id: uuidv4(), name: 'Name', amount: '1 Tbs' }
      ]
    }
    //set the new state to be to old arr (spreaded out), plus the newRecipe
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  function handleRecipeChange(id, updatedRecipe){
    const newRecipes  = [...recipes]
    const index       = newRecipes.findIndex(r => r.id === id) 
    newRecipes[index] = updatedRecipe
    setRecipes(newRecipes)
  }

  return (
    <RecipeContext.Provider value={recipeContextVal}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions: "1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: "1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '3 Pounds'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 Tbs'
      }
    ]
  }
]

export default App;