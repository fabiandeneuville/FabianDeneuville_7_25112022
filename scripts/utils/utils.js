// UTILS FUNCTION

// Function to render recipes cards from recipesList
function createRecipesList(array){
    updateTotal(array)
    recipeCardsContainer.innerHTML = "";
    array.forEach(element => {
        const recipeCard = recipeFactory(element).createRecipeCard();
        recipeCardsContainer.appendChild(recipeCard);
    });
}

// Function to get all ingredients from a specific recipe
function getIngredientsFromRecipe(recipe){
    const ingredients = recipe.ingredients.map((item) => item.ingredient.toLowerCase());
    return ingredients.toString();
}

// Function to get all ingredients, ustensils and appliance from a specific recipe
function getAllItemsFromRecipe(recipe){
    const items = [];
    recipe.ingredients.forEach((item) => items.push(item.ingredient.toLowerCase()));
    recipe.ustensils.forEach((item) => items.push(item.toLowerCase()));
    items.push(recipe.appliance.toLowerCase());
    const sortedItems = items.sort((a, b) => a.localeCompare(b));
    return sortedItems;
}

// Function to get all ingredients from a recipes list
function getAllIngredientsFromRecipesList(recipesList){
    const allIngredients = [];
    recipesList.forEach((recipe) => {
        recipe.ingredients.forEach((item) => {
            allIngredients.push(capitalize(item.ingredient));
        })
    });
    let allIngredientsOnce = [...new Set(allIngredients)];
    const sortedAllIngredientsOnce = allIngredientsOnce.sort((a, b) => a.localeCompare(b));
    return sortedAllIngredientsOnce;
}

// Function to get all appliances from a recipes list
function getAllAppliancesFromRecipesList(recipesList){
    const allAppliances = [];
    recipesList.forEach((recipe) => {
        allAppliances.push(recipe.appliance);
    });
    const allAppliancesOnce = [...new Set(allAppliances)];
    const sortedAllAppliancesOnce = allAppliancesOnce.sort((a, b) => a.localeCompare(b));
    return sortedAllAppliancesOnce;
}

// Function to get all ustensils from a recipes list
function getAllUstensilsFromRecipesList(recipesList){
    const allUstensils = [];
    recipesList.forEach((recipe) => {
        allUstensils.push(recipe.ustensils);
    })
    const allUstensilsFlat = allUstensils.flat();
    const allUstensilsFlatCapitalized = allUstensilsFlat.map((ustensil) => capitalize(ustensil));
    const allUstensilsFlatCapitalizedOnce = [...new Set(allUstensilsFlatCapitalized)];
    const sortedAllUstensilsFlatCapitalizedOnce = allUstensilsFlatCapitalizedOnce.sort((a, b) => a.localeCompare(b));
    return sortedAllUstensilsFlatCapitalizedOnce;
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
    listOfItemToDisplay.forEach((item) => {
        const spanItem = document.createElement('span');
        spanItem.classList.add('list-item');
        spanItem.textContent = item;
        spanItem.setAttribute('data-type', type);
        spanItem.addEventListener('click', addTag);
        container.appendChild(spanItem);
    })
}

// Function to display tags from tagsList
function displayTags(list){
    tagsContainer.innerHTML = "";
    if(list.length === 0){
        return
    }
    list.forEach((item) => {
        let tag = tagFactory(item.content, item.type).createTag();
        tagsContainer.appendChild(tag);
    })
}

// Function to get all items (ingredients, appliances, ustensils) from tags list
function getAllItemsFromTagsList(list){
    const items = [];
    list.forEach((item) => items.push(item.content.toLowerCase()));
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

function updateTotal(list){
    if(list.length === 0){
        totalDisplay.style.display = "none";
    } else {
        totalDisplay.style.display = "block";
        totalDisplay.innerHTML = `Résultats : ${list.length}`;
    }
}