// import axios from 'axios';
import { elements } from '../views/base.js';

export default class Recipe {
    constructor(id){
        this.id = id;
        
    }
    async recipeSearch(){
        try{
            const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.recipe = result.data.recipe;
            this.ingredients = result.data.recipe.ingredients;
            this.servings = 4;
            this.time = 45;
            return this.recipe;
 
        }   
        catch (error){
        console.log(error);
        }
    }
    
    parseIngredients(){
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'jars', 'very','cans'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'jar', 'very', 'cans'];
        let objIng;
        let updatedRecipes = [];
        //console.log(this.ingredients);
        //Replacing the long units with the short units by reading in the ingredients array which is an array of strings
        const newIngredients = this.ingredients.map(el => {
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            //Removing parentheses
            ingredient = ingredient.replace(/[{()}]/g, '');
            //Parse ingredients into quantity, unit and description
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

        
            if (unitIndex > -1){
                //There is a unit
                //Removing the quantity from array
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if (arrCount.length === 1){
                    count = eval(arrIng[0].replace('-', '+'));
                }else{
                    count = eval(arrIng.slice(0,unitIndex).join('+'));
                }
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }   
                updatedRecipes.push(objIng);
            }
            else if (parseInt(arrIng[0],10)){
                //There is NO unit but 1st element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }    
               updatedRecipes.push(objIng);
            }
            else if (unitIndex === -1){
                //There is no unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }    
               updatedRecipes.push(objIng);
               
            }
            this.ingredients = updatedRecipes;
        });
        
        return updatedRecipes;
    }

    updateServings(type){
        let updateCount;
        const newServing = type === 'dec' ? this.servings - 1 : this.servings + 1;
        if (newServing >= 1){
           //map through the updatedIngredients array and multiply count by (this.servings/newServing)
           this.ingredients.map(el => 
            el.count = el.count * (newServing/this.servings)
           );     
           //then render the new array [{}, {}, {}] to the UI
            // = (this.servings/newServing) * ingredient count
            this.servings = newServing;
        }
    return [this.servings, this.ingredients];
    }

}


    
