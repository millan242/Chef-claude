import React, { useEffect, useRef, useState } from "react";
import { Plus } from 'lucide-react';
import ClaudeRecipe from "./Clauderecipe";
import IngredientList from "./IngredientList";
import { getRecipeFromHuggingFace } from "../../ai";

export default function Form() {
    const [ingredient, setIngredient] = useState("");
    const [ingredients, setIngredients] = React.useState([]);
    const [recipeShown, setRecipeShown] = React.useState("")
    const [isLoading, setIsLoading] = useState(false);
    const showRecipeSection = React.useRef(null)
    React.useEffect(() => {
        if (recipeShown !== "" && showRecipeSection.current !== null) {
            showRecipeSection.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [recipeShown])
    const getRecipe = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const genRecipe = await getRecipeFromHuggingFace(ingredients);
        setRecipeShown(genRecipe);
        setIsLoading(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (ingredient.trim()) {
            setIngredients([...ingredients, ingredient.trim()]);
            setIngredient("");
        }
    };
    const handleDeleteIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };
    return (
        <main>
            <h2 className="heading">Let's create something <span>delicious</span>😋</h2>
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
            {ingredients.length === 0 && (
                <p className="empty-state">Your kitchen is empty! Add ingredients to get cooking...</p>
            )}
            {ingredients.length > 0 && <IngredientList ref={showRecipeSection} ingredients={ingredients}
                getRecipe={(e) => getRecipe(e)} deleteIngredient={handleDeleteIngredient} isLoading={isLoading} />}
            {recipeShown && <ClaudeRecipe recipeShown={recipeShown} />}
        </main>
    );
}