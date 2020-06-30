import React, { useContext }from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { RecipeContext } from './App'
import uuidv4 from 'uuid/v4'
/**
 * - Render the recipe edit forms with current data
 * - Render the ingredient forms and pass relevant props
 * - handler functions to manage: 
 *      -- input changes to recipe
 *      -- input changes to ingredients
 */
export default function RecipeEdit({ recipe }) {
   const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)
   function handleChange(changes){
        handleRecipeChange(recipe.id, { ...recipe, ...changes})
   }
   function handleIngredientChange(id, updatedIngredient){
        const newIngredients  = [...recipe.ingredients]
        const index = newIngredients.findIndex(i => i.id === id) 
        newIngredients[index] = updatedIngredient
        handleChange({ ingredients: newIngredients })
   }
   function handleIngredientAdd() {
        const newIngredient = {
          id: uuidv4(),
          name: '',
          amount: ''
        }
        //propagate changes to the recipe object
        handleChange({
          ingredients: [...recipe.ingredients, newIngredient]
        })
   }
   //delete: create a new arr that only has those ingredients without the one 
   //with the id passed to it
   function handleIngredientDelete(id){
        handleChange({ ingredients: recipe.ingredients.filter(i => i.id !== id) })
   }

   return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button className="btn recipe-edit__remove-button"
                onClick={() => handleRecipeSelect(undefined)}>&times;</button>
      </div>
      <div className="recipe-edit__details-grid">
        <label  htmlFor="name"
                className="recipe-edit__label">Name
        </label>
        <input  type="text" name="name" id="name"
                //placeholder={recipe.name}
                defaultValue={recipe.name} 
                onChange={(e) => handleChange({ name: e.target.value })}
                className="recipe-edit__input" />
        <label  htmlFor="cookTime" 
                className="recipe-edit__label">Cook Time
        </label>
        <input  type="text" name="cookTime" id="cookTime"
                className="recipe-edit__input"
                defaultValue={recipe.cookTime}
                onInput={(e) => handleChange({ cookTime: e.target.value })}  />
        <label  htmlFor="servings"  
                className="recipe-edit__label">Servings
        </label>
        <input  type="number" min="1" name="servings" id="servings"
                defaultValue={recipe.servings} 
                onInput={(e) => handleChange({ servings: parseInt(e.target.value) || '' })}
                className="recipe-edit__input" />
        <label  htmlFor="instructions" 
                className="recipe-edit__label">Instructions
        </label>
        <textarea name="instructions"
                defaultValue={recipe.instructions}
                onInput={(e) => handleChange({ instructions: e.target.value })}
                className="recipe-edit__input"
                id="instructions" />
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {/*map over the arr of ingredients and for each ingr create component*/}
        {recipe.ingredients.map(ingredient => 
                <RecipeIngredientEdit 
                        key={ingredient.id} 
                        ingredient={ingredient}
                        handleIngredientChange={handleIngredientChange}
                        handleIngredientDelete={handleIngredientDelete}/>
        )}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button className="btn btn--primary"
                onClick={() => handleIngredientAdd()}>
                Add Ingredient
        </button>
      </div>
    </div>
  )
}