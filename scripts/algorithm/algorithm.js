// ALGORITHM

/********** Global variables **********/

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
        tagsList = [];
        tagsContainer.innerHTML = "";
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
        displayListItems(getAllIngredientsFromRecipesList(currentSearch), 'ingredients');
        currentIngredientsList = getAllIngredientsFromRecipesList(currentSearch);
        displayListItems(getAllAppliancesFromRecipesList(currentSearch), 'appliances');
        currentAppliancesList = getAllAppliancesFromRecipesList(currentSearch);
        displayListItems(getAllUstensilsFromRecipesList(currentSearch), 'ustensils');
        currentUstensilsList = getAllUstensilsFromRecipesList(currentSearch);
    } else if (inputName === 'ingredients'){
        const filteredList = currentIngredientsList.filter((item) => {
            return (
                item.toLowerCase().includes(searchedString)
            )
        });
        displayListItems(filteredList, 'ingredients');
    } else if (inputName === 'appliances'){
        const filteredList = currentAppliancesList.filter((item) => {
            return (
                item.toLowerCase().includes(searchedString)
            )
        });
        displayListItems(filteredList, 'appliances');
    } else if (inputName === 'ustensils'){
        const filteredList = currentUstensilsList.filter((item) => {
            return (
                item.toLowerCase().includes(searchedString)
            )
        });
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

    filterWithTags(currentSearch)

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

function deleteTag(e){
    const type = e.target.parentNode.parentNode.getAttribute('data-type');
    const content = e.target.parentNode.parentNode.textContent;
    const newTagsList = tagsList.filter((tag) => tag.content.toLowerCase() != content.toLowerCase());
    tagsList = newTagsList;
    displayTags(tagsList);
    filterWithTags(currentSearch);
    switch(type){
        case 'ingredients' :
            currentIngredientsList.push(content);
            const currentIngredientsListSorted = currentIngredientsList.sort((a, b) => a.localeCompare(b));
            displayListItems(currentIngredientsListSorted, 'ingredients');
            break;
        case 'appliances' :
            currentAppliancesList.push(content);
            const currentAppliancesListSorted = currentAppliancesList.sort((a, b) => a.localeCompare(b));
            displayListItems(currentAppliancesListSorted, 'appliances');
            break;
        case 'ustensils' :
            currentUstensilsList.push(content);
            const currentUstensilsListSorted = currentUstensilsList.sort((a, b) => a.localeCompare(b));
            displayListItems(currentUstensilsListSorted, 'ustensils');
            break;
    }
}

function filterWithTags(recipesList){
    const filteredRecipesList = recipesList.filter((recipe) => {
        const items = getAllItemsFromRecipe(recipe);
        const tagElements = getAllItemsFromTagsList(tagsList);
        const containsAll = tagElements.every((element) => items.includes(element));
        if(containsAll){
            return recipe;
        }
    })
    noRecipesMessage.style.display = filteredRecipesList.length === 0 ? 'block' : 'none';
    createRecipesList(filteredRecipesList);
}