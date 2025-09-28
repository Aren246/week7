import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const newRecipe = {
      title: title,
      ingredients: ingredients,
      instructions: instructions
    };

    try {
      const response = await fetch('http://localhost:8080/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe)
      });

      if (response.ok) {
        alert('Recipe created!');
        navigate('/');
      } else {
        alert('Failed to create recipe');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Recipe Title:</label>
          <input
            className="form-control"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., Chocolate Cookies"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            className="form-control"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            rows="5"
            placeholder="List all ingredients..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            className="form-control"
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
            rows="6"
            placeholder="Step by step instructions..."
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Creating...' : 'Create Recipe'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;