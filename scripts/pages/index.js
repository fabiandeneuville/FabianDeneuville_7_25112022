// INDEX PAGE

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
    array.forEach(element => {
        const recipeCard = recipeFactory(element).createRecipeCard();
        recipeCardsContainer.appendChild(recipeCard)
    });
}