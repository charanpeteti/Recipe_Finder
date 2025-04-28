import React, { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import RecipeCard from './components/RecipeCard';

import { fetchRecipes } from './services/api';

import Filters from './components/Filters';

import SortOptions from './components/SortOptions';

import './styles/RecipeList.css';

function RecipeList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;
  const [filters, setFilters] = useState({ category: '', cuisine: '' });
  const [sortOrder, setSortOrder] = useState('asc');
  const [ingredients, setIngredients] = useState([]); 

  // Use useSearchParams to handle URL parameters (optional)
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const initialSearchQuery = searchParams.get('q') || ''; 
    setSearchQuery(initialSearchQuery); 

    const initialCategory = searchParams.get('category') || ''; 
    const initialCuisine = searchParams.get('cuisine') || ''; 
    setFilters({ category: initialCategory, cuisine: initialCuisine }); 

    const initialSortOrder = searchParams.get('sortOrder') || 'asc'; 
    setSortOrder(initialSortOrder); 

    fetchData(initialSearchQuery, initialCategory, initialCuisine, initialSortOrder, ingredients); 
  }, [searchParams, ingredients]); 

  const fetchData = async (query, category, cuisine, order, ingredientsList) => {
    try {
      const apiKey = '9e628f950d0c49c9b699045b87221c56'; 
      const baseUrl = 'https://api.spoonacular.com/recipes/complexSearch';

      let params = {
        apiKey: apiKey,
        query: query,
      };

      if (ingredientsList.length > 0) {
        params.ingredients = ingredientsList.join(',');
        params.minMissingIngredients = ingredientsList.length - 2; // Adjust as needed
      }

      if (category) {
        params.type = category; // Assuming category maps to recipe type in Spoonacular 
      }

      if (cuisine) {
        params.cuisine = cuisine; 
      }

      const response = await fetch(`${baseUrl}?${new URLSearchParams(params)}`); 
      const data = await response.json(); 

      if (data.results) {
        setRecipes(data.results);
      } else {
        setRecipes([]); 
        console.warn('No recipes found for the given search criteria.');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setRecipes([]); 
    }
  };

  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    setSearchParams({ 
      q: newQuery, 
      category: filters.category, 
      cuisine: filters.cuisine, 
      sortOrder: sortOrder 
    }); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(searchQuery, filters.category, filters.cuisine, sortOrder); 
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setSearchParams({ 
      q: searchQuery, 
      category: newFilters.category, 
      cuisine: newFilters.cuisine, 
      sortOrder: sortOrder 
    }); 
    fetchData(searchQuery, newFilters.category, newFilters.cuisine, sortOrder); 
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setSearchParams({ 
      q: searchQuery, 
      category: filters.category, 
      cuisine: filters.cuisine, 
      sortOrder: newSortOrder 
    }); 
    fetchData(searchQuery, filters.category, filters.cuisine, newSortOrder); 
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes && recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(recipes.length / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>

      <Filters onFilterChange={handleFilterChange} /> 
      <SortOptions onSortChange={handleSortChange} /> 

      <div className="recipe-list">
        {currentRecipes.length > 0 ? ( 
          currentRecipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} /> 
          ))
        ) : (
          <p>No recipes found for the given search criteria.</p> 
        )}
      </div>

      {/* Pagination component (to be implemented) */} 
    </div>
  );
}

export default RecipeList;