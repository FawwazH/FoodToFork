// import axios from 'axios';

export default class Search{
    constructor(food){
    this.food = food;

    }

   async dishesSearch() {
    try{
        const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.food}`);
        this.recipes = result.data.recipes;
        return this.recipes;
        
    }   
    catch (error){
    console.log(error); 
    }}
}









  