import {elements} from './base.js';

export const getDishes = () => {
    const result = elements.searchBox.value;
    //elements.searchBox.value = '';
    //elements.dishesContainer.innerHTML = '';
    return result;
};

export const clearDishes = () => {
// Getting the user input, clearing the inside of the textbox and dishes menu.
elements.dishesContainer.innerHTML = '';
elements.searchBox.value = '';

};

export const renderLoader = (location) => {

const loader = `
    <div class = "loader">
        <svg>
            <use href = "img/icons.svg#icon-cw"></use>
        </svg>
    </div>
`;
location.insertAdjacentHTML('afterbegin', loader);

};

export const removeLoader = () => {
    const loader = document.querySelector('.loader');
    
   if (loader) {
       //Moving up to the loader's parent element and removing the loader child
       loader.parentElement.removeChild(loader);
     }

};

    /*
    export const renderDishes2 = (dishesArr) => {

    dishesArr.forEach(current => {

        const markup = `
        <li>
            <a class="results__link results__link--active" href="#${current.recipe_id}">
                <figure class="results__fig">
                    <img src="${current.image_url}" alt="${current.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${current.title}</h4>
                    <p class="results__author">${current.publisher}</p>
                </div>
            </a>
        </li>`;
        
    elements.dishesContainer.insertAdjacentHTML('beforeend',markup);

    });

    };
    */

export const renderDishes = (dishesArr, start = 0, end = start + 9) => {
    
    for (let i = start ; i < end; i++)
    {
    const markup = `
    <li>
        <a class="results__link results__link--active" href="#${dishesArr[i].recipe_id}">
            <figure class="results__fig">
                <img src="${dishesArr[i].image_url}" alt="${dishesArr[i].title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${dishesArr[i].title}</h4>
                <p class="results__author">${dishesArr[i].publisher}</p>
             </div>
         </a>
    </li>`;

        elements.dishesContainer.insertAdjacentHTML('beforeend',markup);
    }
    
};

export const createButton = (page = 1, type = 'next') => {
    
    const button = `
    <button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? page - 1  : page + 1}>
        <span>Page ${type === 'next' ? page + 1  : page - 1}</span>    
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
     </button>
    `;

    elements.buttonContainer.insertAdjacentHTML('beforeend', button);

};

export const deleteButton = () => {
    elements.buttonContainer.innerHTML = '';

};

export const renderButtons = (dishesArr, page = 2) => {

//Where 9 is the amount of recipes we display per page
    const numPages = Math.round(dishesArr.length/9);
    let start;
    deleteButton();

    if (page === 1 && numPages > 1){
    //Scenario that we are on the first page
    renderDishes(dishesArr);
    createButton(page);
    }else if (page === numPages && numPages > 1){
    //Scenario that we are on the last page
    start = (page - 1) * 9;
    createButton(page, 'prev');
    renderDishes(dishesArr, start);
    

    }else if (page < numPages){
    //Scenario that we are on a middle page
    start = (page - 1) * 9;
    renderDishes(dishesArr, start);
    createButton(page, 'prev');
    createButton(page, 'next');
}};