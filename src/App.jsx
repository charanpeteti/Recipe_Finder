import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from '../src/RecipeList';
import RecipeDetails from '../src/components/RecipeDetails';
import UserAuth from './components/UserAuth';
import { AuthProvider } from './contexts/AuthContext';
import FavoritesProvider from './contexts/FavoritesContext';

function App() {
  return (
    <AuthProvider> 
      <FavoritesProvider> 
        <Router>
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/auth" element={<UserAuth />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;