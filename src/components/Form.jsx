import React, { useEffect, useRef, useState } from "react";
import { Plus } from 'lucide-react';
import ClaudeRecipe from "./Clauderecipe";
import IngredientList from "./IngredientList";
import { getRecipeFromHuggingFace } from "../../ai";

export default function Form() {
    const [ingredient, setIngredient] = useState("");
    const [ingredients, setIngredients] = React.useState([]);
    const [recipeShown, setRecipeShown] = React.useState("")
    const showRecipeSection = React.useRef(null)
    React.useEffect(() => {
        if (recipeShown !== "" && showRecipeSection.current !== null) {
            showRecipeSection.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [recipeShown])
    const getRecipe = async (e) => {
        e.preventDefault();
        const genRecipe = await getRecipeFromHuggingFace(ingredients);
        setRecipeShown(genRecipe);
    }
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
            {ingredients.length > 0 && <IngredientList ref={showRecipeSection} ingredients={ingredients}
                getRecipe={(e) => getRecipe(e)} />}
            {recipeShown && <ClaudeRecipe recipeShown={recipeShown} />}
        </main>
    );
}