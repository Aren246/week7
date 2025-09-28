import React, { useState, useEffect } from 'react';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRecipes = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/recipes');
      const data = await response.json();
      console.log('Got recipes:', data);
      setRecipes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error getting recipes:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      getRecipes();
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <div className="loading">Loading recipes...</div>;
  }

  return (
    <div>
      <h1>All Recipes</h1>
      {recipes.length === 0 ? (
        <div className="empty-state">
          <h2>No recipes yet!</h2>
          <p>Add the first one to get started.</p>
        </div>
      ) : (
        <div>
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;