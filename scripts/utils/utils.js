function getIngredientsFromRecipe(recipe){
    const ingredients = recipe.ingredients.map((item) => item.ingredient.toLowerCase());
    return ingredients.toString();
}

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

function getAppliancesFromRecipesList(recipesList){
    const allAppliances = [];
    recipesList.forEach((recipe) => {
        allAppliances.push(recipe.appliance);
    });
    const allAppliancesOnce = [...new Set(allAppliances)];
    const sortedAllAppliancesOnce = allAppliancesOnce.sort((a, b) => a.localeCompare(b));
    return sortedAllAppliancesOnce;
}

function capitalize(string){
    if(string === ""){
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