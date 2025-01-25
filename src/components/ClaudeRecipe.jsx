import Markdown from "markdown-to-jsx"

export default function ClaudeRecipe(props) {
    const recipeShown = props.recipeShown
    return (
        <section className="markdown-content">
            <h1>Chef claude recommends:</h1>
            <Markdown>{recipeShown}</Markdown>
        </section>
    )
}