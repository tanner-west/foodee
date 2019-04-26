import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from './app.models';
@Pipe({
  name: 'sortIngredientList'
})
export class SortIngredientListPipe implements PipeTransform {

  transform(ingredients: any, args?: any): any {

    let sortedIngredients: Ingredient[]

    sortedIngredients = ingredients.sort(function(a: Ingredient, b: Ingredient){
      var titleA = a.title.toLowerCase();
      var titleB = b.title.toLowerCase();

      if(titleA < titleB){
        return -1;
      }

      if(titleB < titleA){
        return 1;
      }
    })
    
    return sortedIngredients;
  }

}
