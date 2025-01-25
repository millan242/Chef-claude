import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `Actually I want this prompt - "You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. Ensure the recipe is structured as follows:

### Recipe Name  
**Preparation Time:** X minutes  
**Cooking Time:** Y minutes  
**Serving Size:** Z people  

#### Ingredients  
- Ingredient 1  
- Ingredient 2  
- ...  

#### Instructions  
1. Step 1  
2. Step 2  
3. ...  

#### Tips  
- Tip 1  
- Tip 2  
- ...  

Ensure the recipe is clear, concise, and easy to follow.`;

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

export async function getRecipeFromHuggingFace(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    const inputText = `${SYSTEM_PROMPT}\nIngredients: ${ingredientsString}\nPlease give me a recipe you'd recommend I make!`;

    try {
        const response = await hf.textGeneration({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            inputs: inputText,
            parameters: {
                max_new_tokens: 1024,
                temperature: 0.7,
                top_p: 0.9,
                return_full_text: false,
            },
        });
        return response.generated_text;
    } catch (err) {
        console.error("Error:", err.message || err.response?.data);
        throw new Error("Failed to generate recipe. Please try again.");
    }
}