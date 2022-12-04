// ALGORITHM

function filterRecipes(e){

    if(e.target.value.length < 3 && e.target.value.length !== 0){
        return;
    }

    recipeCardsContainer.innerHTML = "";

    const searchedString = e.target.value.toLowerCase();

    const filteredRecipesList = recipesList.filter((recipe) => {
        return (
            recipe.name.toLowerCase().includes(searchedString) ||
            recipe.description.toLowerCase().includes(searchedString) ||
            getIngredientsFromRecipe(recipe).includes(searchedString)
        )
    })

    noRecipesMessage.style.display = filteredRecipesList.length === 0 ? "block" : "none";

    currentSearch = filteredRecipesList;

    createRecipesList(filteredRecipesList);
    displayListItems(filteredRecipesList, "ingredients", ingredientsContainer);
    displayListItems(filteredRecipesList, "appliances", appliancesContainer);
    displayListItems(filteredRecipesList, "ustensils", ustensilsContainer);
}