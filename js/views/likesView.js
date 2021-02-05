import { elements } from "./base.js";

export const toggleLikeBtn = (isLiked) => {

    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);

};

export const toggleLikeMenu = numLikes => {
elements.likesMenu.getElementsByClassName.visibility = numLikes > 0 ? 'visible' : 'hidden';
};


const markup = (recipe) => 
`
<li>
    <a class="likes__link" href="#${recipe.id}">
        <figure class="likes__fig">
            <img src="${recipe.img}" alt="Test">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${recipe.title} ...</h4>
            <p class="likes__author">${recipe.author}</p>
        </div>
    </a>
</li>
`;

export const renderLikes =  (likedRecipes) => {
const newHtml = likedRecipes.map(el => 
markup(el)).join(' ');

elements.likesList.insertAdjacentHTML('afterbegin', newHtml);
};