import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';
import { NewIngredientComponent } from './new-ingredient/new-ingredient.component';
import { ViewShoppingListComponent } from './view-shopping-list/view-shopping-list.component';

const routes: Routes = [
  {path: 'new-recipe', component: NewRecipeComponent},
  {path: 'recipes', component: ViewRecipesComponent},
  {path: 'new-ingredient', component: NewIngredientComponent},
  {path: 'temp-list', component: ViewShoppingListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
