// INDEX PAGE
console.log('Array methods algorithm')

const recipeCardsContainer = document.querySelector('#recipe-cards-container');

let recipesList = [];

async function getAllRecipes(){
    const response = await fetch('../../assets/datas/recipes.json');
    const results = await response.json();
    recipesList = results
    createRecipesList(recipesList);
}

getAllRecipes()

function createRecipesList(array){
    console.time("data-display-on-page-load")
    array.forEach(element => {
        const recipeCard = recipeFactory(element).createRecipeCard();
        recipeCardsContainer.appendChild(recipeCard)
    });
    console.timeEnd("data-display-on-page-load")
}