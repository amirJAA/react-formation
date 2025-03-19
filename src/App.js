import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import RecipeForm from './pages/recipeForm';
import RecipeList from './pages/recipeList';
import RecipeDetail from './pages/recipeDetails';

function App() {
  return (
    <div>
      <h1>Neos Cooking</h1>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/create" element={<RecipeForm />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/edit/:id" element={<RecipeForm />} />
      </Routes>
    </div>
  );
}

export default App;
