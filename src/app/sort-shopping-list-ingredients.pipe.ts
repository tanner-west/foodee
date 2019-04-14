import { Pipe, PipeTransform } from '@angular/core';
import { ShoppingListIngredient } from './app.models';
@Pipe({
  name: 'sortShoppingListIngredients',
  pure: false
})
export class SortShoppingListIngredientsPipe implements PipeTransform {

  transform(ingredients: ShoppingListIngredient[], args?: any): any {

    let sortedIngredients: ShoppingListIngredient[];
    switch(args){
      case "name-asc":
        sortedIngredients = ingredients.sort(function(a: ShoppingListIngredient, b: ShoppingListIngredient){
          var titleA = a.ingredient.title.toLowerCase();
          var titleB = b.ingredient.title.toLowerCase();
    
          if(titleA < titleB){
            return -1;
          }
    
          if(titleB < titleA){
            return 1;
          }
    
        })
    
        return sortedIngredients;

      case "name-desc":
        sortedIngredients = ingredients.sort(function(a: ShoppingListIngredient, b: ShoppingListIngredient){
          var titleA = a.ingredient.title.toLowerCase();
          var titleB = b.ingredient.title.toLowerCase();
    
          if(titleA < titleB){
            return 1;
          }
    
          if(titleB < titleA){
            return -1;
          }
    
        })
    
        return sortedIngredients;
      
      case "category-asc":
        sortedIngredients = ingredients.sort(function(a: ShoppingListIngredient, b: ShoppingListIngredient){
          var categoryA = a.ingredient.categoryId;
          var categoryB = b.ingredient.categoryId;
    
          if(categoryA < categoryB){
            return -1;
          }
    
          if(categoryA > categoryB){
            return 1;
          }
    
        })
  
        return sortedIngredients;

      case "category-desc":
        sortedIngredients = ingredients.sort(function(a: ShoppingListIngredient, b: ShoppingListIngredient){
          var categoryA = a.ingredient.categoryId;
          var categoryB = b.ingredient.categoryId;
    
          if(categoryA < categoryB){
            return 1;
          }
    
          if(categoryA > categoryB){
            return -1;
          }
    
        })
  
        return sortedIngredients;
        
      default:
        return ingredients;
    }
  }
  

}
