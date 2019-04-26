import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Recipe, RecipeIngredient, ShoppingListIngredient, Ingredient, ShoppingList, Asset } from '../app.models';
import { v4 as uuid } from 'uuid';
import { LocalStorageService } from '../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.sass']
})
export class ViewRecipesComponent implements OnInit {

  activeShoppingList: ShoppingList;
  recipes: Recipe[];

  dataIsLoading: boolean = false;
  
  currentPage: number;
  totalPages: number;

  constructor(private toastrService: ToastrService, private httpService: HttpService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.dataIsLoading = true;
    this.httpService.getAllRecipes().subscribe(res => {
      //TODO create a model for the Page response
      console.log(res)
      this.dataIsLoading = false;
      this.currentPage = res['number'] + 1;
      this.totalPages = res['totalPages']
      this.recipes  = res['content'] as [Recipe];
      console.log(this.recipes)
    })
    this.getActiveShoppingList();
  }

  getAssetFilename(recipe: Recipe){
    let recipeFilename = recipe.asset[0].filename;
    return `http://localhost:57123/api/v1/assets/images/${recipeFilename}`
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
    let me = this;
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

    this.httpService.postNewShoppingListIngredients(shoppingListIngredientsList)
    .subscribe(
      function(res){
        me.toastrService.success("Let's go shopping.", "Success")
      }
    );

  }

  onNextPage(){
    this.dataIsLoading = true;
    this.httpService.getRecipesPage(this.currentPage).subscribe(res => {
      this.dataIsLoading = false;
      //TODO create a model for the Page response
      console.log(res)
      this.currentPage = res['number'] + 1;
      this.totalPages = res['totalPages']
      this.recipes  = res['content'] as [Recipe];
      console.log(this.recipes)
    })

  }

  onPreviousPage(){

    //server pages are zero indexed
    this.dataIsLoading = true;

    this.httpService.getRecipesPage(this.currentPage - 2).subscribe(res => {
      //TODO create a model for the Page response
      this.dataIsLoading = false;
      console.log(res)
      this.currentPage = res['number'] + 1;
      this.totalPages = res['totalPages']
      this.recipes  = res['content'] as [Recipe];
      console.log(this.recipes)
    })

  }
}