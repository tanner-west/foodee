import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';
import { NewIngredientComponent } from './new-ingredient/new-ingredient.component';
import { ViewShoppingListComponent } from './view-shopping-list/view-shopping-list.component';
import { ViewIngredientsComponent } from './view-ingredients/view-ingredients.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';

const routes: Routes = [
  {path: 'new-recipe', component: NewRecipeComponent},
  {path: 'recipes', component: ViewRecipesComponent},
  {path: 'new-ingredient', component: NewIngredientComponent},
  {path: 'shopping-list/:id', component: ViewShoppingListComponent},
  {path: 'ingredients/:from-create-new', component: ViewIngredientsComponent},
  {path: 'ingredients', component: ViewIngredientsComponent},
  {path: 'recipe/:id', component: ViewRecipeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
