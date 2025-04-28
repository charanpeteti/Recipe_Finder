import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeDetails } from '../services/api';


function RecipeDetails() {
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(()=>{
        const fetchData =async()=> {
            try{
                const recipeData = await fetchRecipeDetails(id);
                setRecipe(recipeData);
            }catch (error){
                console.error('Error fetching recipe details:',error);
            }
        };
        fetchData();
    },[id]);

    if (!recipe) {
        return <div>Loading...</div>;
      }
    
    const ingredients = [];
    const measures = [];
    for (let i=1; i<=20; i++){
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if(ingredient){
            ingredients.push(ingredient);
            measures.push(measure);
        }
    }

    return (
        <div className="recipe-details">
      <h1>{recipe.title}</h1> 
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <p>{recipe.summary}</p> 

      <h2>Ingredients</h2>
      <ul>
        {recipe.extendedIngredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>

      {/* You can add more details here, such as instructions, 
         nutrition information, etc., based on the Spoonacular API response */}
    </div>
    );
}

export default RecipeDetails;