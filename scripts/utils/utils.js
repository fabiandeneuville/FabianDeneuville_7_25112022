// UTILS FUNCTION

// Function to render recipes cards from recipesList
function createRecipesList(array){
    updateTotal(array)
    recipeCardsContainer.innerHTML = "";
    for(let i = 0 ; i < array.length ; i++){
        const recipeCard = recipeFactory(array[i]).createRecipeCard();
        recipeCardsContainer.appendChild(recipeCard);
    }
}

// Function to get all ingredients from a specific recipe
function getIngredientsFromRecipe(recipe){
    const recipeIngredients = recipe.ingredients;
    const allIngredients = [];
    for(let i = 0 ; i < recipeIngredients.length ; i++){
        allIngredients.push(recipeIngredients[i].ingredient.toLowerCase()); 
    }
    return allIngredients.toString();
}

// Function to get all ingredients, ustensils and appliance from a specific recipe
function getAllItemsFromRecipe(recipe){
    const items = [];
    const recipeIngredients = recipe.ingredients;
    const recipeUstensils = recipe.ustensils;
    const recipeAppliance = recipe.appliance;
    for(let i = 0 ; i < recipeIngredients.length ; i++){
        items.push(recipeIngredients[i].ingredient.toLowerCase());
    }
    for(let j = 0 ; j < recipeUstensils.length ; j++){
        items.push(recipeUstensils[j].toLowerCase());
    }
    items.push(recipeAppliance.toLowerCase());
    const sortedItems = items.sort((a, b) => a.localeCompare(b));
    return sortedItems;
}

// Function to get all ingredients from a recipes list
function getAllIngredientsFromRecipesList(recipesList){
    const allIngredients = [];
    for(let i = 0 ; i < recipesList.length ; i++){
        for(let j = 0; j < recipesList[i].ingredients.length; j++){
            allIngredients.push(capitalize(recipesList[i].ingredients[j].ingredient));
        }
    }
    const sortedAllIngredients = allIngredients.sort((a, b) => a.localeCompare(b));
    return removeDuplicates(sortedAllIngredients);
}

// Function to get all appliances from a recipes list
function getAllAppliancesFromRecipesList(recipesList){
    const allAppliances = [];  
    for(let i = 0 ; i < recipesList.length ; i++){
        allAppliances.push(capitalize(recipesList[i].appliance));
    }
    const allAppliancesSorted = allAppliances.sort((a, b) => a.localeCompare(b));
    return removeDuplicates(allAppliancesSorted)
}

// Function to get all ustensils from a recipes list
function getAllUstensilsFromRecipesList(recipesList){
    const allUstensils = [];
    for(let i = 0 ; i < recipesList.length ; i++){
        allUstensils.push(recipesList[i].ustensils)
    }
    const allUstensilsFlat = []
    for(let i = 0 ; i < allUstensils.length ; i++){
        for(let j = 0 ; j < allUstensils[i].length ; j++){
            allUstensilsFlat.push(capitalize(allUstensils[i][j]));
        }
    }
    const allUstensilsFlatSorted = allUstensilsFlat.sort((a, b) => a.localeCompare(b));
    return removeDuplicates(allUstensilsFlatSorted);
}

// Function to capitalize list items before rendering
function capitalize(string){
    if(string === ''){
        return
    }
    const temp = string.split('');
    const capitalized = [];
    capitalized.push(temp[0].toUpperCase());
    for( i = 1 ; i < temp.length ; i++ ){
        capitalized.push(temp[i]);
    }
    const capitalizedString = capitalized.join('');
    return capitalizedString;
}

// Function to display items in containers (ingredients, appliances, ustensils)
function displayListItems(listOfItemToDisplay, type){
    let container;
    switch(type){
        case 'ingredients' :
            container = document.querySelector('.ingredients-container');
            break;
        case 'appliances' :
            container = document.querySelector('.appliances-container');
            break;
        case 'ustensils' : 
            container = document.querySelector('.ustensils-container');
            break
    }
    container.innerHTML = '';
    if(listOfItemToDisplay.length === 0){
        container.innerHTML = `
            <p>Aucun résultat</p>
        `
    }
    for(let i = 0 ; i < listOfItemToDisplay.length ; i++){
        const spanItem = document.createElement('span');
        spanItem.classList.add('list-item');
        spanItem.textContent = listOfItemToDisplay[i];
        spanItem.setAttribute('data-type', type);
        spanItem.addEventListener('click', addTag);
        container.appendChild(spanItem);
    }
}

// Function to display tags from tagsList
function displayTags(list){
    tagsContainer.innerHTML = "";
    if(list.length === 0){
        return
    }
    for(let i = 0 ; i < list.length ; i++){
        let tag = tagFactory(list[i].content, list[i].type).createTag();
        tagsContainer.appendChild(tag);
    }
}

// Function to get all items (ingredients, appliances, ustensils) from tags list
function getAllItemsFromTagsList(list){
    const items = [];
    for(let i = 0 ; i < list.length ; i++){
        items.push(list[i].content.toLowerCase())
    };
    const sortedItems = items.sort((a, b) => a.localeCompare(b));
    return sortedItems;
}

// Function to handle opening/closing of advanced search fields
function toggleField(title, input, container, chevron){
    title.classList.toggle('field-closed');
    input.classList.toggle('field-closed');
    input.focus();
    container.classList.toggle('field-closed');
    chevron.classList.toggle('field-opened');
}

// Function to display number of results
function updateTotal(list){
    if(list.length === 0){
        totalDisplay.style.display = "none";
    } else {
        totalDisplay.style.display = "block";
        totalDisplay.innerHTML = `Résultats : ${list.length}`;
    }
}

// Function to remove duplicates from an array
function removeDuplicates(array){
    const newArray = [];
    for(let i = 0 ; i < array.length ; i++){
        if(!newArray.includes(array[i])){
            newArray.push(array[i]);
        }
    }
    return newArray;
}