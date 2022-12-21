// INDEX PAGE

console.log('Array methods algorithm');

const recipeCardsContainer = document.querySelector('#recipe-cards-container');
const searchInput = document.querySelector('#search-input');
const noRecipesMessage = document.querySelector('#no-recipes-message');
const ingredientsContainer = document.querySelector('.ingredients-container');
const appliancesContainer = document.querySelector('.appliances-container');
const ustensilsContainer = document.querySelector('.ustensils-container');
const advancedSearchFields = document.querySelectorAll('.advanced-search-field');
const tagsContainer = document.getElementById('tags-container');
const tags = document.querySelectorAll('.tag');

// Handling event on general search input
searchInput.addEventListener('input', filterList);

// Function to retriev all recipes from Backend
async function getAllRecipes(){
    // const response = await fetch('../../assets/datas/recipes.json');
    const response = await fetch('https://raw.githubusercontent.com/fabiandeneuville/FabianDeneuville_7_25112022/main/assets/datas/recipes.json'); // Fetching datas from Github repo
    const results = await response.json();
    
    recipesList = results;
    createRecipesList(recipesList);
    
    currentSearch = results;
    return results;
}

init();

// Function to display recipes and list items on page load
async function init(){
    console.time("First page load");
    getAllRecipes();
    displayAllListItems();
    console.timeEnd("First page load");
}

// Function to display list items (ingredients, appliances, ustensils)
async function displayAllListItems(){
    currentSearch = await getAllRecipes();
    displayListItems(getAllIngredientsFromRecipesList(currentSearch), 'ingredients');
    currentIngredientsList = getAllIngredientsFromRecipesList(currentSearch);
    displayListItems(getAllAppliancesFromRecipesList(currentSearch), 'appliances');
    currentAppliancesList = getAllAppliancesFromRecipesList(currentSearch);
    displayListItems(getAllUstensilsFromRecipesList(currentSearch), 'ustensils');
    currentUstensilsList = getAllUstensilsFromRecipesList(currentSearch);
}

// Handling advanced search fields events
advancedSearchFields.forEach((field) => {
    const chevron = field.querySelector('.chevron');
    const container = field.querySelector('.advanced-search-tags-container');
    const title = field.querySelector('.advanced-search-title');
    const input = field.querySelector('.advanced-search-input');
    chevron.addEventListener('click', () => toggleField(title, input, container, chevron));
    input.addEventListener('input', filterList);
});

// Displaying tags from tagsList
displayTags(tagsList)