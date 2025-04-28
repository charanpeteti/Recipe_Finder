import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FavoritesContext from '../contexts/FavoritesContext';

function RecipeCard({ recipe }) {
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const isFavorite = favorites.includes(recipe.idMeal);

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites(recipe.idMeal);
      } else {
        await addToFavorites(recipe.idMeal);
      }
    } catch (error) {
      console.error("Error updating favorites:", error); 
    }
  };

  return (
    <Link to={`/recipe/${recipe.idMeal}`}>
      <div className="recipe-card">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <h3>{recipe.strMeal}</h3>
        <button onClick={handleFavoriteClick}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </Link>
  );
}

export default RecipeCard;