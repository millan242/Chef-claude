import React from "react";

const IngredientList = React.forwardRef((props, ref) => {
    const ingredients = props.ingredients;
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredient-list" aria-live="polite">
                {ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            {ingredients.length > 2 && (
                <div ref={ref} className="get-recipe-container">
                    <div className="recipe-content">
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.getRecipe}>Get a recipe</button>
                </div>
            )}
        </section>
    );
});

export default IngredientList;