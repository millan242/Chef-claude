export default function Form(){
    return(
        <main>
            <form action="" className="add-ingredient-form">
                <input 
                    type="text" placeholder="Enter an ingredient (e.g., oregano)" aria-label="Add ingredient" 
                />
                <button>
                    Add ingredient
                </button>
            </form>
        </main>
    )
}