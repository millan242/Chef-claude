import React from "react";
import { X } from "lucide-react";

const IngredientList = React.forwardRef((props, ref) => {
    const ingredients = props.ingredients;
    const buttonText = props.isLoading ? "Preparing..." : "Get a recipe";
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredient-list" aria-live="polite">
                {ingredients.map((item, index) => (
                    <li key={index}>
                        <div className="ingredient-content">
                            <span>{item}</span>
                            <button
                                type="button"
                                onClick={() => props.deleteIngredient(index)}
                                aria-label={`Remove ${item}`}
                                className="delete-button"
                            >
                                <X size={15} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {ingredients.length > 2 && (
                <div ref={ref} className="get-recipe-container">
                    <div className="recipe-content">
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.getRecipe} disabled={props.isLoading}>{buttonText}</button>
                </div>
            )}
        </section>
    );
});

export default IngredientList;