import React, { useState } from "react";
import { Plus } from 'lucide-react'

export default function Form() {
    const [ingredient, setIngredient] = useState("");
    const [ingredients, setIngredients] = React.useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (ingredient.trim()) {
            setIngredients([...ingredients, ingredient.trim()]);
            setIngredient("");
        }
    };
    return (
        <main>
            <form onSubmit={(e) => handleSubmit(e)} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="Enter an ingredient (e.g., oregano)"
                    value={ingredient}
                    aria-label="Add ingredient"
                    name="ingredient"
                    onChange={(e) => setIngredient(e.target.value)}
                />
                <button type="submit"><Plus size={15} />Add ingredient</button>
            </form>
            {ingredients.length > 0 && (
                <section>
                    <h2>Ingredients on hand:</h2>
                    <ul className="ingredient-list">
                        {ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <div className="get-recipe-container">
                        <div className="recipe-content">
                            <h3>Ready for a recipe?</h3>
                            <p>Generate a recipe from your list of ingredients.</p>
                        </div>
                        <button>Get a recipe</button>
                    </div>
                </section>
            )}
        </main>
    );
}
