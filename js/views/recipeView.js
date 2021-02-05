import { elements } from "./base.js";



//HTML markup for the selected recipe chosen from the dishes menu
export const renderRecipe = (recipeObj, ingArr, servings, time, isLiked) => {
    elements.recipeMenu.innerHTML = '';
    const markup = `
        <figure class="recipe__fig">
                <img src="${recipeObj.image_url}" alt="${recipeObj.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipeObj.title}</span>
                </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
        <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${servings}</span>
                <span class="recipe__info-text"> servings</span>
                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${ingArr.map(element => 
                    renderIngredients(element)).join(' ')}
            </ul>
            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipeObj.publisher}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipeObj.publisher_url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
 `;

 elements.recipeMenu.insertAdjacentHTML('afterbegin', markup);

};

//HTML markup for individual ingredients in recipe container
const renderIngredients = (element) => 
     ` <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
            <div class="recipe__count">${(element.count)}</div>
                <div class="recipe__ingredient">
                <span class="recipe__unit">${element.unit}</span>
                ${element.ingredient}
            </div> 
    </li>`;


export const updateIngredients = (updatedArr) => {
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el,i) => {
        el.textContent = updatedArr[i].count;
    });
};
    







//Changing the serving size
export const changeServings= (type) => {
    //Updating servings
    if(type === 'inc'){
       oldServing = servings;
       newServing = oldServing + 1; 
       servings = newServing;
      // console.log(oldServing, newServing, servings);
    }else if (type === 'dec' && servings > 1)
    {    
        oldServing = servings;
        newServing = oldServing - 1; 
        servings = newServing;
    }
    document.querySelector('.recipe__info-data--people').textContent = servings;
    
    //Updating ingredients
    let quantity;
    let parent = document.querySelector('.recipe__ingredient-list');
    let children = Array.from(parent.children);
     children.forEach((element, index) => {
       let grandchildren = element.childNodes;
        grandchildren.forEach((el, ind) => {
            if (ind === 3){
                //Getting the current quantity
                quantity = parseInt(el.textContent);
                if(quantity){
                    console.log(quantity);
                    //Getting the quantity for ONE serving
                    let oneServing = parseFloat(quantity/oldServing);
                    //console.log(quantity, oldServing, oneServing);
                    el.textContent =  formatNumber((oneServing * newServing).toString());
                }else{
                    console.log(`The number was undefined`);
                }
            }
        });
     }); 
};














//Converting numbers in the for 3/4 or 1-3/4 into 0.75 or 1.75
/*
const toDecimal = (number) => {
    let decimal, dec, int, spl, int2;
    if (number.includes('/')){
        spl = number.split('');
        if (spl.includes('-') && spl.includes('/')){
            //Case 1-1/10 or 10-1/10
            //Slice or splice the array to remove the fraction portion i.e. the 1/10
            dec = spl.splice((spl.length - 3),3);
            dec = (dec[0]/dec[2]).toString();
            dec = dec.split('.');
            //In the remaining array, we can remove the '-' sign and join the contents of the remaining array
            spl.splice((spl.length - 1),1);
            int = spl.join();
            int2 = int.replace(/,/g, '');
            return(`${int2}.${dec[1]}`);
    
        }else{
        //Case 1/10
        dec = (spl[0]/spl[2]).toString();
        return (`${dec}`);
        }
    }else if (!(number.includes('/'))){
        //Its a whole number or word
        return number;
    }
        
};
*/

/*
//Removing the extra decimal points 
const formatNumber = (number) => {
    let spl = number.split('.');
    let int = spl[0];
    let dec = spl[1];
    if (dec && dec.length > 2){
        dec = dec.slice(0,2);  
    }else{
    }
    return (`${int}.${dec}`);
};
*/