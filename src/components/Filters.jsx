import React, { useState } from 'react';

function Filters({onFilterChange }){
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        onFilterChange({category: event.target.value, cuisine: selectedCuisine});
    }

    const handleCuisineChange = (event) => {
        setSelectedCuisine(Event.target.value);
        onFilterChange({category: selectedCategory, cuisine: event.target.value})
    }

    return (
        <div className="filters">
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            <option value="Seafood">Seafood</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Dessert">Dessert</option>
            {/* Add more category options here */}
          </select>
    
          <select value={selectedCuisine} onChange={handleCuisineChange}>
            <option value="">All Cuisines</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Indian">Indian</option>
            {/* Add more cuisine options here */}
          </select>
        </div>
      );
}

export default Filters;