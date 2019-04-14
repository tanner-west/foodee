import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Recipe, RecipeIngredient, ShoppingListIngredient, Ingredient, ShoppingList } from '../app.models';
import { v4 as uuid } from 'uuid';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.sass']
})
export class ViewRecipesComponent implements OnInit {

  activeShoppingList: ShoppingList;
  recipes: Recipe[];
  constructor(private httpService: HttpService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.httpService.getAllRecipes().subscribe(res => {
      this.recipes  = res as [Recipe];
      console.log(this.recipes)
    })
    this.getActiveShoppingList();
  }


  // TODO: this needs to update when active list changes... probably move it to service and subscribe here!
  getActiveShoppingList(){
    this.httpService.getShoppingListById(this.localStorageService.getActiveShoppingListId())
    .subscribe(res => {
      this.activeShoppingList = res as ShoppingList;
      console.log(this.activeShoppingList)
    })
  }

  addRecipeIngredientsToActiveShoppingList(recipe: Recipe){

    console.log(recipe);
    let shoppingListIngredientsList = [] as ShoppingListIngredient[];
    let activeShoppingListIngredients = this.activeShoppingList.shoppingListIngredients;
    

    for(let i=0; i < recipe.recipeIngredients.length; i++){

      // Make sure we're not adding an ingredient that's already in the shopping list
      const duplicateIngredient = activeShoppingListIngredients.find(
        ingredient => ingredient.ingredient.ingredientId === recipe.recipeIngredients[i].ingredient.ingredientId
      )

      if(!duplicateIngredient){
        let newShoppingListIngredient: ShoppingListIngredient = new ShoppingListIngredient();
        newShoppingListIngredient.recipe = new Recipe();
        newShoppingListIngredient.ingredient = new Ingredient();
        newShoppingListIngredient.shoppingList = new ShoppingList();
        newShoppingListIngredient.shoppingListIngredientId = uuid();
        newShoppingListIngredient.shoppingList.shoppingListId = this.localStorageService.getActiveShoppingListId();
        newShoppingListIngredient.recipe.recipeId = recipe.recipeId;
        newShoppingListIngredient.ingredient.ingredientId = recipe.recipeIngredients[i].ingredient.ingredientId;
        shoppingListIngredientsList.push(newShoppingListIngredient);
      }

    }

    this.httpService.postNewShoppingListIngredients(shoppingListIngredientsList).subscribe(res => console.log(res));

  }

}