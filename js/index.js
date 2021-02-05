// Global app controller
/*Model imports */
import Search from './models/Search.js';
import  Recipe from './models/Recipe.js';
import * as List from './models/List.js';
import Likes from './models/Likes.js';

/*View imports */
import  * as searchView from './views/searchView.js';
import * as recipeView from './views/recipeView.js';
import * as listView from './views/listView.js';
import * as likesView from './views/likesView.js';
import {elements} from './views/base.js';


const state = {
    search: '',
    id: '',
    ingredients: '',
    likes: ''
};




/* SEARCH CONTROLLER */
const controlSearch = async () => {
    //Retrieving user dish input 
    const food = searchView.getDishes();

    //Clears the dishes menu and search bar
    searchView.clearDishes();
    
    //Rendering loader to dishes menu 
    searchView.renderLoader(elements.dishesParentContainer);

    //Making API call for dishes based on user input
    state.search = new Search(food);

    //Recipe array that contains all the dishes based on the user input food type
    const recipArr = await state.search.dishesSearch();
    
    //Removing loader from dishes menu
    searchView.removeLoader();
    
    //Render the results to the dishes menu
    searchView.renderDishes(recipArr);
    
    //Render pages button
    searchView.createButton();

};

elements.searchButton.addEventListener('submit', e =>{
e.preventDefault();
searchView.deleteButton();
const recipes =  controlSearch();
});



//Using event delegation for the pagination buttons, since we have to add event listener to element that already exists
elements.buttonContainer.addEventListener('click', e => {
   
//Recall that the button has a few classes within itself and every time we click a different location on the button we are clicking
//a different part of the button, therefore we use the closest method to work around this
const btn = e.target.closest('.btn-inline');
 if (btn){
    //Clear the Dishes Menu
    searchView.clearDishes();

    //Remove the old pagination button(s) and render the new dishes and pagination button(s)
    const gotoPage = parseInt(btn.dataset.goto, 10);

    searchView.renderButtons(state.search.recipes, gotoPage);
}});


/* RECIPE CONTROLLER */

const controlRecipe = async () => {
const id = window.location.hash.replace('#', '');
state.id = new Recipe(id);
const recipe = await state.id.recipeSearch();
//Updated ingredients array
const ingArr = state.id.parseIngredients();
state.ingredients = ingArr;
recipeView.renderRecipe(recipe, ingArr, state.id.servings, state.id.time, state.likes.isLiked(state.id.id));
};

//Using the hash URL change for event listeners of the items in the dishes menu
//Note we added an event for two actions on the page in one line
//window.addEventListener('hashchange',controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, () => {
    if(state.search)
    controlRecipe()
}));

//Handling servings add or minus buttons and add to shopping cart button
elements.recipeMenu.addEventListener('click', e => {
    
    if (e.target.matches('.btn-decrease', '.btn-decrease *'))
    {
    //Updating servings and ingredient count in the data structure    
    const servSize = state.id.updateServings('dec');
   
    //Updating servings on the UI
    document.querySelector('.recipe__info-data--people').textContent = servSize[0];

    //Updating ingredients on the UI 
    recipeView.updateIngredients(servSize[1]);

    }else if (e.target.matches('.btn-increase','.btn-increase *'))
    {
    //Updating servings and ingredient count in the data structure   
    const servSize = state.id.updateServings('inc');
   
    //Updating servings on the UI
    document.querySelector('.recipe__info-data--people').textContent = servSize[0];

    //Updating ingredients on the UI 
    recipeView.updateIngredients(servSize[1]);

    }else if (e.target.matches('.recipe__btn--add', '.recipe__btn--add *')){
    listCtrl();

    }else if (e.target.matches('.recipe__love', '.recipe__love *')){
        newLike();
        
    }


});



/*LIST CONTROLLER */

const listCtrl =  () => {
    listView.renderList(state.ingredients);
};

/*LIKES CONTROLLER */
const newLike = () => {
    if (!state.likes) state.likes = new Likes();

    //If this statement returns false, the recipe is not yet liked and we now like it
    if (!state.likes.isLiked(state.id.id)){

        //Toggle to change heart button color
        likesView.toggleLikeBtn(true);

        //Add the like and its corresponing attributes such as id, title, author, img
        const newLike = state.likes.addLike(state.id.id, state.id.recipe.title, state.id.recipe.publisher, state.id.recipe.image_url);
        
        //Clear liked recipes on UI
        elements.likesList.innerHTML = '';

        //Render the new likes to the UI
        likesView.renderLikes(state.likes.likes);
    
    }
    //It is already liked and we dislike it now
    else if (state.likes.isLiked(state.id.id))
    {
        //Toggle to change heart button color
        likesView.toggleLikeBtn(false);

        //Remove the like from the data structure
        state.likes.deleteLike(state.id);
        
        //Clear liked recipes on UI
        elements.likesList.innerHTML = '';

        //Render updated data structure to UI
        likesView.renderLikes(state.likes.likes);
    }

   //Determines if the heart should be displayed or not
    likesView.toggleLikeMenu(state.likes.getNumLikes());

};

//Restore liked recipe on page load
window.addEventListener('load', () => {
state.likes = new Likes();
state.likes.readStorage();
likesView.renderLikes(state.likes.likes);
});