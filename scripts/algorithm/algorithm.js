// ALGORITHM

let currentSearch = [];
let currentIngredientsList = [];
let currentAppliancesList = [];
let currentUstensilsList = [];
let tagsList = [];

/********** Input search **********/

function filterList(e){

    let inputName = e.target.getAttribute('data-input');
    
    const searchedString = e.target.value.toLowerCase();

    if(inputName === 'search'){

        if(searchedString.length < 3 && searchedString.length !== 0){
            return;
        }
        recipeCardsContainer.innerHTML = '';
    
        const filteredRecipesList = recipesList.filter((recipe) => {
            return (
                recipe.name.toLowerCase().includes(searchedString) ||
                recipe.description.toLowerCase().includes(searchedString) ||
                getIngredientsFromRecipe(recipe).includes(searchedString)
            )
        });
    
        noRecipesMessage.style.display = filteredRecipesList.length === 0 ? 'block' : 'none';
    
        currentSearch = filteredRecipesList;
    
        createRecipesList(filteredRecipesList);
        displayListItems(getAllIngredientsFromRecipesList(filteredRecipesList), 'ingredients');
        displayListItems(getAllAppliancesFromRecipesList(filteredRecipesList), 'appliances');
        displayListItems(getAllUstensilsFromRecipesList(filteredRecipesList), 'ustensils');

    } else if (inputName === 'ingredients'){

        const listToFilter = getAllIngredientsFromRecipesList(currentSearch);
        const filteredList = listToFilter.filter((item) => {
            return (
                item.toLowerCase().includes(searchedString)
            )
        });

        currentIngredientsList = filteredList;
        displayListItems(filteredList, 'ingredients');

    } else if (inputName === 'appliances'){
        const listToFilter = getAllAppliancesFromRecipesList(currentSearch);
        const filteredList = listToFilter.filter((item) => {
            return (
                item.toLowerCase().includes(searchedString)
            )
        });

        currentAppliancesList = filteredList;
        displayListItems(filteredList, 'appliances');

    } else if (inputName === 'ustensils'){
        const listToFilter = getAllUstensilsFromRecipesList(currentSearch);
        const filteredList = listToFilter.filter((item) => {
            return (
                item.toLowerCase().includes(searchedString)
            )
        });

        currentUstensilsList = filteredList;
        displayListItems(filteredList, 'ustensils');
    }
}

/********** Tags search **********/

function addTag(e){
    const content = e.target.textContent;
    const type = e.target.getAttribute('data-type');
    const newTag = {
        content,
        type
    }
    tagsList.push(newTag);
    displayTags(tagsList);

    let filteredList;
    let listOfItemsToFilter;
    switch (type){
        case 'ingredients' :
            listOfItemsToFilter = currentIngredientsList;
            filteredList = listOfItemsToFilter.filter((item) => item != content);
            currentIngredientsList = filteredList;
            break
        case 'appliances' :
            listOfItemsToFilter = currentAppliancesList;
            filteredList = listOfItemsToFilter.filter((item) => item != content);
            currentAppliancesList = filteredList;
            break
        case 'ustensils' :
            listOfItemsToFilter = currentUstensilsList;
            filteredList = listOfItemsToFilter.filter((item) => item != content);
            currentUstensilsList = filteredList;
            break
    }
    displayListItems(filteredList, type);
}