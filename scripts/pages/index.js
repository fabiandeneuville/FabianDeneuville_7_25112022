// INDEX PAGE

let currentSearch = [];

console.log('Array methods algorithm');

const recipeCardsContainer = document.querySelector('#recipe-cards-container');
const searchInput = document.querySelector('#search-input');
const noRecipesMessage = document.querySelector('#no-recipes-message');

const ingredientsContainer = document.querySelector('.ingredients-container');
const appliancesContainer = document.querySelector('.appliances-container');
const ustensilsContainer = document.querySelector('.ustensils-container');

let recipesList = [];

searchInput.addEventListener('input', filterRecipes);

async function getAllRecipes(){
    const response = await fetch('../../assets/datas/recipes.json');
    const results = await response.json();
    recipesList = results;
    console.time("data-display-on-page-load");
    createRecipesList(recipesList);
    console.timeEnd("data-display-on-page-load");
    currentSearch = results;
    return results;
}

init();

async function init(){
    getAllRecipes();
    displayAllTags()
}

async function displayAllTags(){
    const recipes = await getAllRecipes();
    displayListItems(recipes, "ingredients", ingredientsContainer);
    displayListItems(recipes, "appliances", appliancesContainer);
    displayListItems(recipes, "ustensils", ustensilsContainer);
}