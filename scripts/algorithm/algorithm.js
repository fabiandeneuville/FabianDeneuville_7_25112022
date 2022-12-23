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
        if(searchedString.length < 3 && searchedString.length !== 0){
            return;
        }
        console.time('GENERAL SEARCH - Filtering recipes list using inputs : ' + searchedString);
        tagsList = [];
        tagsContainer.innerHTML = "";
        recipeCardsContainer.innerHTML = '';
        const filteredRecipesList = [];
        for(let i = 0 ; i < recipesList.length ; i++){
            if(
            recipesList[i].name.toLowerCase().includes(searchedString) || 
            recipesList[i].description.toLowerCase().includes(searchedString) ||
            getIngredientsFromRecipe(recipesList[i]).includes(searchedString)
            ){
                filteredRecipesList.push(recipesList[i])
            }
        }
        noRecipesMessage.style.display = filteredRecipesList.length === 0 ? 'block' : 'none';
        currentSearch = filteredRecipesList;
        createRecipesList(filteredRecipesList);
        displayListItems(getAllIngredientsFromRecipesList(currentSearch), 'ingredients');
        currentIngredientsList = getAllIngredientsFromRecipesList(currentSearch);
        displayListItems(getAllAppliancesFromRecipesList(currentSearch), 'appliances');
        currentAppliancesList = getAllAppliancesFromRecipesList(currentSearch);
        displayListItems(getAllUstensilsFromRecipesList(currentSearch), 'ustensils');
        currentUstensilsList = getAllUstensilsFromRecipesList(currentSearch);
        console.timeEnd('GENERAL SEARCH - Filtering recipes list using inputs : ' + searchedString);
    } else if (inputName === 'ingredients'){
        const filteredList = [];
        for(let i = 0 ; i < currentIngredientsList.length; i++){
            if(currentIngredientsList[i].toLowerCase().includes(searchedString)){
                filteredList.push(currentIngredientsList[i]);
            }
        }
        displayListItems(filteredList, 'ingredients');
    } else if (inputName === 'appliances'){
        const filteredList = [];
        for(let i = 0 ; i < currentAppliancesList.length; i++){
            if(currentAppliancesList[i].toLowerCase().includes(searchedString)){
                filteredList.push(currentAppliancesList[i]);
            }
        }
        displayListItems(filteredList, 'appliances');
    } else if (inputName === 'ustensils'){
        const filteredList = [];
        for(let i = 0 ; i < currentUstensilsList.length; i++){
            if(currentUstensilsList[i].toLowerCase().includes(searchedString)){
                filteredList.push(currentUstensilsList[i]);
            }
        }
        displayListItems(filteredList, 'ustensils');
    }
}

/********** Tags search **********/

function addTag(e){
    console.time('Filtering recipes list by adding tag');
    const title = e.target.parentNode.parentNode.querySelector('.advanced-search-title')
    const input = e.target.parentNode.parentNode.querySelector('.advanced-search-input');
    const container = e.target.parentNode.parentNode.querySelector('.advanced-search-tags-container');
    const chevron = e.target.parentNode.parentNode.querySelector('.chevron');
    toggleField(title, input, container, chevron);
    input.value = "";
    const content = e.target.textContent;
    const type = e.target.getAttribute('data-type');
    const newTag = {
        content,
        type
    }
    tagsList.push(newTag);
    displayTags(tagsList);

    filterWithTags(currentSearch);

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
    console.timeEnd('Filtering recipes list by adding tag');
}

function deleteTag(e){
    console.time('Filtering recipes list by deleting tag');
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
    console.timeEnd('Filtering recipes list by deleting tag');
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