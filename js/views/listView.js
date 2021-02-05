import { elements } from "./base.js";


export const renderList = (ingredients) => {
const newHtml = ingredients.map(el => 
    populateCart(el)
).join(' ');
elements.shopping.insertAdjacentHTML('afterbegin', newHtml);

};



const populateCart = (ingArr) => 
`
<li class="shopping__item">
    <div class="shopping__count">
        <input type="number" value="${ingArr.count}" step="100">
        <p>${ingArr.unit}</p>
    </div>
     <p class="shopping__description">${ingArr.ingredient}</p>
    <button class="shopping__delete btn-tiny">
        <svg>
             <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
    </button>
</li>
`;












/*

export const markup = (ingredients) => `
    <li class="shopping__item">
        <div class="shopping__count">
            <input type="number" value="500" step="100">
            <p>g</p>
        </div>
         <p class="shopping__description">Pasta</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                 <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
`;

const divide2 = (ele) => {
    //Removing brackets
    ele = ele.replace(/[{()}]/g, '');
    //Splitting the string into words into an array
    let el = ele.toLowerCase().split(' ');
    //Seperating the quantity into an array
    let quantity = toDecimal(el.splice(0,1).toString());
    console.log(quantity);
    //Seperating the unit into an array
    let unit = el.splice(0,1).toString();
    //Seperating the description into an array
    let description = el.splice(0, el.length + 1).toString();
    //Removing commas from the description
    description = description.replace(/,/g, ' ');
    const shoppingCart = populateCart(quantity, unit, description);
    return shoppingCart;
    };


    
export const renderCart = (ingredients) => {
    let newHtml;
    newHtml = ingredients.map(element => 
    divide2(element)).join('');

    elements.shoppingList.insertAdjacentHTML('afterbegin', newHtml);
};
*/