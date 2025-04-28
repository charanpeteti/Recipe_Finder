import axios from 'axios';

const API_KEY = '9e628f950d0c49c9b699045b87221c56'; // Replace with your actual Spoonacular API key
const API_BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

const fetchRecipes = async (searchQuery) => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      params: {
        apiKey: API_KEY,
        query: searchQuery,
      },
    });
    return response.data.results; 
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return []; 
  }
};

// You might need to adapt fetchRecipeDetails for Spoonacular API
const fetchRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: {
        apiKey: API_KEY,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return null; 
  }
};

export { fetchRecipes, fetchRecipeDetails };